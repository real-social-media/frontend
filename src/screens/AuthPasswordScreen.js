import React from 'react'
import AuthPasswordComponent from 'components/AuthPassword'
import AuthPasswordServiceComponent from 'components/AuthPassword/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

class AuthPasswordScreen extends React.Component {
  render() {
    return (
      <AuthPasswordServiceComponent>{(props) => <AuthPasswordComponent {...props} />}</AuthPasswordServiceComponent>
    )
  }
}

export default ScreenWrapper(AuthPasswordScreen)
