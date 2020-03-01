import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Text, Caption } from 'react-native-paper'
import { getReadableVersion } from 'react-native-device-info'
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

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Settings = ({
  theme,
  authSignoutRequest,
  user,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  return (
    <ScrollView style={styling.root}>
      <TouchableOpacity onPress={() => navigation.navigate('ProfilePhoto')}>
        <Avatar
          size="large"
          thumbnailSource={{ uri: path(['photoUrl64p'])(user) }}
          imageSource={{ uri: path(['photoUrl480p'])(user) }}
        />
      </TouchableOpacity>

      <RowsComponent items={[{
        label: t('Join Diamond'),
        onPress: () => navigation.navigate('Membership'),
        icon: <DiamondIcon fill={theme.colors.text} />,
      }, {
        label: t('Edit Profile'),
        onPress: () => navigation.navigate('ProfileEdit'),
        icon: <EditIcon fill={theme.colors.text} />,
      }, {
        label: t('Change Profile Photo'),
        onPress: () => navigation.navigate('ProfilePhoto'),
        icon: <PhotoIcon fill={theme.colors.text} />,
      }, {
        label: t('Change Language'),
        onPress: () => navigation.navigate('Translation'),
        icon: <LanguageIcon fill={theme.colors.text} />,
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

      <View style={styling.helper}>
        <Caption>Version: {getReadableVersion()}</Caption>
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
}

export default withTheme(Settings)
