import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Text, Caption } from 'react-native-paper'
import AuthErrorTemplate from 'templates/Auth/Error'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import SettingsAvatar from 'templates/SettingsAvatar'
import EditIcon from 'assets/svg/settings/Edit'
import PhotoIcon from 'assets/svg/settings/Photo'
import NextIcon from 'assets/svg/settings/Next'
import ThemeIcon from 'assets/svg/settings/Theme'
import ArchiveIcon from 'assets/svg/settings/Archive'
import SignoutIcon from 'assets/svg/settings/Signout'
import PrivacyIcon from 'assets/svg/settings/Privacy'
import DiamondIcon from 'assets/svg/settings/Diamond'
import ContactsIcon from 'assets/svg/settings/Contacts'
import DatingIcon from 'assets/svg/settings/Dating'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'

import DeviceInfo from 'react-native-device-info'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import * as navigationActions from 'navigation/actions'
import testIDs from './test-ids'

const Settings = ({
  t,
  theme,
  authSignoutRequest,
  navigation,
  handleErrorClose,
  settingsErrorMessage,
  user,
  openUploadAvatarMenu,
}) => {
  const styling = styles(theme)

  return (
    <React.Fragment>
      <ScrollView testID={testIDs.root} style={styling.root}>
        <TouchableOpacity onPress={() => navigationActions.navigateProfilePhotoGrid(navigation)}>
          <Avatar
            size="large"
            thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
            imageSource={{ uri: path(['photo', 'url480p'])(user) }}
          />
        </TouchableOpacity>

        <RowsComponent
          items={[
            {
              label: t('Edit Profile'),
              onPress: () => navigationActions.navigateProfileEdit(navigation),
              icon: <EditIcon fill={theme.colors.text} />,
            },
            {
              label: t('Change Profile Picture'),
              onPress: openUploadAvatarMenu,
              icon: <PhotoIcon fill={theme.colors.text} />,
            },
            {
              label: t('Choose Theme'),
              onPress: () => navigationActions.navigateTheme(navigation),
              icon: <ThemeIcon fill={theme.colors.text} />,
            },
            {
              label: t('Mental Health & Privacy Settings'),
              onPress: () => navigationActions.navigatePrivacy(navigation),
              icon: <PrivacyIcon fill={theme.colors.text} />,
            },
            {
              label: t('Join Diamond'),
              onPress: () => navigationActions.navigateMembership(navigation),
              icon: <DiamondIcon fill={theme.colors.text} />,
            },
            {
              label: t('Dating'),
              onPress: () => navigationActions.navigateDatingAbout(navigation)(),
              icon: <DatingIcon fill={theme.colors.text} />,
            },
            {
              label: t('Follow & Invite Friends'),
              onPress: () => navigationActions.navigateInviteFriends(navigation),
              icon: <ContactsIcon fill={theme.colors.text} />,
            },
            {
              label: t('Archived Photos'),
              onPress: () => navigationActions.navigateArchived(navigation),
              icon: <ArchiveIcon fill={theme.colors.text} />,
            },
            {
              testID: testIDs.actions.signOutBtn,
              label: t('Signout'),
              onPress: () => authSignoutRequest(),
              icon: <SignoutIcon fill={theme.colors.text} />,
            },
          ]}
        >
          {(settings) => (
            <RowsItemComponent hasBorders>
              <UserRowComponent
                testID={settings.testID}
                onPress={path(['onPress'])(settings)}
                avatar={<SettingsAvatar icon={path(['icon'])(settings)} />}
                content={
                  <View>
                    <Text style={styling.username}>{path(['label'])(settings)}</Text>
                  </View>
                }
                action={<SettingsAvatar icon={<NextIcon fill={theme.colors.text} />} />}
              />
            </RowsItemComponent>
          )}
        </RowsComponent>

        <Caption style={styling.helper}>v{DeviceInfo.getReadableVersion()}</Caption>
      </ScrollView>
      {settingsErrorMessage ? <AuthErrorTemplate text={settingsErrorMessage} onClose={handleErrorClose} /> : null}
    </React.Fragment>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.backgroundPrimary,
      padding: theme.spacing.base,
    },
    form: {
      padding: theme.spacing.base,
    },
    details: {
      alignItems: 'center',
    },
    helper: {
      paddingVertical: 8,
      paddingBottom: 32,
    },
  })

Settings.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  authSignoutRequest: PropTypes.any,
  navigation: PropTypes.any,
  user: PropTypes.any,
  handleErrorClose: PropTypes.func,
  settingsErrorMessage: PropTypes.string,
  openUploadAvatarMenu: PropTypes.func,
}

Settings.defaultProps = {
  settingsErrorMessage: null,
}

export default withTranslation()(withTheme(Settings))
