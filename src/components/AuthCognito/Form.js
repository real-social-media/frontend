import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import TextField from 'components/Formik/TextField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import Config from 'react-native-config'

import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(50)
    .matches(/^[a-zA-Z0-9_.]{3,30}$/, 'username must only contain letters & numbers')
    .trim()
    .required()
    .test(
      'usernameReserve',
      'username is reserved',
      (value) =>
        new Promise((resolve) => {
          fetch(`${Config.AWS_API_GATEWAY_ENDPOINT}/username/status?username=${value}`, {
            method: 'GET',
            headers: {
              'X-Api-Key': Config.AWS_API_GATEWAY_KEY,
            },
          })
            .then((resp) => resp.json())
            .then((resp) => resolve(resp.status === 'AVAILABLE'))
            .catch(() => resolve(true))
        }),
    ),
})

const CognitoForm = ({ t, handleSubmit, loading, disabled, isValid, isValidating }) => {
  const styling = styles

  const submitDisabled = disabled || !isValid || isValidating

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field
          testID="components/AuthCognito/Form/username"
          name="username"
          component={TextField}
          placeholder={t('Username')}
          keyboardType="default"
          textContentType="username"
          autoCompleteType="username"
          autoFocus
        />
      </View>
      <View style={styling.input}>
        <DefaultButton
          testID="components/AuthCognito/Form/submit"
          label={t('Next')}
          onPress={handleSubmit}
          loading={loading}
          disabled={submitDisabled}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {},
  input: {
    marginBottom: 12,
  },
})

CognitoForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
  disabled: PropTypes.any,
  isValid: PropTypes.any,
  isValidating: PropTypes.any,
}

export default withTranslation()(
  ({ handleFormSubmit, handleFormTransform, formSubmitLoading, formSubmitDisabled, formInitialValues, ...props }) => (
    <Formik
      initialValues={formInitialValues}
      validationSchema={formSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize
    >
      {(formikProps) => (
        <CognitoForm
          {...formikProps}
          {...props}
          loading={formSubmitLoading}
          disabled={formSubmitDisabled}
          handleSubmit={() => {
            const nextValues = handleFormTransform(formikProps.values)
            formikProps.setValues(nextValues)
            handleFormSubmit(nextValues)
          }}
        />
      )}
    </Formik>
  ),
)
