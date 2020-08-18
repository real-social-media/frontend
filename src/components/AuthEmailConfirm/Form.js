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
import path from 'ramda/src/path'

import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  confirmationCode: Yup.string()
    .length(6)
    .matches(/^[0-9]*$/, 'must only contain numbers')
    .matches(/^\S*$/, 'no whitespace')
    .trim()
    .required(),
})

const EmailConfirmForm = ({
  t,
  handleSubmit,
  loading,
}) => {
  const styling = styles
  
  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field testID="components/AuthEmailConfirm/Form/confirmationCode" name="confirmationCode" component={TextField} placeholder={t('Confirmation Code')} keyboardType="number-pad" textContentType="oneTimeCode" autoCompleteType="off" autoFocus maxLength={6} />
      </View>

      {loading ?
        <View style={styling.input}>
          <DefaultButton label={t('Next')} onPress={handleSubmit} loading={loading} disabled={loading} />
        </View>
      : null}
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

EmailConfirmForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
}

export default withTranslation()(({
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
    {(formikProps) => {
      /**
       *
       */
      const handleSubmit = () => {
        const nextValues = handleFormTransform(formikProps.values)
        formikProps.handleSubmit(nextValues)
      }

      /**
       *
       */
      React.useEffect(() => {
        if (
          path(['values', 'confirmationCode', 'length'])(formikProps) !== 6 ||
          !path(['values', 'cognitoUsername', 'length'])(formikProps) ||
          formSubmitLoading ||
          formSubmitDisabled
        ) return
        handleSubmit()
      }, [formikProps.values])

      return (
        <EmailConfirmForm
          {...formikProps}
          {...props}
          loading={formSubmitLoading}
          handleSubmit={handleSubmit}
        />
      )
    }}
  </Formik>
))
