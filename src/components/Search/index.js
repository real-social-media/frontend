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

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const SearchComponent = ({
  theme,
  authUser,
  usersSearchRequest,
  usersSearch,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
  usersAcceptFollowerUser,
  usersAcceptFollowerUserRequest,
  handleProfilePress,
  usersGetTrendingUsers,
  postsGetTrendingPosts,
  handleFormFocus,
  formFocus,
  handleFormChange,
  formChange,
  themeFetch,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

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
        <ScrollView>
          <PostsGridComponent
            postsGet={postsGetTrendingPosts}
            themeFetch={themeFetch}
            themeCode={path(['themeCode'])(authUser)}
          />
        </ScrollView>
      : null}

      {formFocus && formChange ?
        <ScrollView refreshControl={<RefreshControl tintColor={theme.colors.border} refreshing={usersSearch.status === 'loading'} />}>
          <Subheading style={styling.subheading}>{t('Search Result')}</Subheading>
          <ResultComponent
            usersSearch={usersSearch}
            usersFollow={usersFollow}
            usersFollowRequest={usersFollowRequest}
            usersUnfollow={usersUnfollow}
            usersUnfollowRequest={usersUnfollowRequest}
            handleProfilePress={handleProfilePress}
            usersAcceptFollowerUser={usersAcceptFollowerUser}
            usersAcceptFollowerUserRequest={usersAcceptFollowerUserRequest}
          />
        </ScrollView>
      : null}

      {formFocus && !formChange ?
        <ScrollView refreshControl={<RefreshControl tintColor={theme.colors.border} refreshing={usersGetTrendingUsers.status === 'loading'} />}>
          <Subheading style={styling.subheading}>{t('Trending Users')}</Subheading>
          <ResultComponent
            usersSearch={usersGetTrendingUsers}
            usersFollow={usersFollow}
            usersFollowRequest={usersFollowRequest}
            usersUnfollow={usersUnfollow}
            usersUnfollowRequest={usersUnfollowRequest}
            handleProfilePress={handleProfilePress}
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
}

export default withTheme(SearchComponent)
