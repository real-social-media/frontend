import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native'
import HeaderComponent from 'components/Search/Header'
import FormComponent from 'components/Search/Form'
import ResultComponent from 'components/Search/Result'
import PostsGridComponent from 'components/PostsGrid'
import { Subheading } from 'react-native-paper'
import path from 'ramda/src/path'
import PostsLoadingComponent from 'components/PostsList/PostsLoading'
import ContextComponent from 'components/Cache/Context'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ScrollHelper = ({
  postsGetTrendingPosts,
  postsGetTrendingPostsMoreRequest,
  postsGetTrendingPostsRequest,
}) => {
  const handleLoadMore = () => {
    if (
      postsGetTrendingPosts.status === 'loading' ||
      !path(['data', 'length'])(postsGetTrendingPosts) ||
      !path(['meta', 'nextToken'])(postsGetTrendingPosts) ||
      path(['meta', 'nextToken'])(postsGetTrendingPosts) === path(['payload', 'nextToken'])(postsGetTrendingPosts)
    ) { return }
    postsGetTrendingPostsMoreRequest({ nextToken: path(['meta', 'nextToken'])(postsGetTrendingPosts) })
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 1000

  const handleScrollChange = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent)) {
      handleLoadMore()
    }
  }
  
  const handleRefresh = () => {
    postsGetTrendingPostsRequest({})
  }

  return {
    handleScrollChange,
    handleRefresh,
  }
}

const SearchComponent = ({
  t,
  theme,
  themes,
  feedRef,
  user,
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
  postsGetTrendingPostsRequest,
  postsGetTrendingPostsMoreRequest,
  handleFormFocus,
  formFocus,
  handleFormChange,
  formChange,
  themeFetch,
}) => {
  const styling = styles(theme)

  const scroll = ScrollHelper({
    postsGetTrendingPosts,
    postsGetTrendingPostsMoreRequest,
    postsGetTrendingPostsRequest,
  })
  
  return (
    <View style={styling.root}>
      <HeaderComponent>
        <FormComponent
          usersSearch={usersSearch}
          usersSearchRequest={usersSearchRequest}
          handleFormFocus={handleFormFocus}
          handleFormChange={handleFormChange}
        />
      </HeaderComponent>

      {!formFocus && (path(['status'])(postsGetTrendingPosts) === 'loading' && !path(['data', 'length'])(postsGetTrendingPosts)) ?
        <PostsLoadingComponent />
      : null}

      {!formFocus ?
        <ScrollView
          keyboardShouldPersistTaps="never"
          ref={feedRef}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.border}
              onRefresh={scroll.handleRefresh}
              refreshing={postsGetTrendingPosts.status === 'loading'}
            />
          }
          onScroll={scroll.handleScrollChange}
          scrollEventThrottle={400}
        >
          <ContextComponent.Consumer>
            {(contextProps) => (
              <PostsGridComponent
                themes={themes}
                postsGet={postsGetTrendingPosts}
                themeFetch={themeFetch}
                themeCode={path(['themeCode'])(user)}
                priorityQueueInstance={contextProps.searchImages}
              />
            )}
          </ContextComponent.Consumer>
        </ScrollView>
      : null}

      {formFocus && formChange ?
        <ScrollView
          keyboardShouldPersistTaps="never"
          ref={feedRef}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.border}
              refreshing={usersSearch.status === 'loading'}
            />
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
      : null}

      {formFocus && !formChange ?
        <ScrollView
          keyboardShouldPersistTaps="never"
          ref={feedRef}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.border}
              refreshing={usersGetTrendingUsers.status === 'loading'}
            />
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
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    backgroundColor: theme.colors.backgroundPrimary,
    flex: 1,
  },
  subheading: {
    paddingTop: 6,
    paddingHorizontal: 12,
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
  themes: PropTypes.any,
  feedRef: PropTypes.any,
  user: PropTypes.any,
  usersAcceptFollowerUser: PropTypes.any,
  usersAcceptFollowerUserRequest: PropTypes.any,
  usersGetTrendingUsers: PropTypes.any,
  postsGetTrendingPosts: PropTypes.any,
  postsGetTrendingPostsRequest: PropTypes.any,
  postsGetTrendingPostsMoreRequest: PropTypes.any,
  handleFormFocus: PropTypes.any,
  formFocus: PropTypes.any,
  handleFormChange: PropTypes.any,
  formChange: PropTypes.any,
  themeFetch: PropTypes.any,
}

export default withTranslation()(withTheme(SearchComponent))
