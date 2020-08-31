import React from 'react'
import ProfileRequestsComponent from 'components/ProfileRequests'
import ProfileRequestsServiceComponent from 'components/ProfileRequests/index.service'

class ProfileRequests extends React.Component {
  render() {
    return (
      <ProfileRequestsServiceComponent>
        {(props) => <ProfileRequestsComponent {...props} />}
      </ProfileRequestsServiceComponent>
    )
  }
}

export default ProfileRequests
