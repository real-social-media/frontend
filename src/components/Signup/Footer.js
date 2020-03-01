import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Footer = ({
  theme,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  const handleSignupPress = () => navigation.navigate('Auth')

  return (
    <View style={styling.root}>
      <View style={styling.option}>
        <TouchableOpacity onPress={handleSignupPress}>
          <Text style={styling.optionText}>{t('Already have an account')}? {t('Sign In')}.</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  option: {
    alignItems: 'center',
  },
  optionText: {
    color: '#3897f0',
  },
})

Footer.propTypes = {
  theme: PropTypes.any,
  
}

export default withTheme(Footer)
