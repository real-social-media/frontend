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
  size,
  colors,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const componentStyle = [
    size === 'small' ? styling.sizeSmall : null,
    size === 'default' ? styling.sizeDefault : null,
    size === 'medium' ? styling.sizeMedium : null,
    size === 'large' ? styling.sizeLarge : null,
  ]

  return (
    <View style={styling.root}>
      <View style={componentStyle}>
        <View style={styling.photoWrapper}>
          {colors.map((color, key) => (
            <View style={[styling.photo, { backgroundColor: color }]} key={key} />
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeSmall: {
    width: 32,
    height: 32,
  },
  sizeDefault: {
    width: 44,
    height: 44,
  },
  sizeMedium: {
    width: 68,
    height: 68,
  },
  sizeLarge: {
    width: 120,
    height: 120,
  },
  photoActive: {
    borderWidth: 2,
    borderColor: theme.colors.button,
    borderRadius: 2,
    padding: 2,
  },
  photoWrapper: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 2,
    padding: 2,
    flex: 1,
    flexDirection: 'row',
  },
  photo: {
    flex: 1,
  },
})

ThemeAvatarTemplate.defaultProps = {
  children: () => {},
  size: 'default',
}

ThemeAvatarTemplate.propTypes = {
  theme: PropTypes.any,
  size: PropTypes.any,
  colors: PropTypes.any,
}

export default withTheme(ThemeAvatarTemplate)
