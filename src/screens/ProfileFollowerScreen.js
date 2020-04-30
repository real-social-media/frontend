import React from 'react'
import ProfileFollowerComponent from 'components/ProfileFollower'
import ProfileFollowerServiceComponent from 'components/ProfileFollower/index.service'

class ProfileFollower extends React.Component {
  render() {
    return (
      <ProfileFollowerServiceComponent>
        {(props) => (
          <ProfileFollowerComponent
            {...props}
          />
        )}
      </ProfileFollowerServiceComponent>
    )
  }
}

export default ProfileFollower