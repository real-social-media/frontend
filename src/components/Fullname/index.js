import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Linking,
} from 'react-native'
import FullnameForm from 'components/Onboard/FullnameForm'
import Subtitle from 'components/Onboard/Subtitle'
import NativeError from 'templates/NativeError'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Subheading } from 'react-native-paper'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Fullname = ({
  theme,
  authCheck,
  authOnboard,
  authOnboardRequest,
  authOnboardIdle,
  authSignoutRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <KeyboardAwareScrollView contentContainerStyle={styling.wrapper} extraScrollHeight={160}>
      <NativeError
        handleCancelPress={authOnboardIdle}
        titleText={t('Error occured')}
        messageText={t(path(['message', 'text'])(authOnboard))}
        actionText={t('Try again')}
        status={authOnboard.status}
        triggerOn="failure"
      />

      <View style={styling.root}>
        <View style={styling.title}>
          <Subheading>{t('Enter your full name & reserve your new username')}</Subheading>
        </View>
        <View style={styling.form}>
          <FullnameForm
            authCheck={authCheck}
            authOnboard={authOnboard}
            authOnboardRequest={authOnboardRequest}
          />
        </View>
        <View style={styling.subtitle}>
          <Subtitle actions={[{
            onPress: () => Linking.openURL('https://real.app/real-eula-html-english.html').catch(() => {}),
            title: t('By tapping to continue, you are indicating that you have read the EULA and agree to the Terms of Service'),
          }, {
            onPress: authSignoutRequest,
            title: t('Signout'),
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
  header: {
    justifyContent: 'center',
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

Fullname.propTypes = {
  theme: PropTypes.any,
  authOnboard: PropTypes.any,
  authOnboardRequest: PropTypes.any,
  authOnboardIdle: PropTypes.any,
  authSignoutRequest: PropTypes.any,
}

export default withTheme(Fullname)
