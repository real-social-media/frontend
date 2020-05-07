import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import ProfileIcon from 'assets/svg/auth/Profile'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Photo = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <ProfileIcon />
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 12,
  },
})

Photo.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Photo))
