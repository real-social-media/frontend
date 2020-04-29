import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Text } from 'react-native-paper'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Banner = ({
  t,
  theme,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <Text style={styling.text}>Yet another failed notification</Text>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    zIndex: 5,
    minHeight: 48 + ifIphoneX(40, 0),
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 12,
  },
  text: {
    color: 'white',
  },
})

Banner.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Banner))
