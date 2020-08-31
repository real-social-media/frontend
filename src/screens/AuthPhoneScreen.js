import React from 'react'
import AuthPhoneComponent from 'components/AuthPhone'
import AuthPhoneServiceComponent from 'components/AuthPhone/index.service'

class AuthPhoneScreen extends React.Component {
  render() {
    return <AuthPhoneServiceComponent>{(props) => <AuthPhoneComponent {...props} />}</AuthPhoneServiceComponent>
  }
}

export default AuthPhoneScreen
