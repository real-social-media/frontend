import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import TextField from 'components/Formik/TextField'
import CountryCode from 'components/CountryCode'
import countries from 'assets/countries.json'

function PhoneField(props) {
  const [countryCode, setCountryCode] = useState('US')

  /**
   * Manually updating country when new country code selected
   */
  const onSelectCountry = (country) => {
    setCountryCode(country.value)
    props.form.setFieldValue('countryCode', country.dialCode)
  }

  return (
    <View style={styles.root}>
      <View style={styles.flag}>
        <CountryCode value={countryCode} onChange={onSelectCountry} options={countries} />
      </View>
      <View style={styles.input}>
        <TextField {...props} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
  flag: {
    flexShrink: 0,
  },
})

PhoneField.propTypes = {
  field: PropTypes.any,
  form: PropTypes.any,
}

export default PhoneField
