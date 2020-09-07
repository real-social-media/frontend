import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native'
import { Text } from 'react-native-paper'
import { ErrorMessage } from 'formik'

import { withTheme } from 'react-native-paper'

const TextCaption = ({
  theme,
  field: {
    value,
    name,
  },
  form,
  placeholder,
  multiline = true,
  keyboardType = 'default',
  onSubmitEditing,
  disabled,
}) => {
  const styling = styles(theme)
  

  /**
   * Prevent too much multiline characters
   * - no more than 4 lines
   * - sequential lines will be replaces by single line
   */
  const onChangeText = (event) => {
    const newlines = event.match(/(\r\n|\n|\r)/gm) || []
    if (newlines.length > 5) return
    form.handleChange(name)(event.replace(/(\n\n|\r\r|\r\n\r\n)/gm, '\n'))
  }

  return (
    <View style={styling.root}>
      <TextInput
        style={styling.input}
        name={name}
        onChangeText={onChangeText}
        onBlur={form.handleBlur(name)}
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
        maxLength={255}
        // returnKeyType="done"
        // blurOnSubmit={true}
        scrollEnabled={true}
      />
      <ErrorMessage name={name} render={msg => <Text style={styling.error}>{msg}</Text>} />
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    padding: 6,
    height: 90,
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
    fontSize: 14,
    color: theme.colors.text,
    textAlignVertical: 'top',
  },
  error: {
    textAlign: 'right',
    fontSize: 11,
  },
})

TextCaption.propTypes = {
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

export default withTheme(TextCaption)
