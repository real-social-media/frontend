import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import TextField from 'components/Formik/TextField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  text: Yup.string().min(1).max(50).required(),
})

const CommentsForm = ({
  theme,
  handleSubmit,
  handleFormFocus,
  handleFormChange,
  getFieldMeta,
  handleReset,
  loading,
  values,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="text" component={TextField} placeholder={t('Add a comment')} hideError />
      </View>
      <View style={styling.button}>
        <DefaultButton label={t('Post')} onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: 64,
    padding: 12,
  },
  input: {
    flex: 1,
  },
  button: {
    width: 90,
    marginLeft: theme.spacing.base,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
  },
})

CommentsForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  submitErrors: PropTypes.any,
  dirtySinceLastSubmit: PropTypes.any,
  loading: PropTypes.any,
}

export default withTheme(({
  commentsAdd,
  commentsAddRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      text: '',
    }}
    validationSchema={formSchema}
    onSubmit={(values, { resetForm }) => {
      commentsAddRequest(values)
      resetForm()
    }}
  >
    {(formikProps) => (
      <CommentsForm
        {...formikProps}
        {...props}
        loading={false}
      />
    )}
  </Formik>
))
