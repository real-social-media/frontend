import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import path from 'ramda/src/path'
import { Text } from 'react-native-paper'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import UserRowActionComponent from 'templates/UserRowAction'
import Avatar from 'templates/Avatar'
import * as navigationActions from 'navigation/actions'
import * as UserService from 'services/User'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const Result = ({
  theme,
  usersSearch,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
  usersAcceptFollowerUser,
  usersAcceptFollowerUserRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <RowsComponent items={path(['data'])(usersSearch)}>
        {(user) => (
          <RowsItemComponent>
            <UserRowComponent
              avatar={
                <TouchableOpacity onPress={navigationActions.navigateProfile(navigation, { userId: user.userId })}>
                  <Avatar
                    key={path(['photo', 'url64p'])(user)}
                    active={UserService.hasActiveStories(user)}
                    thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
                    imageSource={{ uri: path(['photo', 'url64p'])(user) }}
                    themeCode={path(['themeCode'])(user)}
                  />
                </TouchableOpacity>
              }
              content={
                <TouchableOpacity
                  onPress={navigationActions.navigateProfile(navigation, { userId: user.userId })}
                  style={styling.user}
                >
                  <Text style={styling.username}>{path(['username'])(user)}</Text>
                  <Text style={styling.fullname}>{path(['fullName'])(user)}</Text>
                </TouchableOpacity>
              }
              action={
                <UserRowActionComponent
                  followActive={path(['followedStatus'])(user) === 'NOT_FOLLOWING'}
                  followloading={
                    usersFollow.status === 'loading' &&
                    path(['payload', 'userId'])(usersFollow) === path(['userId'])(user)
                  }
                  onFollowPress={() => usersFollowRequest({ userId: path(['userId'])(user) })}
                  unfollowActive={path(['followedStatus'])(user) === 'FOLLOWING'}
                  unfollowloading={
                    usersUnfollow.status === 'loading' &&
                    path(['payload', 'userId'])(usersUnfollow) === path(['userId'])(user)
                  }
                  onUnfollowPress={() => usersUnfollowRequest({ userId: path(['userId'])(user) })}
                  requestActive={path(['followedStatus'])(user) === 'REQUESTED'}
                  requestloading={
                    usersUnfollow.status === 'loading' &&
                    path(['payload', 'userId'])(usersUnfollow) === path(['userId'])(user)
                  }
                  onRequestedPress={() => usersUnfollowRequest({ userId: path(['userId'])(user) })}
                  replyActive={path(['followerStatus'])(user) === 'REQUESTED'}
                  replyloading={
                    usersAcceptFollowerUser.status === 'loading' &&
                    path(['payload', 'userId'])(usersAcceptFollowerUser) === path(['userId'])(user)
                  }
                  onReplyPress={() => usersAcceptFollowerUserRequest({ userId: path(['userId'])(user) })}
                />
              }
            />
          </RowsItemComponent>
        )}
      </RowsComponent>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: theme.spacing.base,
    },
    user: {
      paddingHorizontal: 8,
    },
    username: {},
    fullname: {},
  })

Result.propTypes = {
  theme: PropTypes.any,
  usersSearch: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  usersAcceptFollowerUser: PropTypes.any,
  usersAcceptFollowerUserRequest: PropTypes.any,
}

export default withTheme(Result)
