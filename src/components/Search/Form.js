import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
} from 'react-native'
import TextField from 'components/Formik/TextField'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import path from 'ramda/src/path'
import useDebounce from 'react-use/lib/useDebounce'
import CloseIcon from 'assets/svg/camera/Close'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  searchToken: Yup.string().min(1).max(50).required(),
})

const SearchForm = ({
  t,
  theme,
  handleSubmit,
  handleFormFocus,
  handleFormChange,
  getFieldMeta,
  handleReset,
  values,
}) => {
  const styling = styles(theme)
  

  const formFocus = getFieldMeta('searchToken').touched
  const formChange = path(['searchToken', 'length'])(values)

  const close = (event) => {
    Keyboard.dismiss()
    handleReset()
  }

  useEffect(() => {
    handleFormFocus(formFocus)
  }, [formFocus])
  useEffect(() => {
    handleFormChange(formChange)
  }, [formChange])
  useDebounce(() => {
    if (formChange) handleSubmit()
  }, 500, [formChange])

  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="searchToken" component={TextField} placeholder={t('Search for username')} onSubmitEditing={handleSubmit} hideError />
      </View>
      {formFocus ?
        <TouchableOpacity style={styling.icon} onPress={close}>
          <CloseIcon fill="#fafafa" />
        </TouchableOpacity>
      : null}
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
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
  },
  button: {
    width: 90,
    marginLeft: 12,
  },
})

SearchForm.propTypes = {
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  submitErrors: PropTypes.any,
  dirtySinceLastSubmit: PropTypes.any,
  loading: PropTypes.any,
  usersSearch: PropTypes.any,
  t: PropTypes.any,
  handleFormFocus: PropTypes.any,
  handleFormChange: PropTypes.any,
  getFieldMeta: PropTypes.any,
  handleReset: PropTypes.any,
  values: PropTypes.any,
}

export default withTranslation()(withTheme(({
  usersSearch,
  usersSearchRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      searchToken: '',
    }}
    validationSchema={formSchema}
    onSubmit={usersSearchRequest}
  >
    {(formikProps) => (
      <SearchForm
        {...formikProps}
        {...props}
        loading={usersSearch.status === 'loading'}
      />
    )}
  </Formik>
)))
