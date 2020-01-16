import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import path from 'ramda/src/path'
import { Text } from 'react-native-paper'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import UserRowActionComponent from 'templates/UserRowAction'
import Avatar from 'templates/Avatar'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Result = ({
  theme,
  navigation,
  usersSearch,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
  usersAcceptFollowerUser,
  usersAcceptFollowerUserRequest,
  handleProfilePress,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <ScrollView style={styling.root}>
      <RowsComponent items={path(['data'])(usersSearch)}>
        {(user) => (
          <RowsItemComponent>
            <UserRowComponent
              avatar={
                <TouchableOpacity onPress={handleProfilePress(user)}>
                  <Avatar
                    active
                    thumbnailSource={{ uri: path(['photoUrl64p'])(user) }}
                    imageSource={{ uri: path(['photoUrl64p'])(user) }}
                    themeCode={path(['themeCode'])(user)}
                  />
                </TouchableOpacity>
              }
              content={
                <TouchableOpacity onPress={handleProfilePress(user)} style={styling.user}>
                  <Text style={styling.username}>{path(['username'])(user)}</Text>
                  <Text style={styling.fullname}>{path(['fullName'])(user)}</Text>
                </TouchableOpacity>
              }
              action={
                <UserRowActionComponent
                  followActive={path(['followedStatus'])(user) === 'NOT_FOLLOWING'}
                  followloading={usersFollow.status === 'loading' && path(['payload', 'userId'])(usersFollow) === path(['userId'])(user)}
                  onFollowPress={() => usersFollowRequest({ userId: path(['userId'])(user) })}

                  unfollowActive={path(['followedStatus'])(user) === 'FOLLOWING'}
                  unfollowloading={usersUnfollow.status === 'loading' && path(['payload', 'userId'])(usersUnfollow) === path(['userId'])(user)}
                  onUnfollowPress={() => usersUnfollowRequest({ userId: path(['userId'])(user) })}

                  requestActive={path(['followedStatus'])(user) === 'REQUESTED'}
                  requestloading={usersUnfollow.status === 'loading' && path(['payload', 'userId'])(usersUnfollow) === path(['userId'])(user)}
                  onRequestedPress={() => usersUnfollowRequest({ userId: path(['userId'])(user) })}

                  replyActive={path(['followerStatus'])(user) === 'REQUESTED'}
                  replyloading={usersAcceptFollowerUser.status === 'loading' && path(['payload', 'userId'])(usersAcceptFollowerUser) === path(['userId'])(user)}
                  onReplyPress={() => usersAcceptFollowerUserRequest({ userId: path(['userId'])(user) })}
                />
              }
            />
          </RowsItemComponent>
        )}
      </RowsComponent>
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    padding: theme.spacing.base,
  },
  user: {
    paddingHorizontal: 8,
  },
  username: {
  },
  fullname: {
  },
})

Result.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
  usersSearch: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
}

export default withNavigation(
  withTheme(Result)
)
