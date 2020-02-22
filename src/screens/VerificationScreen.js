import React from 'react'
import VerificationComponent from 'components/Verification'
import VerificationServiceComponent from 'components/Verification/index.service'

class VerificationScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => ({
    headerShown: false,
  })
  
  render() {
    return (
      <>
        <VerificationServiceComponent>
          {((shareProps) => (
            <VerificationComponent
              {...shareProps}
            />
          ))}
        </VerificationServiceComponent>
      </>
    )
  }
}

export default VerificationScreen