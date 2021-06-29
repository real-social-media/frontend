import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import path from 'ramda/src/path'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { withTheme, Switch, Text } from 'react-native-paper'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import SettingsAvatar from 'templates/SettingsAvatar'
import CircleAvatar from 'templates/CircleAvatar'
import EditIcon from 'assets/svg/settings/Edit'
import PhotoIcon from 'assets/svg/settings/Photo'
import NextIcon from 'assets/svg/settings/Next'
import FiltersIcon from 'assets/svg/dating/Filters'
import DiamondIcon from 'assets/svg/settings/Diamond'
import DatingIcon from 'assets/svg/settings/Dating'
import CardIcon from 'assets/svg/dating/Card'
import { withTranslation } from 'react-i18next'
import * as UserService from 'services/User'

const DatingSettings = ({
  t,
  theme,
  user,
  disableDating,
  toggleDatingStatusRequest,
  navigateDatingMatch,
  navigateDatingAbout,
  navigateDatingProfile,
  navigateMembership,
  openUploadAvatarMenu,
}) => {
  const styling = styles(theme)
  const age = user.dateOfBirth ? dayjs().diff(user.dateOfBirth, 'year') : null
  const isSubscribed = UserService.isUserSubscribed(user)

  return (
    <ScrollView style={styling.root}>
      <View style={styling.header}>
        <TouchableOpacity style={styling.avatar} onPress={openUploadAvatarMenu}>
          <CircleAvatar image={path(['photo', 'url480p'], user)} hasBorder />
        </TouchableOpacity>
        <Text style={styling.name} numberOfLines={1} ellipsizeMode="tail">
          {`${user.displayName} ${age}`}
        </Text>
        <Text style={styling.bio} numberOfLines={3} ellipsizeMode="tail">
          {user.bio}
        </Text>
      </View>
      <View style={styling.inner}>
        <RowsComponent
          items={[
            {
              label: t('Preview Profile'),
              onPress: navigateDatingProfile,
              icon: <CardIcon fill={theme.colors.text} />,
            },
            {
              label: t('Match Settings'),
              onPress: navigateDatingMatch,
              icon: <FiltersIcon fill={theme.colors.text} />,
            },
            {
              label: t('Edit Profile'),
              onPress: navigateDatingAbout,
              icon: <EditIcon fill={theme.colors.text} />,
            },
            {
              label: t('Change Profile Picture'),
              onPress: openUploadAvatarMenu,
              icon: <PhotoIcon fill={theme.colors.text} />,
            },
            {
              label: isSubscribed ? t('Manage Diamond') : t('Join Diamond'),
              onPress: navigateMembership,
              icon: <DiamondIcon fill={theme.colors.text} />,
            },
          ]}
        >
          {(settings) => (
            <RowsItemComponent hasBorders>
              <UserRowComponent
                onPress={settings.onPress}
                avatar={<SettingsAvatar icon={settings.icon} />}
                content={<Text>{settings.label}</Text>}
                action={<SettingsAvatar icon={<NextIcon fill={theme.colors.text} />} />}
              />
            </RowsItemComponent>
          )}
        </RowsComponent>
        <RowsItemComponent hasBorders>
          <UserRowComponent
            avatar={<SettingsAvatar icon={<DatingIcon fill={theme.colors.text} />} />}
            onPress={toggleDatingStatusRequest}
            content={<Text>{t('Enable Dating')}</Text>}
            action={
              <Switch
                value={!disableDating}
                onValueChange={toggleDatingStatusRequest}
                accessibilityLabel="disableDating"
              />
            }
          />
        </RowsItemComponent>
      </View>
    </ScrollView>
  )
}

DatingSettings.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  user: PropTypes.any,
  disableDating: PropTypes.bool,
  toggleDatingStatusRequest: PropTypes.func,
  navigateDatingMatch: PropTypes.func,
  navigateDatingAbout: PropTypes.func,
  navigateMembership: PropTypes.func,
  openUploadAvatarMenu: PropTypes.func,
  navigateDatingProfile: PropTypes.func,
}

DatingSettings.defaultProps = {
  disableDating: false,
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    header: {
      paddingTop: theme.spacing.base * 2,
      marginBottom: theme.spacing.base * 2,
      alignItems: 'center',
      paddingHorizontal: theme.spacing.base,
    },
    avatar: {
      marginBottom: theme.spacing.base,
    },
    title: {
      fontSize: 12,
      textTransform: 'uppercase',
      color: '#8D9195',
    },
    switch: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      flexGrow: 1,
      marginRight: 12,
    },
    inner: {
      paddingHorizontal: theme.spacing.base,
    },
    name: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: theme.spacing.base / 2,
    },
    bio: {
      fontSize: 16,
      fontWeight: '400',
    },
    footer: {
      padding: theme.spacing.base,
      backgroundColor: theme.colors.backgroundSecondary,
    },
  })

export default withTranslation()(withTheme(DatingSettings))
