import React from 'react'
import { View, StyleSheet } from 'react-native'

const Wrapper = (Component) => {
	const Children = () => (
    <React.Fragment>
      <View style={styles.offset} />
      <Component />
    </React.Fragment>
  )

  return Children
}

const styles = StyleSheet.create({
  offset: {
    height: 50,
  },
})

export default Wrapper