import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import HeaderComponent from 'components/PostsList/Header'
import ActionComponent from 'components/PostsList/Action'
import DescriptionComponent from 'components/PostsList/Description'
import CommentComponent from 'components/PostsList/Comment'
import ListItemComponent from 'templates/ListItem'
import ImageComponent from 'templates/Image'
import ReactionsPreviewTemplate from 'templates/ReactionsPreview'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Layout from 'constants/Layout'
import { Text } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const PostCarousel = ({
  ref,
  navigation,
  album,
  theme,
  handleScrollPrev,
  handleScrollNext,
}) => ({
  item: post,
  index,
}) => {
  const styling = styles(theme)
  const primaryColor = `rgb(
    ${path(['mediaObjects', '0', 'colors', '0', 'r'])(post)},
    ${path(['mediaObjects', '0', 'colors', '0', 'g'])(post)},
    ${path(['mediaObjects', '0', 'colors', '0', 'b'])(post)}
  )`

  const tertiaryColor = `${theme.colors.backgroundPrimary}`

  return (
    <View style={styling.carouselItem}>
      <LinearGradient
        colors={[primaryColor, tertiaryColor]}
        style={styling.gradient}
      />

      <View style={styling.gradient}>
        <TouchableOpacity style={styling.album} onPress={() => navigation.navigate({
            routeName: 'Album',
            params: {
              album,
            },
            key: `Album-albumId${album.albumId}`,
          })}>
          <Text>{path(['name'])(album)}</Text>
        </TouchableOpacity>
      </View>

      <ListItemComponent post={post}>
        <ImageComponent
          thumbnailSource={{ uri: path(['mediaObjects', '0', 'url64p'])(post) }}
          imageSource={{ uri: path(['mediaObjects', '0', 'url4k'])(post) }}
          priorityIndex={index}
        />
        <TouchableOpacity style={styling.prev} onPress={handleScrollPrev} />
        <TouchableOpacity style={styling.next} onPress={handleScrollNext} />
      </ListItemComponent>
    </View>
  )
}

const PostComponent = ({
  theme,
  authUser,
  post,
  postsShareRequest,
  handleEditPress,
  postsArchiveRequest,
  postsFlagRequest,
  postsDeleteRequest,
  postsAnonymouslyLikeRequest,
  postsOnymouslyLikeRequest,
  postsDislikeRequest,
  handleProfilePress,
  postsRestoreArchivedRequest,
  priorityIndex,
  handleScrollPrev,
  handleScrollNext,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  const ref = useRef(null)
  const carouselRef = useRef(null)
  const albumLength = path(['album', 'posts', 'items', 'length'])(post) || 0
  const firstItem = albumLength ?
    path(['album', 'posts', 'items'])(post).findIndex(item => item.postId === post.postId) : 0
  const [activeDotIndex, setActiveDotIndex] = useState(firstItem)

  return (
    <View style={styling.root} ref={ref}>
      <HeaderComponent
        authUser={authUser}
        post={post}
        handleEditPress={handleEditPress}
        postsArchiveRequest={postsArchiveRequest}
        postsFlagRequest={postsFlagRequest}
        postsDeleteRequest={postsDeleteRequest}
        postsShareRequest={postsShareRequest}
        handleProfilePress={handleProfilePress}
        postsRestoreArchivedRequest={postsRestoreArchivedRequest}
      />

      {albumLength > 1 ?
        <Carousel
          firstItem={firstItem}
          ref={carouselRef}
          data={path(['album', 'posts', 'items'])(post)}
          renderItem={PostCarousel({
            carouselRef,
            navigation,
            album: path(['album'])(post),
            theme,
            handleScrollPrev,
            handleScrollNext,
          })}
          sliderWidth={Layout.window.width}
          itemWidth={Layout.window.width}
          removeClippedSubviews={false}
          slideStyle={{
            margin: 0,
            padding: 0,
          }}
          onSnapToItem={setActiveDotIndex}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.5}
        />
      : null}

      {albumLength <= 1 ?
        <ListItemComponent post={post}>
          <ImageComponent
            thumbnailSource={{ uri: path(['mediaObjects', '0', 'url64p'])(post) }}
            imageSource={{ uri: path(['mediaObjects', '0', 'url4k'])(post) }}
            priorityIndex={priorityIndex}
          />
          <TouchableOpacity style={styling.prev} onPress={handleScrollPrev} />
          <TouchableOpacity style={styling.next} onPress={handleScrollNext} />
        </ListItemComponent>
      : null}

      <ActionComponent
        authUser={authUser}
        post={post}
        postsShareRequest={postsShareRequest}
        postsAnonymouslyLikeRequest={postsAnonymouslyLikeRequest}
        postsOnymouslyLikeRequest={postsOnymouslyLikeRequest}
        postsDislikeRequest={postsDislikeRequest}
        pagination={
          <Pagination
            dotsLength={albumLength}
            activeDotIndex={activeDotIndex}
            containerStyle={{
              paddingVertical: 4,
            }}
            dotContainerStyle={{
              marginHorizontal: 4,
            }}
            dotStyle={{
              width: 6,
              height: 6,
              borderRadius: 3,
            }}
            inactiveDotOpacity={0.6}
            inactiveDotScale={1}
            dotColor={theme.colors.primary}
            inactiveDotColor={theme.colors.disabled}
          />
        }
      />
      <ReactionsPreviewTemplate
        post={post}
      />
      <DescriptionComponent
        post={post}
      />

      {pathOr(0, ['commentCount'], post) > 3 ?
        <TouchableOpacity onPress={() => navigation.navigate('Comments', { post })}>
          <Text style={styling.commentCount}>{t('View all {{commentCount}} comments', { commentCount: pathOr(0, ['commentCount'], post) })}</Text>
        </TouchableOpacity>
      : null}

      {pathOr([], ['comments', 'items'], post).map((comment, key) => (
        <CommentComponent key={key} comment={comment} />
      ))}
    </View>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  prev: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: '50%',
    bottom: 0,
    zIndex: 2,
  },
  next: {
    position: 'absolute',
    top: 0,
    left: '50%',
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  commentCount: {
    padding: theme.spacing.base,
    opacity: 0.6,
  },
  carouselItem: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
  },
  album: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.base,
    margin: theme.spacing.base,
    borderRadius: 4,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    zIndex: 3,
  },
})

PostComponent.defaultProps = {
  postsGet: {},
}

PostComponent.propTypes = {
  theme: PropTypes.any,
  authUser: PropTypes.any,
  feedRef: PropTypes.any,
  postsFeedGet: PropTypes.any,
  postsFeedGetRequest: PropTypes.any,
  postsShareRequest: PropTypes.any,
  handleEditPress: PropTypes.any,
  postsArchiveRequest: PropTypes.any,
  postsFlag: PropTypes.any,
  postsFlagRequest: PropTypes.any,
  postsDeleteRequest: PropTypes.any,
  postsAnonymouslyLikeRequest: PropTypes.any,
  postsOnymouslyLikeRequest: PropTypes.any,
  postsDislikeRequest: PropTypes.any,
  usersGetFollowedUsersWithStories: PropTypes.any,
  usersGetFollowedUsersWithStoriesRequest: PropTypes.any, 
}

export default withTheme(PostComponent)
