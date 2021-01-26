import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import HeaderComponent from 'components/Search/Header'
import FormComponent from 'components/Search/Form'
import ResultComponent from 'components/Search/Result'
import FilterComponent from 'components/Search/Filter'
import PostsGridThumbnailComponent from 'components/PostsGrid/Thumbnail'
import { Subheading } from 'react-native-paper'
import path from 'ramda/src/path'
import PostsLoadingComponent from 'components/Feed/PostsLoading'
import ScrollService from 'services/Scroll'
import useViewable from 'services/providers/Viewable'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const SearchComponent = ({
  t,
  theme,
  feedRef,
  usersSearchRequest,
  usersSearch,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
  usersAcceptFollowerUser,
  usersAcceptFollowerUserRequest,
  usersGetTrendingUsers,
  postsGetTrendingPosts,
  postsGetTrendingPostsMoreRequest,
  handleFormChange,
  formChange,
  trendingFilters,
  handleFilterChange,
  postsGetTrendingPostsRequest,
  toggleUsersSearch,
}) => {
  const styling = styles(theme)

  const scroll = ScrollService({
    resource: postsGetTrendingPosts,
    loadInit: postsGetTrendingPostsRequest, 
    loadMore: postsGetTrendingPostsMoreRequest,
    extra: { limit: path(['payload', 'limit'])(postsGetTrendingPosts) },
  })

  const {
    onViewableItemsThumbnailsRef,
    viewabilityConfigRef,
  } = useViewable()

  const isEmpty = !path(['data', 'length'])(postsGetTrendingPosts)
  const isLoading = path(['status'])(postsGetTrendingPosts) === 'loading'

  return (
    <View style={styling.root}>
      <HeaderComponent>
        <FormComponent
          usersSearch={usersSearch}
          usersSearchRequest={usersSearchRequest}
          handleFormChange={handleFormChange}
          toggleUsersSearch={toggleUsersSearch}
          isVisible={usersSearch.isVisible}
        />
        <View style={styling.filters}>
          <FilterComponent
            trendingFilters={trendingFilters}
            handleFilterChange={handleFilterChange}
            isLoading={isLoading}
          />
        </View>
      </HeaderComponent>

      {!usersSearch.isVisible && isLoading && isEmpty ? <PostsLoadingComponent /> : null}

      <FlatList
        ref={feedRef}
        data={postsGetTrendingPosts.data}
        numColumns={3}
        keyExtractor={(item) => item.postId}
        renderItem={({ item: post, index: priorityIndex }) => (
          <PostsGridThumbnailComponent post={post} priorityIndex={priorityIndex} thread="posts/trending" />
        )}
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.border}
            onRefresh={scroll.handleRefresh}
            refreshing={scroll.refreshing}
          />
        }
        ListHeaderComponentStyle={styling.header}
        ListFooterComponent={<ActivityIndicator animating={scroll.loadingmore} color={theme.colors.border} />}
        ListFooterComponentStyle={styling.activity}
        onEndReached={scroll.handleLoadMore}
        onEndReachedThreshold={0.5}
        onViewableItemsChanged={onViewableItemsThumbnailsRef.current}
        viewabilityConfig={viewabilityConfigRef.current}
      />

      {usersSearch.isVisible && formChange ? (
        <View style={styling.overlay}>
          <ScrollView
            keyboardShouldPersistTaps="never"
            ref={feedRef}
            refreshControl={
              <RefreshControl tintColor={theme.colors.border} refreshing={usersSearch.status === 'loading'} />
            }
          >
            <Subheading style={styling.subheading}>{t('Search Result')}</Subheading>
            <ResultComponent
              usersSearch={usersSearch}
              usersFollow={usersFollow}
              usersFollowRequest={usersFollowRequest}
              usersUnfollow={usersUnfollow}
              usersUnfollowRequest={usersUnfollowRequest}
              usersAcceptFollowerUser={usersAcceptFollowerUser}
              usersAcceptFollowerUserRequest={usersAcceptFollowerUserRequest}
            />
          </ScrollView>
        </View>
      ) : null}

      {usersSearch.isVisible && !formChange ? (
        <View style={styling.overlay}>
          <ScrollView
            keyboardShouldPersistTaps="never"
            ref={feedRef}
            refreshControl={
              <RefreshControl tintColor={theme.colors.border} refreshing={usersGetTrendingUsers.status === 'loading'} />
            }
          >
            <Subheading style={styling.subheading}>{t('Trending Users')}</Subheading>
            <ResultComponent
              usersSearch={usersGetTrendingUsers}
              usersFollow={usersFollow}
              usersFollowRequest={usersFollowRequest}
              usersUnfollow={usersUnfollow}
              usersUnfollowRequest={usersUnfollowRequest}
              usersAcceptFollowerUser={usersAcceptFollowerUser}
              usersAcceptFollowerUserRequest={usersAcceptFollowerUserRequest}
            />
          </ScrollView>
        </View>
      ) : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    backgroundColor: theme.colors.backgroundPrimary,
    flex: 1,
  },
  filters: {
    backgroundColor: theme.colors.backgroundPrimary,
    paddingTop: 9,
    paddingBottom: 4,
    paddingHorizontal: 12,
    borderBottomColor: theme.colors.backgroundSecondary,
    borderBottomWidth: 1,
  },
  subheading: {
    paddingTop: 6,
    paddingHorizontal: 12,
  },
  activity: {
    padding: theme.spacing.base * 2,
  },
  header: {
    padding: theme.spacing.base,
    paddingBottom: theme.spacing.base / 2,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    top: 64,
    zIndex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

SearchComponent.propTypes = {
  theme: PropTypes.any,
  usersSearchRequest: PropTypes.any,
  usersSearch: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  t: PropTypes.any,
  feedRef: PropTypes.any,
  usersAcceptFollowerUser: PropTypes.any,
  usersAcceptFollowerUserRequest: PropTypes.any,
  usersGetTrendingUsers: PropTypes.any,
  postsGetTrendingPosts: PropTypes.any,
  postsGetTrendingPostsMoreRequest: PropTypes.any,
  handleFormChange: PropTypes.any,
  formChange: PropTypes.any,
  trendingFilters: PropTypes.any,
  handleFilterChange: PropTypes.func,
  postsGetTrendingPostsRequest: PropTypes.func,
  toggleUsersSearch: PropTypes.func,
}

export default withTranslation()(withTheme(SearchComponent))
