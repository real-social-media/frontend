import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import ActionsComponent from 'components/AuthHome/Actions'
import AuthActionTemplate from 'templates/Auth/Action'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthTermsTemplate from 'templates/Auth/Terms'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const AuthHome = ({
  t,
  theme,
  authGoogle,
  authGoogleRequest,
  authApple,
  authAppleRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View testID="components/AuthHome" style={styling.root}>
      <View style={styling.component}>
        <AuthHeaderTemplate
          title={t('Sign up for REAL')}
          subtitle={t('The Healthier Social Media Movement')}
        />

        <View style={styling.content}>
          <ActionsComponent
            authGoogle={authGoogle}
            authGoogleRequest={authGoogleRequest}
            authApple={authApple}
            authAppleRequest={authAppleRequest}
          />
        </View>

        <AuthTermsTemplate />
      </View>

      <AuthActionTemplate onPress={navigationActions.navigateSignin(navigation)}>
        {t('Already Have an Account ? Log In')}
      </AuthActionTemplate>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  component: {
    paddingHorizontal: 24,
    flex: 1,
  },
  content: {
    flex: 1,
  },
})

AuthHome.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  authGoogle: PropTypes.any,
  authGoogleRequest: PropTypes.any,
}

export default withTranslation()(withTheme(AuthHome))
