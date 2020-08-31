import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native'
import ResultComponent from 'components/Search/Result'

import { withTheme } from 'react-native-paper'

const ProfileFollower = ({
  theme,
  usersGetFollowerUsers,
  usersGetFollowerUsersRequest,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
  usersAcceptFollowerUser,
  usersAcceptFollowerUserRequest,
}) => {
  const styling = styles

  return (
    <View style={styling.root}>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.border}
            refreshing={usersGetFollowerUsers.status === 'loading'}
            onRefresh={usersGetFollowerUsersRequest}
          />
        }
      >
        <ResultComponent
          usersSearch={usersGetFollowerUsers}
          usersFollow={usersFollow}
          usersFollowRequest={usersFollowRequest}
          usersUnfollow={usersUnfollow}
          usersUnfollowRequest={usersUnfollowRequest}
          usersAcceptFollowerUser={usersAcceptFollowerUser}
          usersAcceptFollowerUserRequest={usersAcceptFollowerUserRequest}
          loading={usersGetFollowerUsers.status === 'loading'}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

ProfileFollower.propTypes = {
  theme: PropTypes.any,
  usersGetFollowerUsers: PropTypes.any,
  usersGetFollowerUsersRequest: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  usersAcceptFollowerUser: PropTypes.any,
  usersAcceptFollowerUserRequest: PropTypes.any,
}

export default withTheme(ProfileFollower)
