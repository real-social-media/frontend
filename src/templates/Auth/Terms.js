import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Linking,
} from 'react-native'
import { Text } from 'react-native-paper'
import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import { getReadableVersion } from 'services/OTA'

const Header = ({
  t,
  theme,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <Text style={styling.text}>
        {t('By tapping to continue, you are indicating that you have read the ')}
        <Text style={styling.link} onPress={() => Linking.openURL('https://real.app/real-eula-html-english.html').catch(() => {})}>{t('EULA')}</Text>
        {t(' and agree to the ')}
        <Text style={styling.link} onPress={() => Linking.openURL('https://real.app/real-terms-service-html-english.html').catch(() => {})}>{t('Terms of Service')}</Text>
      </Text>

      <Text style={styling.version}>
        v{getReadableVersion()}
      </Text>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  text: {
    color: theme.colors.border,
    textAlign: 'center',
  },
  link: {
    color: theme.colors.border,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  version: {
    color: theme.colors.border,
    textAlign: 'center',
    marginTop: theme.spacing.base,
  },
})

Header.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Header))
