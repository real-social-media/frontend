import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import PhoneField from 'components/Formik/PhoneField'
import TextField from 'components/Formik/TextField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const formSchema = Yup.object().shape({
  phone: Yup.string()
    .min(3)
    .max(50)
    .trim()
    .required(),
  password: Yup.string()
    .min(8)
    .max(50)
    .trim()
    .required(),
})

const SigninPhoneForm = ({
  t,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.input}>
        <Field testID={testIDs.form.username} name="phone" component={PhoneField} placeholder={t('Phone Number')} keyboardType="phone-pad" textContentType="telephoneNumber" autoCompleteType="tel" autoFocus />
      </View>
      <View style={styles.input}>
        <Field testID={testIDs.form.password} name="password" component={TextField} placeholder={t('Password')} secureTextEntry keyboardType="default" textContentType="password" autoCompleteType="password" />
      </View>
      <View style={styles.input}>
        <DefaultButton testID={testIDs.form.submitBtn} label={t('Next')} onPress={handleSubmit} loading={isSubmitting} disabled={isSubmitting} />
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

SigninPhoneForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
}

SigninPhoneForm.defaultProps = {
  isSubmitting: false,
}

export default withTranslation()(({
  t, 
  handleFormSubmit,
  initialValues,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={formSchema}
    onSubmit={handleFormSubmit}
  >
    {(formikProps) => (
      <SigninPhoneForm {...formikProps} t={t} />
    )}
  </Formik>
))
