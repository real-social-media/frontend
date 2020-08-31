import React from 'react'
import ProfileFollowedComponent from 'components/ProfileFollowed'
import ProfileFollowedServiceComponent from 'components/ProfileFollowed/index.service'

class ProfileFollowed extends React.Component {
  render() {
    return (
      <ProfileFollowedServiceComponent>
        {(props) => <ProfileFollowedComponent {...props} />}
      </ProfileFollowedServiceComponent>
    )
  }
}

export default ProfileFollowed
