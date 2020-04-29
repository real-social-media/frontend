import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Linking,
} from 'react-native'
import OnboardNameForm from 'components/OnboardName/Form'
import Subtitle from 'templates/Subtitle'
import NativeError from 'templates/NativeError'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Subheading } from 'react-native-paper'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const OnboardName = ({
  t,
  theme,
  authCheck,
  authOnboard,
  authOnboardRequest,
  authOnboardIdle,
  authSignoutRequest,
}) => {
  const styling = styles(theme)
  
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
          <OnboardNameForm
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

OnboardName.propTypes = {
  theme: PropTypes.any,
  authOnboard: PropTypes.any,
  authOnboardRequest: PropTypes.any,
  authOnboardIdle: PropTypes.any,
  authSignoutRequest: PropTypes.any,
  t: PropTypes.any,
  authCheck: PropTypes.any,
}

export default withTranslation()(withTheme(OnboardName))
