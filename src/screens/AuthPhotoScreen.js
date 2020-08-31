import React from 'react'
import AuthPhotoComponent from 'components/AuthPhoto'
import AuthPhotoServiceComponent from 'components/AuthPhoto/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

class AuthPhotoScreen extends React.Component {
  render() {
    return <AuthPhotoServiceComponent>{(props) => <AuthPhotoComponent {...props} />}</AuthPhotoServiceComponent>
  }
}

export default ScreenWrapper(AuthPhotoScreen)
