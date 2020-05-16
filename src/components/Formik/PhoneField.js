import React, { useRef } from 'react'
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

  const inputRef = useRef(null)
  
  /**
   * Manually updating country when new country code selected
   */
  const onSelectCountry = (country) => {
    const nextValue = `+${inputRef.current.getCountryCode(country)}`
    props.form.setFieldValue(props.field.name, nextValue)
  }

  return (
    <PhoneInput
      ref={inputRef}
      flagStyle={styling.flag}
      textProps={props}
      onChangePhoneNumber={props.field.onChange}
      value={props.field.value}
      textComponent={TextField}
      onSelectCountry={onSelectCountry}
    />
  )
}

const styles = theme => StyleSheet.create({
})

PhoneField.propTypes = {
  theme: PropTypes.any,
  field: PropTypes.any,
}

export default withTranslation()(withTheme(PhoneField))
