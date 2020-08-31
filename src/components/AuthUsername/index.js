import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import FormComponent from 'components/AuthUsername/Form'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthErrorTemplate from 'templates/Auth/Error'

import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const AuthUsername = ({
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

  return (
    <View testID={testIDs.root} style={styling.root}>
      {formErrorMessage ? <AuthErrorTemplate text={formErrorMessage} onClose={handleErrorClose} /> : null}

      <View style={styling.component}>
        <AuthHeaderTemplate title={t('Grab Your Username!')} subtitle={t('You can always change it later')} />

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

AuthUsername.propTypes = {
  t: PropTypes.any,
  formErrorMessage: PropTypes.any,
  handleFormSubmit: PropTypes.any,
  handleFormTransform: PropTypes.any,
  handleErrorClose: PropTypes.any,
  formSubmitLoading: PropTypes.any,
  formSubmitDisabled: PropTypes.any,
  formInitialValues: PropTypes.any,
}

export default withTranslation()(AuthUsername)
