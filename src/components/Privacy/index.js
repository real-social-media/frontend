import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import PrivacyForm from 'components/Privacy/Form'
import Disclaimer from 'components/Privacy/Disclaimer'

import { withTheme } from 'react-native-paper'

const Privacy = ({
  theme,
  user,
  togglePrivacyStatus,
  toggleFollowCountsHidden,
  toggleViewCountsHidden,
  toggleLikesDisabled,
  toggleCommentsDisabled,
  toggleSharingDisabled,
}) => {
  const styling = styles(theme)
  
  return (
    <ScrollView>
      <View style={styling.root}>
        <PrivacyForm
          user={user}
          togglePrivacyStatus={togglePrivacyStatus}
          toggleFollowCountsHidden={toggleFollowCountsHidden}
          toggleViewCountsHidden={toggleViewCountsHidden}
          toggleLikesDisabled={toggleLikesDisabled}
          toggleCommentsDisabled={toggleCommentsDisabled}
          toggleSharingDisabled={toggleSharingDisabled}
        />
        <Disclaimer />
      </View>
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: theme.spacing.base,
  },
  form: {
    padding: theme.spacing.base,
  },
})

Privacy.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
  togglePrivacyStatus: PropTypes.func,
  toggleFollowCountsHidden: PropTypes.func,
  toggleViewCountsHidden: PropTypes.func,
  toggleLikesDisabled: PropTypes.func,
  toggleCommentsDisabled: PropTypes.func,
  toggleSharingDisabled: PropTypes.func,
}

export default withTheme(Privacy)
