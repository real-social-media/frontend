import React from 'react'
import ProfilePhotoGridComponent from 'components/ProfilePhotoGrid'
import ProfilePhotoGridServiceComponent from 'components/ProfilePhotoGrid/index.service'

class ProfilePhotoGridScreen extends React.Component {
  render() {
    return (
      <ProfilePhotoGridServiceComponent>
        {(props) => (
          <ProfilePhotoGridComponent {...props} />
        )}
      </ProfilePhotoGridServiceComponent>
    )
  }
}

export default ProfilePhotoGridScreen