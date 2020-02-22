import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const ThemeRowActionTemplate = ({
  theme,
  enabled,
  onEnablePress,
  onDisablePress,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.component}>
        {enabled ?
          <DefaultButton label="Disable" onPress={onDisablePress} size="compact" />
        : null}

        {!enabled ?
          <DefaultButton label="Enable" onPress={onEnablePress} mode="outlined" size="compact" />
        : null}
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  component: {
    width: 90,
  },
  avatar: {
  },
  content: {
  },
  action: {
  },
})

ThemeRowActionTemplate.defaultProps = {
}

ThemeRowActionTemplate.propTypes = {
  theme: PropTypes.any,
  size: PropTypes.any,
  colors: PropTypes.any,
}

export default withTheme(ThemeRowActionTemplate)
