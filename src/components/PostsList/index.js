import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import path from 'ramda/src/path'
import PostComponent from 'components/PostsList/Post'
import UploadingComponent from 'components/PostsList/Uploading'
import PendingRequestsComponent from 'components/PostsList/PendingRequests'
import NativeError from 'templates/NativeError'
import StoriesComponent from 'components/Stories'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const ScrollHelper = ({
  navigation,
  postsFeedGet,
  postsFeedGetMoreRequest,
  layoutPostsListScrollSuccess,
  usersStoriesGet,
  usersGetFollowedUsersWithStories,
  postsFeedGetRequest,
  usersStoriesGetRequest,
  usersGetFollowedUsersWithStoriesRequest,
}) => {
  const handleLoadMore = () => {
    if (
      refreshing ||
      !path(['data', 'length'])(postsFeedGet) ||
      !path(['meta', 'nextToken'])(postsFeedGet) ||
      path(['meta', 'nextToken'])(postsFeedGet) === path(['payload', 'nextToken'])(postsFeedGet)
    ) { return }
    postsFeedGetMoreRequest({ nextToken: path(['meta', 'nextToken'])(postsFeedGet) })
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 1000

  const handleScrollChange = ({ nativeEvent }) => {
    if (navigation.state.routeName === 'Feed') {
      layoutPostsListScrollSuccess(nativeEvent.contentOffset)
    }

    if (isCloseToBottom(nativeEvent)) {
      handleLoadMore()
    }
  }
  
  const refreshing = (
    navigation.state.routeName !== 'Theme' && (
      postsFeedGet.status === 'loading' ||
      usersStoriesGet.status === 'loading' ||
      usersGetFollowedUsersWithStories.status === 'loading'
    )
  )
  
  const loadingmore = (
    postsFeedGet.status === 'loading'
  )

  const handleRefresh = () => {
    postsFeedGetRequest({})
    usersStoriesGetRequest()
    usersGetFollowedUsersWithStoriesRequest()
  }

  return {
    handleScrollChange,
    loadingmore,
    handleRefresh,
    refreshing,
  }
}

const PostsList = ({
  theme,
  navigation,
  authUser,
  feedRef,
  postsFeedGet,
  postsFeedGetRequest,
  postsFeedGetMoreRequest,
  usersStoriesGet,
  usersStoriesGetRequest,
  postsShareRequest,
  handleEditPress,
  postsArchiveRequest,
  postsRestoreArchivedRequest,
  postsFlag,
  postsFlagRequest,
  postsDeleteRequest,
  postsAnonymouslyLikeRequest,
  postsOnymouslyLikeRequest,
  postsDislikeRequest,
  usersGetFollowedUsersWithStories,
  usersGetFollowedUsersWithStoriesRequest,
  postsCreateRequest,
  postsCreateIdle,
  postsCreateQueue,
  handleProfilePress,
  layoutPostsListItem,
  layoutPostsListItemSuccess,
  layoutPostsListScroll,
  layoutPostsListScrollSuccess,
  usersGetPendingFollowers,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const scroll = ScrollHelper({
    navigation,
    postsFeedGet,
    postsFeedGetMoreRequest,
    layoutPostsListScrollSuccess,
    usersStoriesGet,
    usersGetFollowedUsersWithStories,
    postsFeedGetRequest,
    usersStoriesGetRequest,
    usersGetFollowedUsersWithStoriesRequest,
  })

  return (
    <View style={styling.root}>
      <NativeError
        handleCancelPress={() => {}}
        titleText={t('All good!')}
        messageText={t('This post has been flagged as inappropriate')}
        actionText={t('Done')}
        status={postsFlag.status}
        triggerOn="success"
      />

      <FlatList
        ref={feedRef}
        keyExtractor={item => item.postId}
        data={([
          { postId: 'story' },
          {
            postId: 'uploading',
            postsCreateQueue,
          },
          { postId: 'requests' },
          ...path(['data'])(postsFeedGet),
          { postId: 'loading' },
        ])}
        onScroll={scroll.handleScrollChange}
        scrollEventThrottle={500}
        refreshControl={(
          <RefreshControl
            tintColor={theme.colors.border}
            onRefresh={scroll.handleRefresh}
            refreshing={scroll.refreshing}
          />
        )}
        renderItem={({ item: post, index }) => {
          if (post.postId === 'story') {
            return (
              <StoriesComponent
                authUser={authUser}
                usersGetFollowedUsersWithStories={usersGetFollowedUsersWithStories}
                usersStoriesGet={usersStoriesGet}
              />
            )
          }

          if (post.postId === 'uploading') {
            return (
              <View style={styling.uploading}>
                {Object.values(post.postsCreateQueue).map((post) => (
                  <UploadingComponent
                    key={post.postId}
                    post={post}
                    postsCreateRequest={postsCreateRequest}
                    postsCreateIdle={postsCreateIdle}
                  />
                ))}
              </View>
            )
          }

          if (post.postId === 'requests') {
            if (!path(['data', 'length'])(usersGetPendingFollowers)) {
              return null
            }

            return (
              <View style={styling.uploading} key={post.postId}>
                <PendingRequestsComponent
                  usersGetPendingFollowers={usersGetPendingFollowers}
                  key={post.postId}
                />
              </View>
            )
          }


          if (post.postId === 'loading') {
            if (path(['status'])(postsFeedGet) === 'loading' && !path(['data', 'length'])(postsFeedGet)) {
              return null
            }
            return null
          }

          return (
            <PostComponent
              authUser={authUser}
              post={post}
              handleEditPress={handleEditPress}
              postsArchiveRequest={postsArchiveRequest}
              postsRestoreArchivedRequest={postsRestoreArchivedRequest}
              postsFlagRequest={postsFlagRequest}
              postsDeleteRequest={postsDeleteRequest}
              postsShareRequest={postsShareRequest}
              postsAnonymouslyLikeRequest={postsAnonymouslyLikeRequest}
              postsOnymouslyLikeRequest={postsOnymouslyLikeRequest}
              postsDislikeRequest={postsDislikeRequest}
              handleProfilePress={handleProfilePress}
              onMeasure={layoutPostsListItemSuccess}
              scrollPosition={layoutPostsListScroll.data.y}
              priorityIndex={index}
            />
          )
        }}
        ListFooterComponent={scroll.loadingmore ? ActivityIndicator : null}
        ListFooterComponentStyle={styling.loading}
      />

    </View>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  loading: {
    padding: 16,
  },
  uploading: {
    flexWrap: 'wrap',
  },
})

PostsList.defaultProps = {
  postsGet: {},
}

PostsList.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
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
  withTheme(PostsList)
)
