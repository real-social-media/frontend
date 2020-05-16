import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
} from 'react-native'
import PhoneInput from 'react-native-phone-input'
import TextField from 'components/Formik/TextField'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PhoneField = ({
  t,
  theme,
  ...props
}) => {
  const styling = styles(theme)
  
  return (
    <PhoneInput
      flagStyle={styling.flag}
      textProps={props}
      onChangePhoneNumber={props.field.onChange}
      value={props.field.value}
      textComponent={TextField}
    />
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
  flag: {
  },
})

PhoneField.propTypes = {
  theme: PropTypes.any,
  field: PropTypes.any,
}

export default withTranslation()(withTheme(PhoneField))
