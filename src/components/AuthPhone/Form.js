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

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/, 'internation format required (e.g. +1555)')
    .min(3)
    .max(50)
    .trim()
    .required(),
})

const PhoneForm = ({
  t,
  theme,
  handleSubmit,
  loading,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="phone" component={TextField} placeholder={t('Phone Number')} keyboardType="phone-pad" textContentType="telephoneNumber" autoCompleteType="tel" autoFocus />
      </View>
      <View style={styling.input}>
        <DefaultButton label={t('Next')} onPress={handleSubmit} loading={loading} disabled={loading} />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  input: {
    marginBottom: 12,
  },
})

PhoneForm.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
  authSignin: PropTypes.any,
}

export default withTranslation()(withTheme(({
  handleFormSubmit,
  formSubmitLoading,
  handleFormTransform,
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
      <PhoneForm
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
)))
