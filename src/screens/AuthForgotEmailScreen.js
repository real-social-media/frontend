import React from 'react'
import AuthForgotEmailComponent from 'components/AuthForgotEmail'
import AuthForgotEmailServiceComponent from 'components/AuthForgotEmail/index.service'

class AuthForgotEmailScreen extends React.Component {
  render() {
    return (
      <AuthForgotEmailServiceComponent>
        {(props) => (
          <AuthForgotEmailComponent
            {...props}
          />
        )}
      </AuthForgotEmailServiceComponent>
    )
  }
}

export default AuthForgotEmailScreen