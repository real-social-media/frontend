import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import ForgotForm from 'components/Forgot/Form'
import Subtitle from 'templates/Subtitle'
import NativeError from 'templates/NativeError'
import { Subheading } from 'react-native-paper'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Forgot = ({
  t,
  theme,
  authForgot,
  authForgotRequest,
  authForgotIdle,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.wrapper}>
      <NativeError
        handleCancelPress={authForgotIdle}
        titleText={t('Error occured')}
        messageText={t(path(['message', 'text'])(authForgot))}
        actionText={t('Try again')}
        status={authForgot.status}
        triggerOn="failure"
      />

      <View style={styling.root}>
        <View style={styling.title}>
          <Subheading>{t('Forgot password ?')}</Subheading>
        </View>
        <View style={styling.form}>
          <ForgotForm
            authForgot={authForgot}
            authForgotRequest={authForgotRequest}
          />
        </View>
        <View style={styling.subtitle}>
          <Subtitle actions={[{
            onPress: navigationActions.navigateAuth(navigation),
            title: t('Change Email Address'),
          }, {
            onPress: null,
            title: t('or'),
          }, {
            onPress: navigationActions.navigateAuth(navigation),
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

Forgot.propTypes = {
  theme: PropTypes.any,
  authForgot: PropTypes.any,
  authForgotRequest: PropTypes.any,
  t: PropTypes.any,
  authForgotIdle: PropTypes.any,
}

export default withTranslation()(withTheme(Forgot))
