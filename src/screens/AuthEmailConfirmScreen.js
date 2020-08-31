import React from 'react'
import AuthEmailConfirmComponent from 'components/AuthEmailConfirm'
import AuthEmailConfirmServiceComponent from 'components/AuthEmailConfirm/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

class AuthEmailConfirmScreen extends React.Component {
  render() {
    return (
      <AuthEmailConfirmServiceComponent>
        {(props) => <AuthEmailConfirmComponent {...props} />}
      </AuthEmailConfirmServiceComponent>
    )
  }
}

export default ScreenWrapper(AuthEmailConfirmScreen)
