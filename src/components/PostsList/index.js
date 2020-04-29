import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import path from 'ramda/src/path'
import PostComponent from 'components/Post'
import UploadingComponent from 'components/PostsList/Uploading'
import PendingRequestsComponent from 'components/PostsList/PendingRequests'
import BookmarkComponent from 'components/PostsList/Bookmark'
import NativeError from 'templates/NativeError'
import StoriesComponent from 'components/Stories'
import ContextComponent from 'components/Cache/Context'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ScrollHelper = ({
  postsFeedGet,
  postsFeedGetMoreRequest,
  postsFeedGetRequest,
  usersGetFollowedUsersWithStoriesRequest,
}) => {
  const handleLoadMore = () => {
    if (
      postsFeedGet.status === 'loading' ||
      !path(['data', 'length'])(postsFeedGet) ||
      !path(['meta', 'nextToken'])(postsFeedGet) ||
      path(['meta', 'nextToken'])(postsFeedGet) === path(['payload', 'nextToken'])(postsFeedGet)
    ) { return }
    postsFeedGetMoreRequest({ nextToken: path(['meta', 'nextToken'])(postsFeedGet) })
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 1000

  const handleScrollChange = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent)) {
      handleLoadMore()
    }
  }
  
  const handleRefresh = () => {
    postsFeedGetRequest({})
    usersGetFollowedUsersWithStoriesRequest()
  }

  return {
    handleScrollChange,
    handleRefresh,
  }
}

const PostsList = ({
  t,
  theme,
  themes,
  user,
  postsFeedGet,
  postsFeedGetRequest,
  postsFeedGetMoreRequest,
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
  usersGetPendingFollowers,
  onViewableItemsChanged,
  handleScrollPrev,
  handleScrollNext,
  postsGetTrendingPosts,

  bookmarkSeparatorIndex,
  feedRef,
  actionSheetRefs,
  textPostRefs,
  onViewableItemsChangedRef,
  viewabilityConfigRef,
}) => {
  const styling = styles(theme)
  
  const scroll = ScrollHelper({
    postsFeedGet,
    postsFeedGetMoreRequest,
    postsFeedGetRequest,
    usersGetFollowedUsersWithStoriesRequest,
  })

  const renderItem = useCallback(({ item: post, index }) => (
    <ContextComponent.Consumer>
      {(contextProps) => (
        <>
          {(
            bookmarkSeparatorIndex === index &&
            bookmarkSeparatorIndex > 0
          ) ?
            <BookmarkComponent
              postsGetTrendingPosts={postsGetTrendingPosts}
            />
          : null}

          <PostComponent
            themes={themes}
            user={user}

            handleEditPress={handleEditPress}
            postsArchiveRequest={postsArchiveRequest}
            postsRestoreArchivedRequest={postsRestoreArchivedRequest}
            postsFlagRequest={postsFlagRequest}
            postsDeleteRequest={postsDeleteRequest}
            postsShareRequest={postsShareRequest}
            postsAnonymouslyLikeRequest={postsAnonymouslyLikeRequest}
            postsOnymouslyLikeRequest={postsOnymouslyLikeRequest}
            postsDislikeRequest={postsDislikeRequest}

            post={post}
            priorityIndex={index}

            handleScrollPrev={handleScrollPrev(index)}
            handleScrollNext={handleScrollNext(index)}
            createActionSheetRef={element => {
              if (!actionSheetRefs.current[post.postId]) {
                actionSheetRefs.current[post.postId] = element
              }
            }}
            actionSheetRef={actionSheetRefs.current[post.postId]}
            createTextPostRef={element => {
              if (!textPostRefs.current[post.postId]) {
                textPostRefs.current[post.postId] = element
              }
            }}
            textPostRef={textPostRefs.current[post.postId]}
            feedRef={feedRef}
            priorityQueueInstance={contextProps.feedImages}
          />
        </>
      )}
    </ContextComponent.Consumer>
  ))

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
        data={path(['data'])(postsFeedGet)}
        onScroll={scroll.handleScrollChange}
        onEndReached={scroll.handleLoadMore}
        onEndReachedThreshold={0.4}
        scrollEventThrottle={500}
        refreshControl={(
          <RefreshControl
            tintColor={theme.colors.border}
            onRefresh={scroll.handleRefresh}
            refreshing={postsFeedGet.status === 'loading'}
          />
        )}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
        ListHeaderComponent={() => <>
          <StoriesComponent
            user={user}
            usersGetFollowedUsersWithStories={usersGetFollowedUsersWithStories}
          />

          <View style={styling.uploading}>
            {Object.values(postsCreateQueue).map((post, key) => (
              <UploadingComponent
                key={key}
                user={user}
                post={post}
                postsCreateRequest={postsCreateRequest}
                postsCreateIdle={postsCreateIdle}
              />
            ))}
          </View>

          <View style={styling.uploading}>
            <PendingRequestsComponent
              usersGetPendingFollowers={usersGetPendingFollowers}
            />
          </View>
        </>}
        renderItem={renderItem}
        ListFooterComponent={postsFeedGet.status === 'loading' ? ActivityIndicator : null}
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
  user: PropTypes.any,
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
  t: PropTypes.any,
  themes: PropTypes.any,
  postsFeedGetMoreRequest: PropTypes.any,
  postsRestoreArchivedRequest: PropTypes.any,
  postsCreateRequest: PropTypes.any,
  postsCreateIdle: PropTypes.any,
  postsCreateQueue: PropTypes.any,
  usersGetPendingFollowers: PropTypes.any,
  onViewableItemsChanged: PropTypes.any,
  handleScrollPrev: PropTypes.any,
  handleScrollNext: PropTypes.any,
  postsGetTrendingPosts: PropTypes.any,
  bookmarkSeparatorIndex: PropTypes.any,
  actionSheetRefs: PropTypes.any,
  textPostRefs: PropTypes.any,
  onViewableItemsChangedRef: PropTypes.any,
  viewabilityConfigRef: PropTypes.any,
}

export default withTranslation()(withTheme(PostsList))
