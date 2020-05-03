import React from 'react'
import AuthEmailComponent from 'components/AuthEmail'
import AuthEmailServiceComponent from 'components/AuthEmail/index.service'

class AuthEmailScreen extends React.Component {
  render() {
    return (
      <AuthEmailServiceComponent>
        {(props) => (
          <AuthEmailComponent
            {...props}
          />
        )}
      </AuthEmailServiceComponent>
    )
  }
}

export default AuthEmailScreen