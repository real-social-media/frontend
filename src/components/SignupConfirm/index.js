import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import ConfirmForm from 'components/SignupConfirm/Form'
import Subtitle from 'templates/Subtitle'
import { Subheading } from 'react-native-paper'
import NativeError from 'templates/NativeError'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const SignupConfirm = ({
  t,
  theme,
  authSignin,
  authSignup,
  authSignupConfirm,
  authSignupConfirmRequest,
  authSignupConfirmIdle,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.wrapper}>
      <NativeError
        handleCancelPress={authSignupConfirmIdle}
        titleText={t('Error occured')}
        messageText={t(path(['message', 'text'])(authSignupConfirm))}
        actionText={t('Try again')}
        status={authSignupConfirm.status}
        triggerOn="failure"
      />

      <NativeError
        handleCancelPress={authSignupConfirmIdle}
        titleText={t('All good!')}
        messageText={t(path(['message', 'text'])(authSignupConfirm))}
        actionText={t('Done')}
        status={authSignupConfirm.status}
        triggerOn="success"
      />

      <View style={styling.root}>
        <View style={styling.title}>
          {authSignup.payload.usernameType === 'email' ?
            <Subheading>{t('Enter the code we sent to')} {authSignup.payload.email}</Subheading>
          : null}
          {authSignup.payload.usernameType === 'phone' ?
            <Subheading>{t('Enter the code we sent to')} {authSignup.payload.phone}</Subheading>
          : null}
        </View>
        <View style={styling.form}>
          <ConfirmForm
            authSignin={authSignin}
            authSignupConfirm={authSignupConfirm}
            authSignupConfirmRequest={authSignupConfirmRequest}
          />
        </View>
        <View style={styling.subtitle}>
          <Subtitle actions={[{
            onPress: navigationActions.navigateAuthHome(navigation),
            title: t('Change Email Address'),
          }, {
            onPress: null,
            title: t('or'),
          }, {
            onPress: navigationActions.navigateAuthHome(navigation),
            title: t('Resend Email'),
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

SignupConfirm.propTypes = {
  theme: PropTypes.any,
  authSignin: PropTypes.any,
  authSignup: PropTypes.any,
  authSignupConfirm: PropTypes.any,
  authSignupConfirmRequest: PropTypes.any,
  t: PropTypes.any,
  authSignupConfirmIdle: PropTypes.any,
}

export default withTranslation()(withTheme(SignupConfirm))
