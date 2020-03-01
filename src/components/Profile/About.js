import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Subheading, Text, Caption } from 'react-native-paper'
import path from 'ramda/src/path'
import dayjs from 'dayjs'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const ProfileAbout = ({
  theme,
  usersGetProfile,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <Subheading style={styling.itemTitle}>{path(['data', 'fullName'])(usersGetProfile)}</Subheading>
      {path(['data', 'bio', 'length'])(usersGetProfile) ?
        <Text style={styling.itemText}>{path(['data', 'bio'])(usersGetProfile)}</Text>
      : null}
      <Caption style={styling.itemText}>{t('Joined')} {dayjs(path(['data', 'signedUpAt'])(usersGetProfile)).from(dayjs())}</Caption>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  itemTitle: {
  },
  itemText: {
  },
})

ProfileAbout.propTypes = {
  theme: PropTypes.any,
  usersGetProfile: PropTypes.any,
}

export default withTheme(ProfileAbout)
