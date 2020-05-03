import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import ForgotConfirmForm from 'components/ForgotConfirm/Form'
import Subtitle from 'templates/Subtitle'
import NativeError from 'templates/NativeError'
import { Subheading } from 'react-native-paper'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ForgotConfirm = ({
  t,
  theme,
  authForgot,
  authForgotConfirm,
  authForgotConfirmRequest,
  authForgotConfirmIdle,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.wrapper}>
      <NativeError
        handleCancelPress={authForgotConfirmIdle}
        titleText={t('Error occured')}
        messageText={t(path(['message', 'text'])(authForgotConfirm))}
        actionText={t('Try again')}
        status={authForgotConfirm.status}
        triggerOn="failure"
      />

      <View style={styling.root}>
        <View style={styling.title}>
          <Subheading>{t('Create new password')}</Subheading>
        </View>
        <View style={styling.form}>
          <ForgotConfirmForm
            authForgot={authForgot}
            authForgotConfirm={authForgotConfirm}
            authForgotConfirmRequest={authForgotConfirmRequest}
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

ForgotConfirm.propTypes = {
  theme: PropTypes.any,
  authForgotConfirm: PropTypes.any,
  authForgotConfirmRequest: PropTypes.any,
  t: PropTypes.any,
  authForgot: PropTypes.any,
  authForgotConfirmIdle: PropTypes.any,
}

export default withTranslation()(withTheme(ForgotConfirm))
