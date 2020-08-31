import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import FormComponent from 'components/AuthForgotConfirm/Form'
import AuthActionTemplate from 'templates/Auth/Action'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthErrorTemplate from 'templates/Auth/Error'
import * as navigationActions from 'navigation/actions'

import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const AuthForgotConfirm = ({
  t,
  formErrorMessage,
  handleFormSubmit,
  handleFormTransform,
  handleErrorClose,
  formSubmitLoading,
  formSubmitDisabled,
  formInitialValues,
}) => {
  const styling = styles
  const navigation = useNavigation()

  return (
    <View testID={testIDs.root} style={styling.root}>
      {formErrorMessage ? <AuthErrorTemplate text={formErrorMessage} onClose={handleErrorClose} /> : null}

      <View style={styling.component}>
        <AuthHeaderTemplate title={t('Enter 6-digit code')} subtitle={t('Sent to you')} />

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

      <AuthActionTemplate onPress={navigationActions.navigateAuthSigninPhone(navigation)}>
        {t('Already Have an Account ? Log In')}
      </AuthActionTemplate>
    </View>
  )
}

const styles = StyleSheet.create({
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

AuthForgotConfirm.propTypes = {
  t: PropTypes.any,
  formErrorMessage: PropTypes.any,
  handleFormSubmit: PropTypes.any,
  handleFormTransform: PropTypes.any,
  handleErrorClose: PropTypes.any,
  formSubmitLoading: PropTypes.any,
  formSubmitDisabled: PropTypes.any,
  formInitialValues: PropTypes.any,
}

export default withTranslation()(AuthForgotConfirm)
