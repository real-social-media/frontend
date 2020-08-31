import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import TextField from 'components/Formik/TextField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const formSchema = Yup.object().shape({
  email: Yup.string().min(3).max(50).email().matches(/^\S*$/, 'no whitespace').trim().required(),
})

const EmailForm = ({ t, handleSubmit, loading, disabled, isValid, isValidating }) => {
  const styling = styles

  const submitDisabled = disabled || !isValid || isValidating

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field
          testID={testIDs.form.email}
          name="email"
          component={TextField}
          placeholder={t('Email Address')}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCompleteType="email"
          autoFocus
        />
      </View>
      <View style={styling.input}>
        <DefaultButton
          testID={testIDs.form.submitBtn}
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

EmailForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
  disabled: PropTypes.bool,
  isValid: PropTypes.bool,
  isValidating: PropTypes.bool,
}

export default withTranslation()(
  ({ handleFormSubmit, handleFormTransform, formSubmitLoading, formInitialValues, ...props }) => (
    <Formik
      initialValues={formInitialValues}
      validationSchema={formSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize
    >
      {(formikProps) => (
        <EmailForm
          {...formikProps}
          {...props}
          loading={formSubmitLoading}
          handleSubmit={() => {
            const nextValues = handleFormTransform(formikProps.values)
            handleFormSubmit(nextValues)
          }}
        />
      )}
    </Formik>
  ),
)
