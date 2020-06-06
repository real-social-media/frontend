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
  password: Yup.string()
    .min(8)
    .max(50)
    .matches(/^\S*$/, 'no whitespace')
    .trim()
    .required(),
})

const PasswordForm = ({
  t,
  theme,
  handleSubmit,
  loading,
  disabled,
  dirty,
  isValid,
  isValidating,
}) => {
  const styling = styles(theme)

  const submitDisabled = (
    disabled ||
    !isValid ||
    isValidating
  )
  
  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field testID="components/AuthPassword/Form/password" name="password" component={TextField} placeholder={t('Password')} secureTextEntry keyboardType="default" textContentType="password" autoCompleteType="password" autoFocus />
      </View>
      <View style={styling.input}>
        <DefaultButton testID="components/AuthPassword/Form/submit" label={t('Next')} onPress={handleSubmit} loading={loading} disabled={submitDisabled} />
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

PasswordForm.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
}

export default withTranslation()(withTheme(({
  handleFormSubmit,
  handleFormTransform,
  formSubmitLoading,
  formSubmitDisabled,
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
      <PasswordForm
        {...formikProps}
        {...props}
        loading={formSubmitLoading}
        disabled={formSubmitDisabled}
        handleSubmit={() => {
          const nextValues = handleFormTransform(formikProps.values)
          handleFormSubmit(nextValues)
        }}
      />
    )}
  </Formik>
)))
