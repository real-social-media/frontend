import React from 'react'
import SignupConfirmComponent from 'components/SignupConfirm'
import AuthServiceComponent from 'components/Auth/index.service'
import AuthNavigationComponent from 'components/NavigationPrimary/Auth'

class AuthSignupConfirmScreen extends React.Component {
  render() {
    return (
      <AuthServiceComponent>
        {(props) => (
          <SignupConfirmComponent
            {...props}
          />
        )}
      </AuthServiceComponent>
    )
  }
}

export default AuthSignupConfirmScreen