import React from 'react'
import AuthCognitoComponent from 'components/AuthCognito'
import AuthCognitoServiceComponent from 'components/AuthCognito/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

class AuthCognitoScreen extends React.Component {
  render() {
    return (
      <AuthCognitoServiceComponent>
        {(props) => (
          <AuthCognitoComponent
            {...props}
          />
        )}
      </AuthCognitoServiceComponent>
    )
  }
}

export default ScreenWrapper(AuthCognitoScreen)