import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import AuthForm from 'components/Auth/Form'
import Federated from 'components/Auth/Federated'
import Subtitle from 'templates/Subtitle'
import NativeError from 'templates/NativeError'
import path from 'ramda/src/path'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Subheading } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Auth = ({
  t,
  theme,
  authFacebook,
  authFacebookRequest,
  authGoogle,
  authGoogleRequest,
  authSignin,
  authSigninRequest,
  authSigninIdle,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <KeyboardAwareScrollView contentContainerStyle={styling.wrapper} extraScrollHeight={160}>
      <NativeError
        handleCancelPress={authSigninIdle}
        titleText={t('Error occured')}
        messageText={t(path(['message', 'text'])(authSignin))}
        actionText={t('Try again')}
        status={authSignin.status}
        triggerOn="failure"
        hidden={(
          t(path(['message', 'code'])(authSignin)) === 'GENERIC' ||
          t(path(['message', 'code'])(authSignin)) === 'USER_NOT_FOUND'
        )}
      />

      <View style={styling.root}>
        <View style={styling.title}>
          <Subheading>{t('One Tap')} {t('Login / Signup')}</Subheading>
        </View>
        <View style={styling.footer}>
          <Federated
            authFacebook={authFacebook}
            authFacebookRequest={authFacebookRequest}
            authGoogle={authGoogle}
            authGoogleRequest={authGoogleRequest}
          />
        </View>
        <View style={styling.subtitle}>
          <Subtitle actions={[{
            onPress: () => {},
            title: t('Or Login / Signup'),
          }]} />
        </View>
        <View style={styling.form}>
          <AuthForm
            authSignin={authSignin}
            authSigninRequest={authSigninRequest}
          />
        </View>
        <View style={styling.subtitle}>
          <Subtitle actions={[{
            onPress: navigationActions.navigateAuthForgot(navigation),
            title: t('Forgot Password'),
          }]} />
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  footer: {
    justifyContent: 'flex-end',
  },
  title: {
    alignItems: 'center',
    paddingBottom: 48,
  },
  subtitle: {
  },
  form: {
  },
})

Auth.propTypes = {
  
  theme: PropTypes.any,
  authFacebook: PropTypes.any,
  authFacebookRequest: PropTypes.any,
  authGoogle: PropTypes.any,
  authGoogleRequest: PropTypes.any,
  authSignin: PropTypes.any,
  authSigninRequest: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(Auth))
