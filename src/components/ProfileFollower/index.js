import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native'
import UsersList from 'components/UsersList'

import { withTheme } from 'react-native-paper'

const ProfileFollower = ({
  theme,
  usersGetFollowerUsers,
  usersGetFollowerUsersRequest,
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
        <UsersList usersSearch={usersGetFollowerUsers} />
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
}

export default withTheme(ProfileFollower)
