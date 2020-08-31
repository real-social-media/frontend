import React from 'react'
import AuthSigninPhoneComponent from 'components/AuthSigninPhone'
import AuthSigninPhoneServiceComponent from 'components/AuthSigninPhone/index.service'

class AuthSigninPhoneScreen extends React.Component {
  render() {
    return (
      <AuthSigninPhoneServiceComponent>
        {(props) => <AuthSigninPhoneComponent {...props} />}
      </AuthSigninPhoneServiceComponent>
    )
  }
}

export default AuthSigninPhoneScreen
