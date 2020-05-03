import React from 'react'
import AuthHomeComponent from 'components/AuthHome'
import AuthHomeServiceComponent from 'components/AuthHome/index.service'

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

export default AuthHomeScreen