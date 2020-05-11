import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Text, Caption } from 'react-native-paper'
import ActionSheet from 'react-native-actionsheet'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import SettingsAvatar from 'templates/SettingsAvatar'
import EditIcon from 'assets/svg/settings/Edit'
import PhotoIcon from 'assets/svg/settings/Photo'
import NextIcon from 'assets/svg/settings/Next'
import LanguageIcon from 'assets/svg/settings/Language'
import ThemeIcon from 'assets/svg/settings/Theme'
import ArchiveIcon from 'assets/svg/settings/Archive'
import SignoutIcon from 'assets/svg/settings/Signout'
import PrivacyIcon from 'assets/svg/settings/Privacy'
import DiamondIcon from 'assets/svg/settings/Diamond'
import CashIcon from 'assets/svg/settings/Cash'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Settings = ({
  t,
  theme,
  authSignoutRequest,
  user,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const actionSheetRef = useRef(null)

  const handleProfilePhotoUpload = () => {
    Alert.alert(
      'Profile Photo Upload',
      'Your photo will be uploaded as post',
      [{
        text: 'Take a Photo',
        onPress: navigationActions.navigateCamera(navigation, { nextRoute: 'ProfilePhoto' }),
      }],
      { cancelable: true }
    )
  }

  // {
  //   label: t('Join Diamond'),
  //   onPress: () => navigation.navigate('Membership'),
  //   icon: <DiamondIcon fill={theme.colors.text} />,
  // }
  // {
  //   label: t('Change Language'),
  //   onPress: () => navigation.navigate('Translation'),
  //   icon: <LanguageIcon fill={theme.colors.text} />,
  // }

  return (
    <ScrollView style={styling.root}>
      <TouchableOpacity onPress={() => navigation.navigate('ProfilePhoto')}>
        <Avatar
          size="large"
          thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
          imageSource={{ uri: path(['photo', 'url480p'])(user) }}
        />
      </TouchableOpacity>

      <ActionSheet
        ref={actionSheetRef}
        options={[t('Take a Photo'), t('Choose From Gallery'), t('Cancel')]}
        cancelButtonIndex={2}
        onPress={(index) => {
          if (index === 0) {
            handleProfilePhotoUpload()
          }
          if (index === 1) {
            navigation.navigate('ProfilePhoto')
          }
        }}
      />

      <RowsComponent items={[{
        label: t('Edit Profile'),
        onPress: () => navigation.navigate('ProfileEdit'),
        icon: <EditIcon fill={theme.colors.text} />,
      }, {
        label: t('Change Profile Photo'),
        onPress: () => actionSheetRef.current.show(),
        icon: <PhotoIcon fill={theme.colors.text} />,
      }, {
        label: t('Choose Theme'),
        onPress: () => navigation.navigate('Theme'),
        icon: <ThemeIcon fill={theme.colors.text} />,
      }, {
        label: t('Archived Photos'),
        onPress: () => navigation.navigate('Archived'),
        icon: <ArchiveIcon fill={theme.colors.text} />,
      }, {
        label: t('Mental Health & Privacy Settings'),
        onPress: () => navigation.navigate('Privacy'),
        icon: <PrivacyIcon fill={theme.colors.text} />,
      }, {
        label: t('Diamond Payout'),
        onPress: () => navigation.navigate('Payout'),
        icon: <CashIcon fill={theme.colors.text} />,
      }, {
        label: t('Signout'),
        onPress: () => authSignoutRequest(),
        icon: <SignoutIcon fill={theme.colors.text} />,
      }]}>
        {(settings) => (
          <RowsItemComponent hasBorders>
            <UserRowComponent
              onPress={path(['onPress'])(settings)}
              avatar={
                <SettingsAvatar icon={path(['icon'])(settings)} />
              }
              content={
                <View>
                  <Text style={styling.username}>{path(['label'])(settings)}</Text>
                </View>
              }
              action={
                <SettingsAvatar icon={<NextIcon fill={theme.colors.text} />} />
              }
            />
          </RowsItemComponent>
        )}
      </RowsComponent>
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
  details: {
    alignItems: 'center',
  },
  helper: {
    paddingVertical: 8,
    paddingBottom: 32,
  }
})

Settings.propTypes = {
  theme: PropTypes.any,
  authSignout: PropTypes.any,
  authSignoutRequest: PropTypes.any,
  user: PropTypes.any,
  t: PropTypes.any,
  authSignoutRequest: PropTypes.any,
}

export default withTranslation()(withTheme(Settings))
