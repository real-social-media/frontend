import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Linking,
} from 'react-native'
import ActionsComponent from 'components/AuthHome/Actions'
import SubtitleTemplate from 'templates/Subtitle'
import AuthActionTemplate from 'templates/Auth/Action'
import AuthHeaderTemplate from 'templates/Auth/Header'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const AuthHome = ({
  t,
  theme,
  authGoogle,
  authGoogleRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <React.Fragment>
      <View style={styling.root}>
        <AuthHeaderTemplate
          title={t('Sign up for REAL')}
          subtitle={t('The Healthier Social Media Movement')}
        />

        <View style={styling.content}>
          <ActionsComponent
            authGoogle={authGoogle}
            authGoogleRequest={authGoogleRequest}
          />
        </View>

        <SubtitleTemplate
          actions={[{
            onPress: () => Linking.openURL('https://real.app/real-eula-html-english.html').catch(() => {}),
            title: t('By tapping to continue, you are indicating that you have read the EULA and agree to the Terms of Service'),
          }]}
        />
      </View>

      <AuthActionTemplate onPress={navigationActions.navigateAuthSignin(navigation)}>
        {t('Already Have an Account ? Log In')}
      </AuthActionTemplate>
    </React.Fragment>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  footer: {
  },
})

AuthHome.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  authGoogle: PropTypes.any,
  authGoogleRequest: PropTypes.any,
}

export default withTranslation()(withTheme(AuthHome))
