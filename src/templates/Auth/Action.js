import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Subheading } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const BottomAction = ({
  t,
  theme,
  children,
  onPress,
}) => {
  const styling = styles(theme)

  return (
    <TouchableOpacity style={styling.root} onPress={onPress}>
      <Subheading style={styling.action}>{children}</Subheading>
    </TouchableOpacity>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    height: 80,
  },
  action: {
    fontWeight: '500',
    letterSpacing: 0,
    color: theme.colors.primary,
  },
})

BottomAction.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  children: PropTypes.any,
  onPress: PropTypes.any,
}

export default withTranslation()(withTheme(BottomAction))
