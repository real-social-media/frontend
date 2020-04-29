import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import TextField from 'components/Formik/TextField'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import HeaderRight from 'navigation/HeaderRight'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  name: Yup.string().min(1).max(50).required(),
})

const AlbumEditForm = ({
  t,
  theme,
  handleSubmit,
  loading,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  navigation.setOptions({
    headerRight: () => <HeaderRight onPress={handleSubmit} title="Save" />,
  })

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="name" component={TextField} placeholder={t('Album Name')} />
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

AlbumEditForm.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
}

export default withTranslation()(withTheme(({
  album,
  albumsEdit,
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
)))