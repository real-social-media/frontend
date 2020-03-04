import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import PostsGridComponent from 'components/PostsGrid'
import CountsComponent from 'components/Profile/Counts'
import AboutComponent from 'components/Profile/About'
import ActionComponent from 'components/Profile/Action'
import Avatar from 'templates/Avatar'
import NativeError from 'templates/NativeError'
import path from 'ramda/src/path'
import PostsLoadingComponent from 'components/PostsList/PostsLoading'
import ProfileStatusComponent from 'components/Profile/Status'
import ProfilePrivateComponent from 'components/Profile/Private'
import pathOr from 'ramda/src/pathOr'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const ScrollHelper = ({
  userId,
  postsGet,
  postsGetRequest,
  postsGetMoreRequest,
  usersGetProfileRequest,
  usersGetProfileSelfRequest,
}) => {
  const handleLoadMore = () => {
    if (
      refreshing ||
      !path(['data', 'length'])(postsGet) ||
      !path(['meta', 'nextToken'])(postsGet) ||
      path(['meta', 'nextToken'])(postsGet) === path(['payload', 'nextToken'])(postsGet)
    ) { return }
    postsGetMoreRequest({ nextToken: path(['meta', 'nextToken'])(postsGet) })
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 160

  const handleScrollChange = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent)) {
      handleLoadMore()
    }
  }
  
  const refreshing = (
    postsGet.status === 'loading'
  )
  
  const loadingmore = (
    postsGet.status === 'loading'
  )

  const handleRefresh = () => {
    if (typeof usersGetProfileRequest === 'function') {
      usersGetProfileRequest({ userId })
    }

    if (typeof usersGetProfileSelfRequest === 'function') {
      usersGetProfileSelfRequest({ userId })
    }

    postsGetRequest({ userId })
  }

  return {
    handleScrollChange,
    loadingmore,
    handleRefresh,
    refreshing,
  }
}

const Profile = ({
  theme,
  profileRef,
  authUser,
  usersBlock,
  usersBlockRequest,
  usersUnblock,
  usersUnblockRequest,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
  postsGet,
  postsGetRequest,
  postsGetMoreRequest,
  themeFetch,
  usersGetProfile,
  usersGetProfileRequest,
  usersGetProfileSelfRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()

  const handleUserStoryPress = () => {
    if (!pathOr(0, ['data', 'stories', 'items', 'length'], usersGetProfile)) {
      return
    }

    navigation.push('Story', {
      user: usersGetProfile.data,
      usersGetFollowedUsersWithStories: { data: [usersGetProfile.data] },
    })
  }

  const self = path(['data', 'userId'])(usersGetProfile) === path(['userId'])(authUser)

  const scroll = ScrollHelper({
    userId: path(['data', 'userId'])(usersGetProfile),
    postsGet,
    postsGetRequest,
    postsGetMoreRequest,
    usersGetProfileRequest,
    usersGetProfileSelfRequest,
  })

  return (
    <View style={styling.root}>
      <NativeError
        handleCancelPress={() => {}}
        titleText={t('All good!')}
        messageText={t('User is blocked and will not have an access to your posts')}
        actionText={t('Done')}
        status={path(['status'])(usersBlock)}
        triggerOn="success"
      />
      <ScrollView
        ref={profileRef}
        onScroll={scroll.handleScrollChange}
        scrollEventThrottle={400}
        refreshControl={(
          <RefreshControl
            tintColor={theme.colors.border}
            onRefresh={scroll.handleRefresh}
            refreshing={scroll.refreshing}
          />
        )}
      >
        {route.name === 'ProfileSelf' ?
          <ProfileStatusComponent />
        : null}

        <View style={styling.component}>
          <TouchableOpacity style={styling.image} onPress={handleUserStoryPress}>
            <Avatar
              size="large"
              active
              thumbnailSource={{ uri: path(['data', 'photo', 'url64p'])(usersGetProfile) }}
              imageSource={{ uri: path(['data', 'photo', 'url480p'])(usersGetProfile) }}
              themeCode={path(['data', 'themeCode'])(usersGetProfile)}
            />
          </TouchableOpacity>
          <View style={styling.counts}>
            <CountsComponent
              usersGetProfile={usersGetProfile}
            />
          </View>
        </View>
        <View style={styling.about}>
          <AboutComponent
            authUser={authUser}
            usersGetProfile={usersGetProfile}
          />
        </View>
        <View style={styling.action}>
          <ActionComponent
            self={self}
            usersGetProfile={usersGetProfile}
            usersBlock={usersBlock}
            usersBlockRequest={usersBlockRequest}
            usersUnblock={usersUnblock}
            usersUnblockRequest={usersUnblockRequest}
            usersFollow={usersFollow}
            usersFollowRequest={usersFollowRequest}
            usersUnfollow={usersUnfollow}
            usersUnfollowRequest={usersUnfollowRequest}
          />
        </View>

        {(
          path(['data', 'privacyStatus'])(usersGetProfile) === 'PRIVATE' &&
          path(['data', 'followedStatus'])(usersGetProfile) === 'NOT_FOLLOWING'
        ) ? (
          <ProfilePrivateComponent />
        ) : (
          <PostsGridComponent
            postsGet={postsGet}
            themeFetch={themeFetch}
            themeCode={path(['data', 'themeCode'])(usersGetProfile)}
          />
        )}

        {(path(['status'])(postsGet) === 'loading' && !path(['data', 'length'])(postsGet)) ?
          <PostsLoadingComponent />
        : null}

        {scroll.loadingmore ?
          <View style={styling.loading}>
            <ActivityIndicator />
          </View>
        : null}
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  image: {
    paddingRight: 12,
  },
  counts: {
    flex: 1,
  },
  about: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  action: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  loading: {
    padding: 16,
  },
})

Profile.propTypes = {
  theme: PropTypes.any,
  usersGetProfile: PropTypes.any,
  authUser: PropTypes.any,
  usersBlock: PropTypes.any,
  usersBlockRequest: PropTypes.any,
  usersUnblock: PropTypes.any,
  usersUnblockRequest: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  postsGet: PropTypes.any,
}

export default withTheme(Profile)
