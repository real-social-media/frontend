import React from 'react'
import AuthPhoneConfirmComponent from 'components/AuthPhoneConfirm'
import AuthPhoneConfirmServiceComponent from 'components/AuthPhoneConfirm/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

class AuthPhoneConfirmScreen extends React.Component {
  render() {
    return (
      <AuthPhoneConfirmServiceComponent>
        {(props) => (
          <AuthPhoneConfirmComponent
            {...props}
          />
        )}
      </AuthPhoneConfirmServiceComponent>
    )
  }
}

export default ScreenWrapper(AuthPhoneConfirmScreen)