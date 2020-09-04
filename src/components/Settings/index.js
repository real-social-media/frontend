import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Text, Caption } from 'react-native-paper'
import ActionSheet from 'components/ActionSheet'
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
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'

import * as navigationActions from 'navigation/actions'
import DeviceInfo from 'react-native-device-info'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import { isAvatarEmpty, confirm } from './helpers'
import testIDs from './test-ids'

const Settings = ({
  t,
  theme,
  authSignoutRequest,
  handleLibrarySnap,
  navigation,
  usersDeleteAvatarRequest,
  handleErrorClose,
  settingsErrorMessage,
  user,
}) => {
  const styling = styles(theme)
  const actionSheetRef = useRef(null)

  const handleProfilePhotoUpload = () => {
    confirm({
      title: t('Profile Photo Upload'),
      desc: t('Your photo will be uploaded as post'),
      onConfirm: navigationActions.navigateCamera(navigation, { nextRoute: 'ProfilePhotoUpload' }),
    })
  }

  const handleProfilePhotoDelete = () => {
    confirm({
      title: t('Delete Profile Photo'),
      desc: t('Are you sure you want to delete the profile photo?'),
      onConfirm: usersDeleteAvatarRequest,
    })
  }

  return (
    <>
      <ScrollView testID={testIDs.root} style={styling.root}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePhotoGrid')}>
          <Avatar
            size="large"
            thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
            imageSource={{ uri: path(['photo', 'url480p'])(user) }}
          />
        </TouchableOpacity>

        <ActionSheet
          actionSheetRef={actionSheetRef}
          showDestructive={!isAvatarEmpty(user)}
          options={[
            {
              name: t('Take a Photo'),
              onPress: () => handleProfilePhotoUpload(),
            },
            {
              name: t('Choose From Gallery'),
              onPress: () => handleLibrarySnap(false),
            },
            {
              name: t('Choose From Existing'),
              onPress: () => navigation.navigate('ProfilePhotoGrid'),
            },
            {
              name: t('Delete Profile Photo'),
              onPress: () => handleProfilePhotoDelete(),
              isDestructive: true,
            },
            {
              name: t('Cancel'),
              onPress: () => {},
              isCancel: true,
            },
          ]}
        />

        <RowsComponent
          items={[
            {
              label: t('Edit Profile'),
              onPress: () => navigation.navigate('ProfileEdit'),
              icon: <EditIcon fill={theme.colors.text} />,
            },
            {
              label: t('Change Profile Photo'),
              onPress: () => actionSheetRef.current && actionSheetRef.current.show(),
              icon: <PhotoIcon fill={theme.colors.text} />,
            },
            {
              label: t('Choose Theme'),
              onPress: () => navigation.navigate('Theme'),
              icon: <ThemeIcon fill={theme.colors.text} />,
            },
            {
              label: t('Archived Photos'),
              onPress: () => navigation.navigate('Archived'),
              icon: <ArchiveIcon fill={theme.colors.text} />,
            },
            {
              label: t('Mental Health & Privacy Settings'),
              onPress: () => navigation.navigate('Privacy'),
              icon: <PrivacyIcon fill={theme.colors.text} />,
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
    </>
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
  handleLibrarySnap: PropTypes.any,
  navigation: PropTypes.any,
  user: PropTypes.any,
  usersDeleteAvatarRequest: PropTypes.func,
  handleErrorClose: PropTypes.func,
  settingsErrorMessage: PropTypes.string,
}

Settings.defaultProps = {
  settingsErrorMessage: null,
}

export default withTranslation()(withTheme(Settings))
