import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import TextField from 'components/Formik/TextField'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useHeader } from 'components/AlbumEdit/header'

import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  name: Yup.string().min(1).max(50).required(),
})

const AlbumEditForm = ({
  t,
  handleSubmit,
}) => {
  const styling = styles

  useHeader({
    title: 'Save',
    onPress: handleSubmit,
  })

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="name" component={TextField} placeholder={t('Album Name')} />
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

AlbumEditForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
}

export default withTranslation()(({
  album,
  albumsEditRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      albumId: album.albumId,
      name: album.name,
      description: album.description,
    }}
    validationSchema={formSchema}
    onSubmit={albumsEditRequest}
  >
    {(formikProps) => (
      <AlbumEditForm
        {...formikProps}
        {...props}
        loading={false}
      />
    )}
  </Formik>
))