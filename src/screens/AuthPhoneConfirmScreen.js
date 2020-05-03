import React from 'react'
import AuthPhoneConfirmComponent from 'components/AuthPhoneConfirm'
import AuthPhoneConfirmServiceComponent from 'components/AuthPhoneConfirm/index.service'

class AuthPhoneConfirmScreen extends React.Component {
  render() {
    return (
      <AuthPhoneConfirmServiceComponent>
        {(props) => (
          <AuthPhoneConfirmComponent
            {...props}
          />
        )}
      </AuthPhoneConfirmServiceComponent>
    )
  }
}

export default AuthPhoneConfirmScreen