import React from 'react'
import ForgotConfirmComponent from 'components/ForgotConfirm'
import AuthServiceComponent from 'components/Auth/index.service'
import AuthNavigationComponent from 'components/NavigationPrimary/Auth'

class AuthForgotConfirmScreen extends React.Component {
  render() {
    return (
      <AuthServiceComponent>
        {(props) => (
          <ForgotConfirmComponent
            {...props}
          />
        )}
      </AuthServiceComponent>
    )
  }
}

export default AuthForgotConfirmScreen