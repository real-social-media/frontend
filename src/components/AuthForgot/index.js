import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import FormComponent from 'components/AuthForgot/Form'
import AuthActionTemplate from 'templates/Auth/Action'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthErrorTemplate from 'templates/Auth/Error'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const AuthForgot = ({
  t,
  theme,
  formErrorMessage,
  handleFormSubmit,
  handleFormTransform,
  formSubmitLoading,
  formSubmitDisabled,
  formInitialValues,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <React.Fragment>
      {formErrorMessage ?
        <AuthErrorTemplate
          text={formErrorMessage}
        />
      : null}

      <View style={styling.root}>
        <AuthHeaderTemplate
          title={t('Forgot Password')}
          subtitle={t('Reset your password')}
        />

        <View style={styling.content}>
          <FormComponent
            handleFormSubmit={handleFormSubmit}
            handleFormTransform={handleFormTransform}
            formSubmitLoading={formSubmitLoading}
            formSubmitDisabled={formSubmitDisabled}
            formInitialValues={formInitialValues}
          />
        </View>
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

AuthForgot.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  formErrorMessage: PropTypes.any,
  handleFormSubmit: PropTypes.any,
  handleFormTransform: PropTypes.any,
  formSubmitLoading: PropTypes.any,
  formSubmitDisabled: PropTypes.any,
  formInitialValues: PropTypes.any,
}

export default withTranslation()(withTheme(AuthForgot))
