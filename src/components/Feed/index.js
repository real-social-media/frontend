import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import path from 'ramda/src/path'
import ListHeaderComponent from 'components/Feed/ListHeaderComponent'
import BookmarkComponent from 'components/Feed/Bookmark'
import PostComponent from 'components/Post'
import PostServiceComponent from 'components/Post/index.service'
import ScrollService from 'services/Scroll'
import useViewable from 'services/providers/Viewable'

import { withTheme } from 'react-native-paper'
import testIDs from './test-ids'

const Feed = ({
  theme,
  postsFeedGet,
  postsFeedGetRequest,
  postsFeedGetMoreRequest,

  handleScrollPrev,
  handleScrollNext,
  postsGetTrendingPosts,

  bookmarkSeparatorIndex,
  feedRef,

  createActionSheetRef,
  getActionSheetRef,
  createTextPostRef,
  getTextPostRef,
}) => {
  const styling = styles(theme)

  const scroll = ScrollService({
    resource: postsFeedGet,
    loadInit: postsFeedGetRequest,
    loadMore: postsFeedGetMoreRequest,
    multiplier: 3,
  })

  const { onViewableItemsFocusRef, viewabilityConfigRef } = useViewable()

  const renderItem = useCallback(
    ({ item: post, index }) => (
      <React.Fragment>
        {bookmarkSeparatorIndex === index ? <BookmarkComponent postsGetTrendingPosts={postsGetTrendingPosts} /> : null}

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
            />
          )}
        </PostServiceComponent>
      </React.Fragment>
    ),
    [path(['data'])(postsFeedGet)],
  )

  return (
    <View testID={testIDs.root} style={styling.root}>
      <FlatList
        ref={feedRef}
        keyExtractor={(item) => item.postId}
        data={path(['data'])(postsFeedGet)}
        onEndReached={scroll.handleLoadMore}
        onEndReachedThreshold={15}
        scrollEventThrottle={500}
        ListEmptyComponent={scroll.refreshing && <ActivityIndicator tintColor={theme.colors.border} />}
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.border}
            onRefresh={scroll.handleRefresh}
            refreshing={scroll.refreshing}
          />
        }
        onViewableItemsChanged={onViewableItemsFocusRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        ListFooterComponent={scroll.loadingmore ? ActivityIndicator : null}
        ListFooterComponentStyle={styling.loading}
      />
    </View>
  )
}
const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.backgroundPrimary,
    },
    loading: {
      padding: 16,
    },
  })

Feed.defaultProps = {
  postsGet: {},
}

Feed.propTypes = {
  theme: PropTypes.any,
  feedRef: PropTypes.any,
  postsFeedGet: PropTypes.any,
  postsFeedGetRequest: PropTypes.any,
  postsShareRequest: PropTypes.any,
  handleEditPress: PropTypes.any,
  postsArchiveRequest: PropTypes.any,
  postsFlag: PropTypes.any,
  postsFlagRequest: PropTypes.any,
  postsDeleteRequest: PropTypes.any,
  postsOnymouslyLikeRequest: PropTypes.any,
  postsDislikeRequest: PropTypes.any,
  postsFeedGetMoreRequest: PropTypes.any,
  postsRestoreArchivedRequest: PropTypes.any,
  handleScrollPrev: PropTypes.any,
  handleScrollNext: PropTypes.any,
  postsGetTrendingPosts: PropTypes.any,
  bookmarkSeparatorIndex: PropTypes.any,
  createActionSheetRef: PropTypes.any,
  getActionSheetRef: PropTypes.any,
  createTextPostRef: PropTypes.any,
  getTextPostRef: PropTypes.any,
}

export default withTheme(Feed)
