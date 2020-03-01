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
  password: Yup.string()
    .min(8)
    .max(50)
    .matches(/[a-z]/, 'at least one lowercase char')
    .matches(/[A-Z]/, 'at least one uppercase char')
    .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).')
    .required(),
})

const UsernameForm = ({
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
        <Field name="password" component={TextField} placeholder={t('Password')} secureTextEntry />
      </View>
      <View style={styling.input}>
        <DefaultButton label={t('Login / Signup')} onPress={handleSubmit} loading={loading} />
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
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  authSignin: PropTypes.any,
}

export default withTheme(({
  authSignin,
  authSigninRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    validationSchema={formSchema}
    onSubmit={authSigninRequest}
  >
    {(formikProps) => (
      <UsernameForm
        {...formikProps}
        {...props}
        loading={authSignin.status === 'loading'}
      />
    )}
  </Formik>
))
