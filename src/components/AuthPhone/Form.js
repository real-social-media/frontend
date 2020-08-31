import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import PhoneField from 'components/Formik/PhoneField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const formSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]*$/gm, 'numbers only')
    .min(3)
    .max(50)
    .trim()
    .required(),
})

const PhoneForm = ({ t, handleSubmit, loading }) => {
  const styling = styles

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field
          testID={testIDs.form.phone}
          name="phone"
          component={PhoneField}
          placeholder={t('Phone Number')}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoCompleteType="tel"
          autoFocus
        />
      </View>
      <View style={styling.input}>
        <DefaultButton
          testID={testIDs.form.submitBtn}
          label={t('Next')}
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
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

PhoneForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
}

export default withTranslation()(
  ({ handleFormSubmit, formSubmitLoading, handleFormTransform, formInitialValues, ...props }) => (
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
  ),
)
