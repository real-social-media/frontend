import React from 'react'
import AuthForgotPhoneComponent from 'components/AuthForgotPhone'
import AuthForgotPhoneServiceComponent from 'components/AuthForgotPhone/index.service'

class AuthForgotPhoneScreen extends React.Component {
  render() {
    return (
      <AuthForgotPhoneServiceComponent>
        {(props) => <AuthForgotPhoneComponent {...props} />}
      </AuthForgotPhoneServiceComponent>
    )
  }
}

export default AuthForgotPhoneScreen
