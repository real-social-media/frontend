import React from 'react'
import ProfileFollowedComponent from 'components/ProfileFollowed'
import ProfileFollowedServiceComponent from 'components/ProfileFollowed/index.service'
import UserServiceProvider from 'services/providers/User'

class ProfileFollowed extends React.Component {
  render() {
    return (
      <ProfileFollowedServiceComponent>
        {(props) => (
          <UserServiceProvider navigation={this.props.navigation}>
            {((userProps) => (
              <ProfileFollowedComponent
                {...props}
                {...userProps}
              />
            ))}
          </UserServiceProvider>
        )}
      </ProfileFollowedServiceComponent>
    )
  }
}

export default ProfileFollowed