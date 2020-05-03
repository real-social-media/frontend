import React from 'react'
import AuthPasswordComponent from 'components/AuthPassword'
import AuthPasswordServiceComponent from 'components/AuthPassword/index.service'

class AuthPasswordScreen extends React.Component {
  render() {
    return (
      <AuthPasswordServiceComponent>
        {(props) => (
          <AuthPasswordComponent
            {...props}
          />
        )}
      </AuthPasswordServiceComponent>
    )
  }
}

export default AuthPasswordScreen