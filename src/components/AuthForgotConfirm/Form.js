import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import TextField from 'components/Formik/TextField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const formSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(50)
    .trim()
    .required(),
  password: Yup.string()
    .min(8)
    .max(50)
    .trim()
    .required(),
  confirmationCode: Yup.string()
    .min(3)
    .max(50)
    .matches(/^\S*$/, 'no whitespace')
    .trim()
    .required(),
})

const ForgotConfirmForm = ({
  t,
  handleSubmit,
  loading,
}) => {
  const styling = styles
  
  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field testID={testIDs.form.username} name="username" component={TextField} placeholder={t('Phone or Email')} keyboardType="default" textContentType="username" autoCompleteType="username" />
      </View>
      <View style={styling.input}>
        <Field testID={testIDs.form.confirmationCode} name="confirmationCode" component={TextField} placeholder={t('Confirmation Code')} keyboardType="number-pad" textContentType="oneTimeCode" autoCompleteType="off" autoFocus />
      </View>
      <View style={styling.input}>
        <Field testID={testIDs.form.password} name="password" component={TextField} placeholder={t('New Password')} secureTextEntry keyboardType="default" textContentType="password" autoCompleteType="password" />
      </View>
      <View style={styling.input}>
        <DefaultButton testID={testIDs.form.submitBtn} label={t('Next')} onPress={handleSubmit} loading={loading} disabled={loading} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
  },
  input: {
    marginBottom: 12,
  },
})

ForgotConfirmForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
}

export default withTranslation()(({
  handleFormSubmit,
  handleFormTransform,
  formSubmitLoading,
  formInitialValues,
  ...props
}) => (
  <Formik
    initialValues={formInitialValues}
    validationSchema={formSchema}
    onSubmit={handleFormSubmit}
    enableReinitialize
  >
    {(formikProps) => (
      <ForgotConfirmForm
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
))
