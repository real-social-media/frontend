import React from 'react'
import { View } from 'react-native'

const Wrapper = (Component) => {
	const Children = () => (
    <React.Fragment>
      <View style={{ height: 50 }} />
      <Component />
    </React.Fragment>
  )

  return Children
}

export default Wrapper