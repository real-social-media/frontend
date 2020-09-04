import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Subheading, Text, Caption } from 'react-native-paper'
import path from 'ramda/src/path'
import dayjs from 'dayjs'

import { withTranslation } from 'react-i18next'

const ProfileAbout = ({
  t,
  usersGetProfile,
}) => {
  const styling = styles
  
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

const styles = StyleSheet.create({
  root: {
  },
  itemTitle: {
  },
  itemText: {
  },
})

ProfileAbout.propTypes = {
  usersGetProfile: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(ProfileAbout)
