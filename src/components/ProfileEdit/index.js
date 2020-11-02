import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import ProfileEditForm from 'components/ProfileEdit/Form'
import ProfileDeleteComponent from 'components/ProfileEdit/ProfileDelete'
import PrivacyForm from 'components/Privacy/Form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { withTheme } from 'react-native-paper'

const ProfileEdit = ({
  theme,
  user,
  usersEditProfile,
  usersEditProfileRequest,
  togglePrivacyStatus,
  toggleFollowCountsHidden,
  toggleLikesDisabled,
  toggleCommentsDisabled,
  toggleSharingDisabled,
  usersDelete,
  usersDeleteRequest,
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
                toggleLikesDisabled={toggleLikesDisabled}
                toggleCommentsDisabled={toggleCommentsDisabled}
                toggleSharingDisabled={toggleSharingDisabled}
              />
            )}
          />
        </View>

        <View style={styling.danger}>
          <ProfileDeleteComponent
            usersDelete={usersDelete}
            usersDeleteRequest={usersDeleteRequest}
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
  danger: {
    padding: theme.spacing.base,
    backgroundColor: theme.colors.backgroundSecondary,
  },
})

ProfileEdit.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
  usersEditProfile: PropTypes.any,
  usersEditProfileRequest: PropTypes.any,
  togglePrivacyStatus: PropTypes.func,
  toggleFollowCountsHidden: PropTypes.func,
  toggleLikesDisabled: PropTypes.func,
  toggleCommentsDisabled: PropTypes.func,
  toggleSharingDisabled: PropTypes.func,
  usersDelete: PropTypes.any,
  usersDeleteRequest: PropTypes.any,
}

export default withTheme(ProfileEdit)

