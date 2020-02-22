import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Linking,
} from 'react-native'
import SignupForm from 'components/Onboard/SignupForm'
import Subtitle from 'components/Onboard/Subtitle'
import NativeError from 'templates/NativeError'
import { Subheading } from 'react-native-paper'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Signup = ({
  theme,
  authSignin,
  authSignup,
  authSignupRequest,
  authSignupIdle,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  return (
    <View style={styling.wrapper}>
      <NativeError
        handleCancelPress={authSignupIdle}
        titleText={t('Error occured')}
        messageText={t(path(['message', 'text'])(authSignup))}
        actionText={t('Try again')}
        status={authSignup.status}
        triggerOn="failure"
      />

      <View style={styling.root}>
        <View style={styling.title}>
          <Subheading>{`${t('Would you like sign up & verify your email')} ${authSignin.payload.username} ?`}</Subheading>
        </View>
        <View style={styling.form}>
          <SignupForm
            authSignin={authSignin}
            authSignup={authSignup}
            authSignupRequest={authSignupRequest}
          />
        </View>
        <View style={styling.subtitle}>
          <Subtitle actions={[{
            onPress: () => Linking.openURL('https://real.app/real-eula-html-english.html').catch(() => {}),
            title: t('By tapping to continue, you are indicating that you have read the EULA and agree to the Terms of Service'),
          }, {
            onPress: () => navigation.navigate('Auth'),
            title: t('Change Email Address'),
          }]} />
        </View>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  root: {
    paddingHorizontal: 48, 
  },
  title: {
    alignItems: 'center',
    paddingBottom: 48,
  },
  form: {
  },
})

Signup.propTypes = {
  theme: PropTypes.any,
  
  authSignin: PropTypes.any,
  authSigninRequest: PropTypes.any,
  authSignup: PropTypes.any,
  authSignupRequest: PropTypes.any,
}

export default withTheme(Signup)
