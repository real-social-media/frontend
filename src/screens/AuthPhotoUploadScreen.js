import React from 'react'
import AuthPhotoUploadComponent from 'components/AuthPhotoUpload'
import AuthPhotoUploadServiceComponent from 'components/AuthPhotoUpload/index.service'
import ScreenWrapper from 'templates/Auth/ScreenWrapper'

class AuthPhotoUploadScreen extends React.Component {
  render() {
    return (
      <AuthPhotoUploadServiceComponent>
        {(props) => <AuthPhotoUploadComponent {...props} />}
      </AuthPhotoUploadServiceComponent>
    )
  }
}

export default ScreenWrapper(AuthPhotoUploadScreen)
