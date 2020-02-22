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
  code: Yup.string()
    .min(3)
    .max(50)
    .required(),
  password: Yup.string()
    .min(8)
    .max(50)
    .matches(/[a-z]/, 'at least one lowercase char')
    .matches(/[A-Z]/, 'at least one uppercase char')
    .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).')
    .required(),
})

const ForgotConfirmForm = ({
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
        <Field name="code" component={TextField} placeholder={t('Confirmation code')} />
      </View>
      <View style={styling.input}>
        <Field name="password" component={TextField} placeholder={t('New Password')} secureTextEntry />
      </View>
      <View style={styling.input}>
        <DefaultButton label={t('Done')} onPress={handleSubmit} loading={loading} />
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

ForgotConfirmForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  submitErrors: PropTypes.any,
  dirtySinceLastSubmit: PropTypes.any,
  authForgotConfirm: PropTypes.any,
}

export default withTheme(({
  authForgot,
  authForgotConfirm,
  authForgotConfirmRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      username: authForgot.payload.username || '',
      code: '',
      password: '',
    }}
    validationSchema={formSchema}
    onSubmit={authForgotConfirmRequest}
  >
    {(formikProps) => (
      <ForgotConfirmForm
        {...formikProps}
        {...props}
        loading={authForgotConfirm.status === 'loading'}
      />
    )}
  </Formik>
))