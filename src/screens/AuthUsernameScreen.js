import React from 'react'
import AuthUsernameComponent from 'components/AuthUsername'
import AuthUsernameServiceComponent from 'components/AuthUsername/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

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

export default ScreenWrapper(AuthUsernameScreen)