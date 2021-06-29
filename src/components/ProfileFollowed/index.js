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

const ProfileFollowed = ({
  theme,
  usersGetFollowedUsers,
  usersGetFollowedUsersRequest,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.border}
            refreshing={usersGetFollowedUsers.status === 'loading'}
            onRefresh={usersGetFollowedUsersRequest}
          />
        }
      >
        <UsersList usersSearch={usersGetFollowedUsers} />
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

ProfileFollowed.propTypes = {
  theme: PropTypes.any,
  usersGetFollowedUsers: PropTypes.any,
  usersGetFollowedUsersRequest: PropTypes.any,
}

export default withTheme(ProfileFollowed)

