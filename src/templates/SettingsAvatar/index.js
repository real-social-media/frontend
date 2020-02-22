import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const ThemeAvatarTemplate = ({
  theme,
  icon,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.component}>
        {icon}
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    position: 'relative',
  },
  component: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

ThemeAvatarTemplate.defaultProps = {
  children: () => {},
  size: 'default',
}

ThemeAvatarTemplate.propTypes = {
  theme: PropTypes.any,
  icon: PropTypes.any,
}

export default withTheme(ThemeAvatarTemplate)
