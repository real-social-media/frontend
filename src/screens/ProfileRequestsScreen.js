import React from 'react'
import ProfileRequestsComponent from 'components/ProfileRequests'
import ProfileRequestsServiceComponent from 'components/ProfileRequests/index.service'
import UserServiceProvider from 'services/providers/User'

class ProfileRequests extends React.Component {
  render() {
    return (
      <ProfileRequestsServiceComponent>
        {(props) => (
          <UserServiceProvider navigation={this.props.navigation}>
            {((userProps) => (
              <ProfileRequestsComponent
                {...props}
                {...userProps}
              />
            ))}
          </UserServiceProvider>
        )}
      </ProfileRequestsServiceComponent>
    )
  }
}

export default ProfileRequests