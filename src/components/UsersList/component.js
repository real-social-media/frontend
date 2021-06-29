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
import Username from 'components/Post/Username'
import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const UsersList = ({
  theme,
  usersSearch,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
  usersAcceptFollowerUser,
  usersAcceptFollowerUserRequest,
  usersDeclineFollowerUser,
  usersDeclineFollowerUserRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <RowsComponent items={path(['data'])(usersSearch)}>
        {(user) => {
          const uri = path(['photo', 'url64p'])(user)
          const userId = path(['userId'])(user)
          const followedStatus = path(['followedStatus'])(user)
          const followerStatus = path(['followerStatus'])(user)
          const isLoading = (data) => data.status === 'loading' && path(['payload', 'userId'])(data) === userId

          return (
            <RowsItemComponent>
              <UserRowComponent
                avatar={
                  <TouchableOpacity onPress={() => navigationActions.navigateProfile(navigation, { userId })}>
                    <Avatar
                      key={uri}
                      active={UserService.hasActiveStories(user)}
                      thumbnailSource={{ uri }}
                      imageSource={{ uri }}
                      themeCode={path(['themeCode'])(user)}
                    />
                  </TouchableOpacity>
                }
                content={
                  <TouchableOpacity
                    onPress={() => navigationActions.navigateProfile(navigation, { userId })}
                    style={styling.user}
                  >
                    <Username user={user} />
                    <Text style={styling.fullname} numberOfLines={1} ellipsizeMode="tail">
                      {path(['fullName'])(user)}
                    </Text>
                  </TouchableOpacity>
                }
                action={
                  <UserRowActionComponent
                    followActive={followedStatus === 'NOT_FOLLOWING'}
                    followLoading={isLoading(usersFollow)}
                    onFollowPress={() => usersFollowRequest({ userId })}
                    unfollowActive={followedStatus === 'FOLLOWING'}
                    unfollowLoading={isLoading(usersUnfollow)}
                    onUnfollowPress={() => usersUnfollowRequest({ userId })}
                    requestActive={followedStatus === 'REQUESTED'}
                    requestLoading={isLoading(usersUnfollow)}
                    onRequestedPress={() => usersUnfollowRequest({ userId })}
                    replyActive={followerStatus === 'REQUESTED'}
                    replyLoading={isLoading(usersAcceptFollowerUser)}
                    onReplyPress={() => usersAcceptFollowerUserRequest({ userId })}
                    declineLoading={isLoading(usersDeclineFollowerUser)}
                    onDeclinePress={() => usersDeclineFollowerUserRequest({ userId })}
                  />
                }
              />
            </RowsItemComponent>
          )
        }}
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
  })

UsersList.propTypes = {
  theme: PropTypes.any,
  usersSearch: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.func,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.func,
  usersAcceptFollowerUser: PropTypes.any,
  usersAcceptFollowerUserRequest: PropTypes.func,
  usersDeclineFollowerUser: PropTypes.any,
  usersDeclineFollowerUserRequest: PropTypes.func,
}

export default withTheme(UsersList)
