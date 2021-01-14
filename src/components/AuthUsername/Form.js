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
import testIDs from './test-ids'
import * as Validation from 'services/Validation'

import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  username: Validation.username,
})

const UsernameForm = ({
  t,
  handleSubmit,
  loading,
  disabled,
  isValid,
  isValidating,
}) => {
  const submitDisabled = (
    disabled ||
    !isValid ||
    isValidating
  )

  return (
    <View style={styles.root}>
      <View style={styles.input}>
        <Field
          {...Validation.getInputTypeProps('username')}
          testID={testIDs.form.username}
          name="username"
          component={TextField}
          placeholder={t('Username')}
        />
      </View>
      <View style={styles.input}>
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
  root: {
  },
  input: {
    marginBottom: 12,
  },
})

UsernameForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
  disabled: PropTypes.any,
  isValid: PropTypes.any,
  isValidating: PropTypes.any,
}

export default withTranslation()(({
  handleFormSubmit,
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
      <UsernameForm
        {...formikProps}
        {...props}
        loading={formSubmitLoading}
        disabled={formSubmitDisabled}
      />
    )}
  </Formik>
))
