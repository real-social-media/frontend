import React from 'react'
import ProfilePhotoUploadComponent from 'components/ProfilePhotoUpload'
import ProfilePhotoUploadServiceComponent from 'components/ProfilePhotoUpload/index.service'

class ProfilePhotoUploadScreen extends React.Component {
  render() {
    return (
      <ProfilePhotoUploadServiceComponent>
        {(props) => (
          <ProfilePhotoUploadComponent {...props} />
        )}
      </ProfilePhotoUploadServiceComponent>
    )
  }
}

export default ProfilePhotoUploadScreen