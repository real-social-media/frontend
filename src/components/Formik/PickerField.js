import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select'
import { ErrorMessage } from 'formik'

import { withTheme } from 'react-native-paper'

const PickerField = ({
  theme,
  form,
  field,
  hideError,
  ...props
}) => {
  const styling = styles(theme)
  
  const onFocus = () => {
    form.setFieldTouched(field.name, true)
    props.handleFieldFocus && props.handleFieldFocus()
  }

  const onBlur = () => {
    form.setFieldTouched(field.name, false)
    props.handleFieldBlur && props.handleFieldBlur()
  }

  const onChangeText = (value) => {
    form.setFieldValue(field.name, value)
  }

  return (
    <View style={styling.root}>
      <RNPickerSelect
        {...props}
        onValueChange={onChangeText}
        style={{ inputIOS: styling.inputIOS, placeholder: styling.placeholder }}
        onOpen={onFocus}
        onClose={onBlur}
        onDonePress={onBlur}
        value={field.value}
      />

      {!hideError ?
        <ErrorMessage name={field.name} render={msg => <Text style={styling.error}>{msg}</Text>} />
      : null}
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
  root: {
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
  inputIOS: {
    fontSize: 14,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
    height: 38,
    paddingHorizontal: 12,
  },
  placeholder: {
    fontSize: 14,
    color: theme.colors.border,
  },
})

PickerField.propTypes = {
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

PickerField.defaultProps = {
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

export default withTheme(PickerField)
