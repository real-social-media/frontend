import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text, Caption } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import dayjs from 'dayjs'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Header = ({
  t,
  theme,
  story,
  usersGetProfile,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <View style={styling.action}>
        <Avatar
          active={path(['data', 'stories', 'items', 'length'])(usersGetProfile) || false}
          thumbnailSource={{ uri: path(['data', 'photo', 'url64p'])(usersGetProfile) }}
          imageSource={{ uri: path(['data', 'photo', 'url64p'])(usersGetProfile) }}
        />

        <View style={styling.text}>
          <Text style={styling.user}>{path(['data', 'username'])(usersGetProfile)}</Text>
          <Caption style={styling.date}>{t('Expires {{expiry}}', { expiry: dayjs(story.expiresAt).fromNow() })}</Caption>
        </View>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    justifyContent: 'center',
  },
  user: {
    marginLeft: theme.spacing.base,
  },
  date: {
    marginLeft: theme.spacing.base,
  },
})

Header.propTypes = {
  theme: PropTypes.any,
  story: PropTypes.any,
  t: PropTypes.any,
  usersGetProfile: PropTypes.any,
}

export default withTranslation()(withTheme(Header))
