import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import * as navigationActions from 'navigation/actions'
import PhoneIcon from 'assets/svg/auth/Phone'
import AppleIcon from 'assets/svg/auth/Apple'
import GoogleIcon from 'assets/svg/auth/Google'

import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Actions = ({
  t,
  authGoogle,
  authGoogleRequest,
  authApple,
  authAppleRequest,
}) => {
  const styling = styles
  const navigation = useNavigation()
  
  return (
    <View style={styling.root}>
      <View style={styling.item}>
        <DefaultButton testID="components/AuthHome/Actions/signup" icon={PhoneIcon} label={t('Use Phone or Email')} onPress={navigationActions.navigateAuthUsername(navigation)} style={styling.phone} labelStyle={styling.labelStyle} />
      </View>
      <View style={styling.item}>
        <DefaultButton testID="components/AuthHome/Actions/apple" icon={AppleIcon} label={t('Sign in with Apple')} onPress={authAppleRequest} loading={authApple.status === 'loading'} style={styling.apple} labelStyle={styling.labelStyle} />
      </View>
      <View style={styling.item}>
        <DefaultButton testID="components/AuthHome/Actions/google" icon={GoogleIcon} label={t('Sign in with Google')} onPress={authGoogleRequest} loading={authGoogle.status === 'loading'} style={styling.google} labelStyle={styling.labelStyle} />
      </View>
    </View>
  )
}

Actions.propTypes = {
  t: PropTypes.any,
  authGoogle: PropTypes.any,
  authGoogleRequest: PropTypes.any,
  authApple: PropTypes.any,
  authAppleRequest: PropTypes.any,
}

const styles = StyleSheet.create({
  root: {
  },
  item: {
    marginBottom: 12,
  },
  labelStyle: {
    marginLeft: 12,
  },
  phone: {
    backgroundColor: '#34495e',
  },
  apple: {
    backgroundColor: 'black',
  },
  google: {
    backgroundColor: '#4285F4',
  },
})

export default withTranslation()(Actions)
