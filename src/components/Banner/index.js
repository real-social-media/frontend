import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Text } from 'react-native-paper'

const Banner = () => {
  const styling = styles

  return (
    <View style={styling.root}>
      <Text style={styling.text}>Yet another failed notification</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    zIndex: 5,
    minHeight: 48 + ifIphoneX(40, 0),
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 12,
  },
  text: {
    color: 'white',
  },
})

export default Banner
