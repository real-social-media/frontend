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
import Config from 'react-native-config'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(50)
    .matches(/^\S*$/, 'no whitespace')
    .trim()
    .required()
    .test('usernameReserve', 'username is reserved', (value) =>
      new Promise((resolve, reject) => {
        fetch(`${Config.AWS_API_GATEWAY_ENDPOINT}/username/status?username=${value}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': Config.AWS_API_GATEWAY_KEY,
          },
        })
        .then((resp) => resp.json())
        .then((resp) => resolve(resp.status === 'AVAILABLE'))
        .catch((error) => resolve(true))
      })
    ),
})

const UsernameForm = ({
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
    isValidating ||
    !dirty
  )

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="username" component={TextField} placeholder={t('Username')} />
      </View>
      <View style={styling.input}>
        <DefaultButton label={t('Next')} onPress={handleSubmit} loading={loading} disabled={submitDisabled} />
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

UsernameForm.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
  authSignin: PropTypes.any,
}

export default withTranslation()(withTheme(({
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
)))
