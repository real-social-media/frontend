import React from 'react'
import LoadingComponent from 'components/Loading'

class LoadingScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => ({
    headerShown: false,
  })

  render() {
    return (
      <>
        <LoadingComponent />
      </>
    )
  }
}

export default LoadingScreen