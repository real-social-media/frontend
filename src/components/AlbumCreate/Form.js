import React, { useEffect } from 'react'
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
  name: Yup.string().min(1).max(50).required(),
})

const AlbumCreateForm = ({
  theme,
  handleSubmit,
  loading,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="name" component={TextField} placeholder={t('Album Name')} />
      </View>

      <View style={styling.input}>
        <DefaultButton label={t('Create Album')} onPress={handleSubmit} loading={loading} />
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

AlbumCreateForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
}

export default withTheme(({
  albumsCreate,
  albumsCreateRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      name: '',
      description: '',
    }}
    validationSchema={formSchema}
    onSubmit={albumsCreateRequest}
  >
    {(formikProps) => (
      <AlbumCreateForm
        {...formikProps}
        {...props}
        loading={false}
      />
    )}
  </Formik>
))
