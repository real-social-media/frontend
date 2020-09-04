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
import { useHeader } from 'components/ProfileEdit/header'

import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(50)
    .matches(/^\S*$/, 'no whitespace')
    .trim()
    .required(),
  fullname: Yup.string().nullable(),
  bio: Yup.string().nullable(),
  email: Yup.string().nullable(),
  phoneNumber: Yup.string().nullable(),
  privacyStatus: Yup.string().nullable(),
})

const ProfileEditForm = ({
  t,
  handleSubmit,
  loading,
  PrivacyComponent,
}) => {
  const styling = styles

  useHeader({
    onPress: handleSubmit,
    title: 'Update',
  })
  
  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="email" component={TextField} placeholder={t('Email')} disabled autoCompleteType="email" />
      </View>
      <View style={styling.input}>
        <Field name="username" component={TextField} placeholder={t('Username')} disabled autoCompleteType="username" />
      </View>
      <View style={styling.input}>
        <Field name="fullName" component={TextField} placeholder={t('Full Name')} autoCompleteType="name" />
      </View>
      <View style={styling.input}>
        <Field name="bio" component={TextField} placeholder={t('Bio')} />
      </View>
      <View style={styling.input}>
        <Field name="phoneNumber" component={TextField} placeholder={t('Phone Number')} keyboardType="phone-pad" autoCompleteType="tel" />
      </View>
      <View style={styling.input}>
        {PrivacyComponent}
      </View>
      <View style={styling.input}>
        <DefaultButton label={t('Update')} onPress={handleSubmit} loading={loading} disabled={loading} />
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

ProfileEditForm.propTypes = {
  handleSubmit: PropTypes.any,
  submitErrors: PropTypes.any,
  dirtySinceLastSubmit: PropTypes.any,
  usersEditProfile: PropTypes.any,
  values: PropTypes.any,
  t: PropTypes.any,
  loading: PropTypes.any,
  PrivacyComponent: PropTypes.any,
}

export default withTranslation()(({
  usersEditProfile,
  usersEditProfileRequest,
  user,
  ...props
}) => (
  <Formik
    initialValues={user}
    validationSchema={formSchema}
    onSubmit={usersEditProfileRequest}
    enableReinitialize
  >
    {(formikProps) => (
      <ProfileEditForm
        {...formikProps}
        {...props}
        loading={usersEditProfile.status === 'loading'}
      />
    )}
  </Formik>
))
