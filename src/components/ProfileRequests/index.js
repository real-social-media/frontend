import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native'
import ResultComponent from 'components/Search/Result'

import { withTheme } from 'react-native-paper'

const ProfileRequests = ({
  theme,
  usersGetPendingFollowers,
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
      <ScrollView refreshControl={<RefreshControl tintColor={theme.colors.border} refreshing={false} />}>
        <ResultComponent
          usersSearch={usersGetPendingFollowers}
          usersFollow={usersFollow}
          usersFollowRequest={usersFollowRequest}
          usersUnfollow={usersUnfollow}
          usersUnfollowRequest={usersUnfollowRequest}
          usersAcceptFollowerUser={usersAcceptFollowerUser}
          usersAcceptFollowerUserRequest={usersAcceptFollowerUserRequest}
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

ProfileRequests.propTypes = {
  theme: PropTypes.any,
  usersGetPendingFollowers: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  usersAcceptFollowerUser: PropTypes.any,
  usersAcceptFollowerUserRequest: PropTypes.any,
}

export default withTheme(ProfileRequests)
