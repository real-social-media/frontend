import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import FormComponent from 'components/AuthEmail/Form'
import AuthActionTemplate from 'templates/Auth/Action'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthErrorTemplate from 'templates/Auth/Error'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const AuthEmail = ({
  t,
  theme,
  formErrorMessage,
  handleFormSubmit,
  handleFormTransform,
  handleErrorClose,
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
          onClose={handleErrorClose}
        />
      : null}

      <View style={styling.root}>
        <AuthHeaderTemplate
          title={t('Signup with Email Address')}
          subtitle={t('We\'ll send you an Email verification code')}
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

      <AuthActionTemplate onPress={navigationActions.navigateAuthPhone(navigation)}>
        {t('Signup with Phone Number')}
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

AuthEmail.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  formErrorMessage: PropTypes.any,
  handleFormSubmit: PropTypes.any,
  handleFormTransform: PropTypes.any,
  handleErrorClose: PropTypes.any,
  formSubmitLoading: PropTypes.any,
  formSubmitDisabled: PropTypes.any,
  formInitialValues: PropTypes.any,
}

export default withTranslation()(withTheme(AuthEmail))
