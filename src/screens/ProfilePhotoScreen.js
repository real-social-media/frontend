import React from 'react'
import ProfilePhotoComponent from 'components/ProfilePhoto'
import ProfilePhotoServiceComponent from 'components/ProfilePhoto/index.service'

class ProfilePhotoScreen extends React.Component {
  render() {
    return (
      <ProfilePhotoServiceComponent>
        {(props) => (
          <ProfilePhotoComponent
            {...props}
          />
        )}
      </ProfilePhotoServiceComponent>
    )
  }
}

export default ProfilePhotoScreen