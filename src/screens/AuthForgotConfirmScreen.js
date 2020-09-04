import React from 'react'
import AuthForgotConfirmComponent from 'components/AuthForgotConfirm'
import AuthForgotConfirmServiceComponent from 'components/AuthForgotConfirm/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

class AuthForgotConfirmScreen extends React.Component {
  render() {
    return (
      <AuthForgotConfirmServiceComponent>
        {(props) => (
          <AuthForgotConfirmComponent
            {...props}
          />
        )}
      </AuthForgotConfirmServiceComponent>
    )
  }
}

export default ScreenWrapper(AuthForgotConfirmScreen)