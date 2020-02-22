import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik } from 'formik'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const SignupForm = ({
  theme,
  handleSubmit,
  loading,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <DefaultButton label={t('Send Confirmation Email')} onPress={handleSubmit} loading={loading} />
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
  loading: PropTypes.any,
  authSignup: PropTypes.any,
}

export default withTheme(({
  authSignup,
  authSignupRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      firstName: '',
      lastName: '',
    }}
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
))
