import React from 'react'
import AuthHomeComponent from 'components/AuthHome'
import AuthHomeServiceComponent from 'components/AuthHome/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

class AuthHomeScreen extends React.Component {
  render() {
    return (
      <AuthHomeServiceComponent>
        {(props) => (
          <AuthHomeComponent
            {...props}
          />
        )}
      </AuthHomeServiceComponent>
    )
  }
}

export default ScreenWrapper(AuthHomeScreen)