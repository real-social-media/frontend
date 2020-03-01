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
import { useTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(50)
    .matches(/^\S*$/, 'no whitespace')
    .trim()
    .required(),
})

const ForgotForm = ({
  theme,
  handleSubmit,
  loading,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="username" component={TextField} placeholder={t('Phone or Email')} />
      </View>
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

ForgotForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  submitErrors: PropTypes.any,
  dirtySinceLastSubmit: PropTypes.any,
  authForgot: PropTypes.any,
}

export default withTheme(({
  authForgot,
  authForgotRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      username: '',
    }}
    validationSchema={formSchema}
    onSubmit={authForgotRequest}
  >
    {(formikProps) => (
      <ForgotForm
        {...formikProps}
        {...props}
        loading={authForgot.status === 'loading'}
      />
    )}
  </Formik>
))
