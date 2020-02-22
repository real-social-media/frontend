import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import ForgotForm from 'components/Onboard/ForgotForm'
import Subtitle from 'components/Onboard/Subtitle'
import NativeError from 'templates/NativeError'
import { Subheading } from 'react-native-paper'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Forgot = ({
  theme,
  authForgot,
  authForgotRequest,
  authForgotIdle,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
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
            onPress: () => navigation.navigate('Auth'),
            title: t('Change Email Address'),
          }, {
            onPress: null,
            title: t('or'),
          }, {
            onPress: () => navigation.navigate('Auth'),
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
}

export default withTheme(Forgot)
