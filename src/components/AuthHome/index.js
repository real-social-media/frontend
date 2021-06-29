import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import ActionsComponent from 'components/AuthHome/Actions'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthTermsTemplate from 'templates/Auth/Terms'
import * as navigationActions from 'navigation/actions'
import CloseIcon from 'assets/svg/action/Close'
import HeaderRight from 'navigation/HeaderRight'

import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'react-native-paper'
import testIDs from './test-ids'

const AuthHome = ({
  t,
  theme,
  authSigninGoogle,
  authSigninGoogleRequest,
  authSigninApple,
  authSigninAppleRequest,
  authSigninAnonymous,
  authSigninAnonymousRequest,
}) => {
  const navigation = useNavigation()
  const isLoading = authSigninAnonymous.status === 'loading'

  return (
    <View testID={testIDs.root} style={styles.root}>
      <TouchableOpacity
        testID={testIDs.closeBtn}
        style={[styles.closeBtn, isLoading ? styles.disabled : null]}
        onPress={authSigninAnonymousRequest}
        disabled={isLoading}
      >
        <CloseIcon fill={theme.colors.text} />
      </TouchableOpacity>

      <View style={styles.skipBtn}>
        <HeaderRight
          testID={testIDs.skipBtn}
          onPress={authSigninAnonymousRequest}
          style={isLoading ? styles.disabled : null}
          disabled={isLoading}
          title="Skip"
        />
      </View>

      <View style={styles.component}>
        <AuthHeaderTemplate
          title={t('Join REAL')}
          subtitle={t('The Healthier Social Media Movement')}
          noMargin
        />

        <View style={styles.content}>
          <ActionsComponent
            authSigninGoogle={authSigninGoogle}
            authSigninGoogleRequest={authSigninGoogleRequest}
            authSigninApple={authSigninApple}
            authSigninAppleRequest={authSigninAppleRequest}
            authSigninAnonymous={authSigninAnonymous}
            authSigninAnonymousRequest={authSigninAnonymousRequest}
          />
        </View>

        <AuthTermsTemplate />
      </View>

      <View style={styles.footer}>
        <DefaultButton
          testID={testIDs.footer.signInBtn}
          onPress={() => navigationActions.navigateSignin(navigation)}
          label={t('Already Have an Account? Log In')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 110,
    paddingHorizontal: 24,
    flex: 1,
  },
  component: {
    flex: 1,
  },
  content: {
    marginTop: 24,
    marginBottom: 16,
  },
  closeBtn: {
    position: 'absolute',
    top: 56,
    left: 16,
    paddingHorizontal: 5,
    paddingVertical: 5,
    zIndex: 1,
  },
  skipBtn: {
    position: 'absolute',
    top: 55,
    right: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    zIndex: 1,
  },
  disabled: {
    opacity: 0.4,
  },
  footer: {
    marginBottom: 48,
  },
})

AuthHome.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  authSigninGoogle: PropTypes.any,
  authSigninGoogleRequest: PropTypes.any,
  authSigninApple: PropTypes.any,
  authSigninAppleRequest: PropTypes.any,
  authSigninAnonymous: PropTypes.any,
  authSigninAnonymousRequest: PropTypes.any,
}

export default withTranslation()(withTheme(AuthHome))
