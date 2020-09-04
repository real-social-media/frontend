import React from 'react'
import VerificationComponent from 'components/Verification'
import VerificationServiceComponent from 'components/Verification/index.service'

class VerificationScreen extends React.Component {
  render() {
    return (
      <VerificationServiceComponent>
        {((shareProps) => (
          <VerificationComponent
            {...shareProps}
          />
        ))}
      </VerificationServiceComponent>
    )
  }
}

export default VerificationScreen