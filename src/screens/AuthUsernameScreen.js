import React from 'react'
import AuthUsernameComponent from 'components/AuthUsername'
import AuthUsernameServiceComponent from 'components/AuthUsername/index.service'

class AuthUsernameScreen extends React.Component {
  render() {
    return (
      <AuthUsernameServiceComponent>
        {(props) => (
          <AuthUsernameComponent
            {...props}
          />
        )}
      </AuthUsernameServiceComponent>
    )
  }
}

export default AuthUsernameScreen