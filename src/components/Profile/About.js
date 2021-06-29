import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Subheading, Text, Caption } from 'react-native-paper'
import path from 'ramda/src/path'
import dayjs from 'dayjs'
import { renderDiamond } from 'components/Post/Username'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'react-native-paper'
import * as UserService from 'services/User'
import * as navigationActions from 'navigation/actions'
import linkifyText from 'services/helpers/linkifyText'

const ProfileAbout = ({ t, theme, navigation, usersGetProfile }) => {
  const styling = styles(theme)
  const user = path(['data'])(usersGetProfile)
  const self = UserService.isUserOwner(usersGetProfile)
  const fullName = path(['fullName'])(user)

  return (
    <View>
      <View style={styling.username}>
        {fullName ? (
          <Subheading style={styling.fullName}>{fullName}</Subheading>
        ) : self ? (
          <Text style={styling.editProfile} onPress={() => navigationActions.navigateProfileEdit(navigation)}>
            {t('Edit Profile')}
          </Text>
        ) : (
          <Subheading style={styling.fullName}>{path(['username'])(user)}</Subheading>
        )}
        {renderDiamond({ user, theme })}
      </View>
      {path(['bio', 'length'])(user) ? (
        <Text>
          {linkifyText({
            text: path(['bio'])(user),
          })}
        </Text>
      ) : null}
      <Caption>
        {t('Joined')} {dayjs(path(['signedUpAt'])(user)).from(dayjs())}
      </Caption>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    username: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    fullName: {
      marginRight: 4,
    },
    editProfile: {
      color: theme.colors.primary,
      fontWeight: '500',
      marginBottom: 3,
    },
  })

ProfileAbout.propTypes = {
  theme: PropTypes.any,
  usersGetProfile: PropTypes.any,
  t: PropTypes.any,
  navigation: PropTypes.any,
}

export default withTranslation()(withTheme(ProfileAbout))
