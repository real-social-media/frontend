import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import { ErrorMessage } from 'formik'

import { withTheme } from 'react-native-paper'

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
  textContentType = 'none',
  onSubmitEditing,
  disabled,
  hideError,
  autoCompleteType = 'off',
  secureTextEntry,
  autoFocus = false,
  maxLength,
  testID,
}) => {
  const styling = styles
  
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
        returnKeyType="done"
        textContentType={textContentType}
        autoFocus={autoFocus}
        maxLength={maxLength}
        testID={testID}
      />

      {!hideError ?
        <ErrorMessage name={name} render={msg => <Text style={styling.error}>{msg}</Text>} />
      : null}
    </View>
  )
}

const styles = StyleSheet.create({
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
  hideError: PropTypes.any,
  autoCompleteType: PropTypes.any,
  secureTextEntry: PropTypes.any,
  textContentType: PropTypes.any,
  autoFocus: PropTypes.any,
  maxLength: PropTypes.any,
  testID: PropTypes.any,
}

export default withTheme(TextField)
