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
  confirmationCode: Yup.string().min(2).max(50).required(),
})

const SignupForm = ({
  t,
  theme,
  handleSubmit,
  loading,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="confirmationCode" component={TextField} placeholder={t('Confirmation code')} />
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

SignupForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  submitErrors: PropTypes.any,
  dirtySinceLastSubmit: PropTypes.any,
  authSignin: PropTypes.any,
  authSignup: PropTypes.any,
  t: PropTypes.any,
  loading: PropTypes.any,
}

export default withTranslation()(withTheme(({
  authSignup,
  authSignupRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      confirmationCode: '',
    }}
    validationSchema={formSchema}
    onSubmit={authSignupRequest}
  >
    {(formikProps) => (
      <SignupForm
        {...formikProps}
        {...props}
        loading={authSignup.status === 'loading'}
      />
    )}
  </Formik>
)))