import React from 'react'
import ProfileFollowerComponent from 'components/ProfileFollower'
import ProfileFollowerServiceComponent from 'components/ProfileFollower/index.service'
import UserServiceProvider from 'services/providers/User'

class ProfileFollowed extends React.Component {
  render() {
    return (
      <ProfileFollowerServiceComponent>
        {(props) => (
          <UserServiceProvider navigation={this.props.navigation}>
            {((userProps) => (
              <ProfileFollowerComponent
                {...props}
                {...userProps}
              />
            ))}
          </UserServiceProvider>
        )}
      </ProfileFollowerServiceComponent>
    )
  }
}

export default ProfileFollowed