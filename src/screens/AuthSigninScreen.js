import React from 'react'
import AuthSigninComponent from 'components/AuthSignin'
import AuthSigninServiceComponent from 'components/AuthSignin/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

class AuthSigninScreen extends React.Component {
  render() {
    return (
      <AuthSigninServiceComponent>
        {(props) => (
          <AuthSigninComponent
            {...props}
          />
        )}
      </AuthSigninServiceComponent>
    )
  }
}

export default ScreenWrapper(AuthSigninScreen)