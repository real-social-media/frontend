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
  confirmationCode: Yup.string().min(2).max(50).required(),
})

const ConfirmForm = ({
  theme,
  handleSubmit,
  loading,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="confirmationCode" component={TextField} placeholder={t('Confirmation code')} />
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

ConfirmForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  submitErrors: PropTypes.any,
  dirtySinceLastSubmit: PropTypes.any,
  authSignin: PropTypes.any,
  authSignupConfirm: PropTypes.any,
}

export default withTheme(({
  authSignupConfirm,
  authSignupConfirmRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      confirmationCode: '',
    }}
    validationSchema={formSchema}
    onSubmit={authSignupConfirmRequest}
  >
    {(formikProps) => (
      <ConfirmForm
        {...formikProps}
        {...props}
        loading={authSignupConfirm.status === 'loading'}
      />
    )}
  </Formik>
))