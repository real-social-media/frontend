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

const ProfileRequests = ({
  theme,
  usersGetPendingFollowers,
}) => {
  const styling = styles

  return (
    <View style={styling.root}>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.border}
            refreshing={false}
          />
        }
      >
        <UsersList usersSearch={usersGetPendingFollowers} />
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
}

export default withTheme(ProfileRequests)
