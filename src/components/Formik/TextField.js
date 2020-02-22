import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import { ErrorMessage } from 'formik'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const TextField = ({
  theme,
  field: {
    value,
    name,
  },
  form,
  placeholder,
  multiline = false,
  keyboardType = 'default',
  onSubmitEditing,
  disabled,
  hideError,
  autoCompleteType = 'off',
  secureTextEntry,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const onFocus = () => {
    form.setFieldTouched(name, true)
  }
  const onBlur = (event) => {
    form.handleBlur(name)(event)
    // form.setFieldTouched(name, false)
  }
  const onChangeText = (event) => {
    form.handleChange(name)(event)
  }

  return (
    <View style={styling.root}>
      <TextInput
        style={styling.input}
        name={name}
        onChangeText={onChangeText}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        autoCapitalize="none"
        multiline={multiline}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing}
        mode="outlined"
        dense={true}
        label={placeholder}
        disabled={disabled}
        autoCompleteType={autoCompleteType}
        secureTextEntry={secureTextEntry}
      />

      {!hideError ?
        <ErrorMessage name={name} render={msg => <Text style={styling.error}>{msg}</Text>} />
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    position: 'relative',
    marginTop: -6,
  },
  input: {
    padding: 0,
    margin: 0,
    fontSize: 14,
    height: 38,
  },
  error: {
    textAlign: 'right',
    fontSize: 11,
    color: 'red',
  },
})

TextField.propTypes = {
  theme: PropTypes.any,
  field: PropTypes.any,
  form: PropTypes.any,
  placeholder: PropTypes.any,
  meta: PropTypes.any,
  multiline: PropTypes.any,
  keyboardType: PropTypes.any,
  onSubmitEditing: PropTypes.any,
  disabled: PropTypes.any,
}

export default withTheme(TextField)
