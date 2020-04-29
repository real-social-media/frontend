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

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(50)
    .matches(/^\S*$/, 'no whitespace')
    .trim()
    .required(),
  fullName: Yup.string().min(2).max(50).required(),
})

const OnboardNameForm = ({
  t,
  theme,
  handleSubmit,
  loading,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="username" component={TextField} placeholder={t('Username')} />
      </View>
      <View style={styling.input}>
        <Field name="fullName" component={TextField} placeholder={t('Full Name')} />
      </View>
      <View style={styling.input}>
        <DefaultButton label={t('Done')} onPress={handleSubmit} loading={loading} disabled={loading} />
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

OnboardNameForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  submitErrors: PropTypes.any,
  dirtySinceLastSubmit: PropTypes.any,
  authOnboard: PropTypes.any,
  t: PropTypes.any,
  loading: PropTypes.any,
}

export default withTranslation()(withTheme(({
  authCheck,
  authOnboard,
  authOnboardRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      username: '',
      fullName: path(['payload', 'user', 'name'])(authCheck) || '',
    }}
    validationSchema={formSchema}
    onSubmit={authOnboardRequest}
  >
    {(formikProps) => (
      <OnboardNameForm
        {...formikProps}
        {...props}
        loading={authOnboard.status === 'loading'}
      />
    )}
  </Formik>
)))
