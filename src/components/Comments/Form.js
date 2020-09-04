import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import TextGrowing from 'components/Formik/TextGrowing'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  text: Yup.string().min(1).required(),
})

const CommentsForm = ({
  t,
  theme,
  handleSubmit,
  loading,
  inputRefs,
}) => {
  const styling = styles(theme)


  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="text" component={TextGrowing} placeholder={t('Add a comment')} hideError inputRef={inputRefs.current.text} />
      </View>
      <View style={styling.button}>
        <DefaultButton label={t('Post')} onPress={handleSubmit} loading={loading} disabled={loading} />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
    minHeight: 64,
    padding: 12,
  },
  input: {
    flex: 1,
  },
  button: {
    width: 90,
    marginLeft: theme.spacing.base,
    justifyContent: 'flex-end',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
  },
})

CommentsForm.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
  inputRefs: PropTypes.any,
}

export default withTranslation()(withTheme(({
  handleFormSubmit,
  formSubmitLoading,
  formSubmitDisabled,
  formInitialValues,
  ...props
}) => (
  <Formik
    initialValues={formInitialValues}
    validationSchema={formSchema}
    onSubmit={handleFormSubmit}
    enableReinitialize
  >
    {(formikProps) => (
      <CommentsForm
        {...formikProps}
        {...props}
        loading={formSubmitLoading}
        disabled={formSubmitDisabled}
      />
    )}
  </Formik>
)))
