import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native'
import path from 'ramda/src/path'
import PostComponent from 'components/Post'
import NativeError from 'templates/NativeError'
import PostsLoadingComponent from 'components/PostsList/PostsLoading'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PostMedia = ({
  t,
  theme,
  user,
  postsMediaFeedGet,
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
  postsSingleGet,
  postsGetTrendingPosts,
  routeName,

  handleScrollNext,
  handleScrollPrev,
  
  feedRef,
  actionSheetRefs,
  textPostRefs,
  onViewableItemsChangedRef,
  viewabilityConfigRef,
  priorityQueueInstance,
}) => {
  const styling = styles(theme)
  

  /**
   * Component responsible for rendering a selected post + suggested post list
   * 
   * - postsSingleGet is rendered when first entry doesn't match selected postId
   * means we are displaying image that didn't come from profile page posts list
   * (e.g. 1 post is selected post and next is trending images:
   * [{ postedBy: a }, { postedBy: b }, { postedBy: c }])
   * 
   * - postsMediaFeedGet is rendered when first entry matches selected postId
   * means we are displaying image from profile page (e.g. 1 post is selected post and next
   * are profile images: [{ postedBy: a }, { postedBy: a }, { postedBy: a }])
   * 
   * A known bug to be fixed is when you remove delete first post, the sequence will break.
   */
  const flatListType = (path(['data', '0', 'postId'])(postsMediaFeedGet) === path(['data', 'postId'])(postsSingleGet))

  const flatListData = (() => {
    if (routeName === 'FeedProfile') {
      return path(['data'])(postsMediaFeedGet)
    }

    if (routeName === 'ProfileSelf') {
      return path(['data'])(postsMediaFeedGet)
    }

    if (routeName === 'Search') {
      return path(['data'])(postsGetTrendingPosts)
    }

    return [path(['data'])(postsSingleGet)]
  })()

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
        bounces={false}
        ref={feedRef}
        keyExtractor={item => item.postId}
        data={flatListData.slice(0, 6)}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
        renderItem={({ item: post, index }) => (
          <PostComponent
            user={user}
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
            priorityIndex={index}

            handleScrollPrev={handleScrollPrev(index)}
            handleScrollNext={handleScrollNext(index)}
            createActionSheetRef={element => actionSheetRefs.current[post.postId] = element}
            actionSheetRef={actionSheetRefs.current[post.postId]}
            createTextPostRef={element => textPostRefs.current[post.postId] = element}
            textPostRef={textPostRefs.current[post.postId]}
            priorityQueueInstance={priorityQueueInstance}
          />
        )}
      />

      {flatListType && (path(['status'])(postsMediaFeedGet) === 'loading' && !path(['data', 'length'])(postsMediaFeedGet)) ?
        <PostsLoadingComponent />
      : null}
    </View>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  uploading: {
    flexWrap: 'wrap',
  },
})

PostMedia.defaultProps = {
  postsGet: {},
}

PostMedia.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
  feedRef: PropTypes.any,
  postsMediaFeedGet: PropTypes.any,
  postsMediaFeedGetRequest: PropTypes.any,
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

export default withTranslation()(withTheme(PostMedia))
