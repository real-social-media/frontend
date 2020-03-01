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
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const TextDemo = ({
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
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <TextInput
        style={styling.input}
        name={name}
        onChangeText={form.handleChange(name)}
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
    padding: 0,
    margin: 0,
    fontSize: 14,
    color: theme.colors.text,
    height: '100%',
    textAlignVertical: 'top',
  },
  error: {
    textAlign: 'right',
    fontSize: 11,
  },
})

TextDemo.propTypes = {
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

export default withTheme(TextDemo)
