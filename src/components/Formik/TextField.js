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
  form,
  field,
  placeholder,
  hideError,
  testID,
  ...props
}) => {
  const styling = styles
  
  const onFocus = () => {
    form.setFieldTouched(field.name, true)
    props.handleFieldFocus && props.handleFieldFocus()
  }

  const onBlur = (event) => {
    form.handleBlur(field.name)(event)
    form.setFieldTouched(field.name, false)
    props.handleFieldBlur && props.handleFieldBlur()
  }

  const onChangeText = (event) => {
    form.handleChange(field.name)(event)
  }

  return (
    <View style={styling.root}>
      <TextInput
        {...props}
        style={styling.input}
        name={field.name}
        onChangeText={onChangeText}
        onBlur={onBlur}
        onFocus={onFocus}
        value={field.value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        label={placeholder}
        dense={true}
        testID={testID}
      />

      {!hideError ?
        <ErrorMessage name={field.name} render={msg => <Text style={styling.error}>{msg}</Text>} />
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
  secureTextEntry: PropTypes.bool,
  textContentType: PropTypes.string,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.any,
  testID: PropTypes.any,
  handleFieldFocus: PropTypes.func,
  handleFieldBlur: PropTypes.func,
  autoCapitalize: PropTypes.string,
  mode: PropTypes.string,
  returnKeyType: PropTypes.string,
}

TextField.defaultProps = {
  autoCompleteType: 'off',
  multiline: false,
  keyboardType: 'default',
  textContentType: 'none',
  autoFocus: false,
  onSubmitEditing: () => {},
  secureTextEntry: false,
  disabled: false,
  maxLength: 255,
  handleFieldFocus: () => {},
  handleFieldBlur: () => {},
  autoCapitalize: 'none',
  mode: 'outlined',
  returnKeyType: 'done',
}

export default withTheme(TextField)
