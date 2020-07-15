import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import HeaderComponent from 'components/Search/Header'
import FormComponent from 'components/Search/Form'
import ResultComponent from 'components/Search/Result'
import PostsGridComponent from 'components/PostsGrid'
import { Subheading } from 'react-native-paper'
import path from 'ramda/src/path'
import PostsLoadingComponent from 'components/Feed/PostsLoading'
import ScrollService from 'services/Scroll'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const SearchComponent = ({
  t,
  theme,
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

  const scroll = ScrollService({
    resource: postsGetTrendingPosts,
    loadInit: postsGetTrendingPostsRequest,
    loadMore: postsGetTrendingPostsMoreRequest,
    extra: { limit: path(['payload', 'limit'])(postsGetTrendingPosts) },
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
              refreshing={scroll.refreshing}
            />
          }
          onScroll={scroll.handleScrollChange}
          scrollEventThrottle={400}
        >
          <PostsGridComponent
            postsGet={postsGetTrendingPosts}
            themeFetch={themeFetch}
            themeCode={path(['themeCode'])(user)}
            thread="posts/trending"
          />

          {scroll.loadingmore ?
            <View style={styling.activity}>
              <ActivityIndicator color={theme.colors.border} />
            </View>
          : null}
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
  activity: {
    padding: theme.spacing.base * 2,
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
