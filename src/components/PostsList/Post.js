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

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const PostCarousel = (
  ref,
  theme,
  handleScrollPrev,
  handleScrollNext,
) => ({
  item: post,
  index,
}) => {
  const styling = styles(theme)

  return (
    <ListItemComponent post={post}>
      <ImageComponent
        thumbnailSource={{ uri: path(['mediaObjects', '0', 'url64p'])(post) }}
        imageSource={{ uri: path(['mediaObjects', '0', 'url4k'])(post) }}
        priorityIndex={index}
      />
      <TouchableOpacity style={styling.prev} onPress={handleScrollPrev} />
      <TouchableOpacity style={styling.next} onPress={handleScrollNext} />
    </ListItemComponent>
  )
}

const PostComponent = ({
  theme,
  navigation,
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

  const ref = useRef(null)
  const carouselRef = useRef(null)
  const [activeDotIndex, setActiveDotIndex] = useState(0)
  const albumLength = path(['album', 'posts', 'items', 'length'])(post) || 0

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
          firstItem={0}
          ref={carouselRef}
          data={path(['album', 'posts', 'items'])(post)}
          renderItem={PostCarousel(carouselRef, theme, handleScrollPrev, handleScrollNext)}
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
  },
  next: {
    position: 'absolute',
    top: 0,
    left: '50%',
    right: 0,
    bottom: 0,
  },
  commentCount: {
    padding: theme.spacing.base,
    opacity: 0.6,
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
  usersStoriesGet: PropTypes.any,
  usersStoriesGetRequest: PropTypes.any,
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

export default withNavigation(
  withTheme(PostComponent)
)
