import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import path from 'ramda/src/path'
import UploadingComponent from 'components/Feed/Uploading'
import PendingRequestsComponent from 'components/Feed/PendingRequests'
import BookmarkComponent from 'components/Feed/Bookmark'
import PostComponent from 'components/Post'
import PostServiceComponent from 'components/Post/index.service'
import StoriesComponent from 'components/Stories'
import StoriesServiceComponent from 'components/Stories/index.service'
import FeedCardsComponent from 'components/FeedCards'
import FeedCardsServiceComponent from 'components/FeedCards/index.service'
import ContextComponent from 'components/Cache/Context'
import ScrollService from 'services/Scroll'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Feed = ({
  t,
  theme,
  user,
  postsFeedGet,
  postsFeedGetRequest,
  postsFeedGetMoreRequest,

  postsCreateRequest,
  postsCreateIdle,
  postsCreateQueue,
  usersGetPendingFollowers,
  handleScrollPrev,
  handleScrollNext,
  postsGetTrendingPosts,

  bookmarkSeparatorIndex,
  feedRef,
  onViewableItemsChangedRef,
  viewabilityConfigRef,

  createActionSheetRef,
  getActionSheetRef,
  createTextPostRef,
  getTextPostRef,
}) => {
  const styling = styles(theme)
  
  const scroll = ScrollService({
    resource: postsFeedGet,
    loadInit: () => (
      postsFeedGetRequest()
    ),
    loadMore: postsFeedGetMoreRequest,
    multiplier: 3,
  })

  const renderItem = useCallback(({ item: post, index }) => (
    <ContextComponent.Consumer>
      {(contextProps) => (
        <React.Fragment>
          {(bookmarkSeparatorIndex === index) ?
            <BookmarkComponent
              postsGetTrendingPosts={postsGetTrendingPosts}
            />
          : null}

          <PostServiceComponent>
            {(postProps) => (
              <PostComponent
                {...postProps}
                post={post}
                priorityIndex={index}

                handleScrollPrev={handleScrollPrev(index)}
                handleScrollNext={handleScrollNext(index)}
                createActionSheetRef={createActionSheetRef(post)}
                actionSheetRef={getActionSheetRef(post)}
                createTextPostRef={createTextPostRef(post)}
                textPostRef={getTextPostRef(post)}
                feedRef={feedRef}
                priorityQueueInstance={contextProps.feedImages}
              />
            )}
          </PostServiceComponent>
        </React.Fragment>
      )}
    </ContextComponent.Consumer>
  ), [path(['data'])(postsFeedGet)])

  return (
    <View style={styling.root}>
      <FlatList
        ref={feedRef}
        keyExtractor={item => item.postId}
        data={path(['data'])(postsFeedGet)}
        onEndReached={scroll.handleLoadMore}
        onEndReachedThreshold={0.4}
        scrollEventThrottle={500}
        refreshControl={(
          <RefreshControl
            tintColor={theme.colors.border}
            onRefresh={scroll.handleRefresh}
            refreshing={scroll.refreshing}
          />
        )}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
        ListHeaderComponent={useCallback(() => (
          <React.Fragment>
            <StoriesServiceComponent>
              {((storiesProps) => (
                <StoriesComponent
                  {...storiesProps}
                />
              ))}
            </StoriesServiceComponent>

            <FeedCardsServiceComponent>
              {(cardsProps) => (
                <FeedCardsComponent
                  {...cardsProps}
                />
              )}
            </FeedCardsServiceComponent>

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
          </React.Fragment>
        ), [])}
        renderItem={renderItem}
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

Feed.defaultProps = {
  postsGet: {},
}

Feed.propTypes = {
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
  t: PropTypes.any,
  themes: PropTypes.any,
  postsFeedGetMoreRequest: PropTypes.any,
  postsRestoreArchivedRequest: PropTypes.any,
  postsCreateRequest: PropTypes.any,
  postsCreateIdle: PropTypes.any,
  postsCreateQueue: PropTypes.any,
  usersGetPendingFollowers: PropTypes.any,
  handleScrollPrev: PropTypes.any,
  handleScrollNext: PropTypes.any,
  postsGetTrendingPosts: PropTypes.any,
  bookmarkSeparatorIndex: PropTypes.any,
  onViewableItemsChangedRef: PropTypes.any,
  viewabilityConfigRef: PropTypes.any,
  createActionSheetRef: PropTypes.any,
  getActionSheetRef: PropTypes.any,
  createTextPostRef: PropTypes.any,
  getTextPostRef: PropTypes.any,
}

export default withTranslation()(withTheme(Feed))
