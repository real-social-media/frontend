import React from 'react'
import AuthSigninEmailComponent from 'components/AuthSigninEmail'
import AuthSigninEmailServiceComponent from 'components/AuthSigninEmail/index.service'

class AuthSigninEmailScreen extends React.Component {
  render() {
    return (
      <AuthSigninEmailServiceComponent>
        {(props) => <AuthSigninEmailComponent {...props} />}
      </AuthSigninEmailServiceComponent>
    )
  }
}

export default AuthSigninEmailScreen
