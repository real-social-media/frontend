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
  formSubmitLoading,
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
          title={t('Signup with Email Address')}
          subtitle={t('We\'ll send you an Email verification code')}
        />

        <View style={styling.content}>
          <FormComponent
            handleFormSubmit={handleFormSubmit}
            formSubmitLoading={formSubmitLoading}
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
    paddingHorizontal: 48, 
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
  formSubmitLoading: PropTypes.any,
  formInitialValues: PropTypes.any,
}

export default withTranslation()(withTheme(AuthEmail))
