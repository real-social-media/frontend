import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Linking, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Disclaimer = ({ t, theme }) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <Text style={styling.text}>{t('By using this app you agree to our')}</Text>

      <TouchableOpacity
        onPress={() => Linking.openURL('https://real.app/real-terms-service-html-english.html').catch(() => {})}
      >
        <Text style={styling.link}>{t('Terms and Service')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => Linking.openURL('https://real.app/real-privacy-policy-html-english.html').catch(() => {})}
      >
        <Text style={styling.link}>{t('Privacy Policy')}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.backgroundPrimary,
      paddingVertical: 8,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    text: {
      color: '#cccccc',
      marginRight: 4,
      lineHeight: 24,
    },
    link: {
      fontWeight: '500',
      marginRight: 4,
      lineHeight: 24,
    },
  })

Disclaimer.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(Disclaimer))
