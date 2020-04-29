import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import ProfileEditForm from 'components/ProfileEdit/Form'
import PrivacyForm from 'components/Privacy/Form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfileEdit = ({
  t,
  theme,
  user,
  usersEditProfile,
  usersEditProfileRequest,
  togglePrivacyStatus,
  toggleFollowCountsHidden,
  toggleViewCountsHidden,
  toggleLikesDisabled,
  toggleCommentsDisabled,
  toggleSharingDisabled,
  toggleVerificationHidden,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <KeyboardAwareScrollView>
        <View style={styling.form}>
          <ProfileEditForm
            user={user}
            usersEditProfile={usersEditProfile}
            usersEditProfileRequest={usersEditProfileRequest}
            PrivacyComponent={(
              <PrivacyForm
                user={user}
                togglePrivacyStatus={togglePrivacyStatus}
                toggleFollowCountsHidden={toggleFollowCountsHidden}
                toggleViewCountsHidden={toggleViewCountsHidden}
                toggleLikesDisabled={toggleLikesDisabled}
                toggleCommentsDisabled={toggleCommentsDisabled}
                toggleSharingDisabled={toggleSharingDisabled}
                toggleVerificationHidden={toggleVerificationHidden}
              />
            )}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  form: {
    padding: theme.spacing.base,
  },
})

ProfileEdit.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
  usersEditProfile: PropTypes.any,
  usersEditProfileRequest: PropTypes.any,
  togglePrivacyStatus: PropTypes.any,
  toggleFollowCountsHidden: PropTypes.any,
  toggleViewCountsHidden: PropTypes.any,
  toggleLikesDisabled: PropTypes.any,
  toggleCommentsDisabled: PropTypes.any,
  toggleSharingDisabled: PropTypes.any,
  toggleVerificationHidden: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(ProfileEdit))

