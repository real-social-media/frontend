import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import TextField from 'components/Formik/TextField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  name: Yup.string().max(50).required(),
})

const AlbumCreateForm = ({ t, handleSubmit, isSubmitting, isValid }) => {
  return (
    <View>
      <View style={styles.input}>
        <Field name="name" component={TextField} placeholder={t('Album Name')} />
      </View>

      <View style={styles.input}>
        <DefaultButton
          label={t('Create Album')}
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
})

AlbumCreateForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
}

AlbumCreateForm.defaultProps = {
  isSubmitting: false,
  isValid: false,
}

export default withTranslation()(({ albumsCreateRequest, t, isSubmitting }) => (
  <Formik
    initialValues={{
      name: '',
      description: '',
    }}
    validationSchema={formSchema}
    onSubmit={albumsCreateRequest}
  >
    {(formikProps) => <AlbumCreateForm {...formikProps} t={t} isSubmitting={isSubmitting} />}
  </Formik>
))
