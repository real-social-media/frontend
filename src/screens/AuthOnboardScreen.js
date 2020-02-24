import React from 'react'
import AuthNavigationComponent from 'components/NavigationPrimary/Auth'
import FullnameComponent from 'components/Fullname'
import AuthServiceComponent from 'components/Auth/index.service'

class AuthOnboardScreen extends React.Component {
  render() {
    return (
      <AuthServiceComponent>
        {(props) => (
          <FullnameComponent
            {...props}
          />
        )}
      </AuthServiceComponent>
    )
  }
}

export default AuthOnboardScreen