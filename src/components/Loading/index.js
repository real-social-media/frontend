import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

const Loading = () => (
  <View style={styles.root}>
    <ActivityIndicator size="small" color="#ffffff" />
  </View>
)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Loading
