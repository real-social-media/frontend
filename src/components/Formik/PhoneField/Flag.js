import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Text } from 'react-native-paper'
import { withTheme } from 'react-native-paper'

const PhoneField = ({
  theme,
  inputRef,
}) => {
  const styling = styles(theme)

  return (
    <TouchableOpacity style={styling.root} onPress={inputRef.current.onPressFlag}>
      <View style={styling.flag}>
        <Image
          style={styling.image}
          source={inputRef.current.getFlag(inputRef.current.getISOCode())}
        />
      </View>
      <View style={styling.code}>
        <Text style={styling.text}>(+{inputRef.current.getCountryCode()})</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.backgroundSecondary,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 2,
    height: 40,
  },
  flag: {
    paddingHorizontal: 6,
  },
  code: {
    paddingHorizontal: 6,
  },
  image: {
    width: 36,
    height: 24,
  },
  text: {
    lineHeight: 24,
    fontWeight: '600',
  },
})

PhoneField.propTypes = {
  theme: PropTypes.any,
  inputRef: PropTypes.any,
}

export default withTheme(PhoneField)
