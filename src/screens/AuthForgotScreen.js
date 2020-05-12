import React from 'react'
import AuthForgotComponent from 'components/AuthForgot'
import AuthForgotServiceComponent from 'components/AuthForgot/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

class AuthForgotScreen extends React.Component {
  render() {
    return (
      <AuthForgotServiceComponent>
        {(props) => (
          <AuthForgotComponent
            {...props}
          />
        )}
      </AuthForgotServiceComponent>
    )
  }
}

export default ScreenWrapper(AuthForgotScreen)