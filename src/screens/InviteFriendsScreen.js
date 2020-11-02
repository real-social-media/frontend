import React from 'react'
import InviteFriendsComponent from 'components/InviteFriends'
import InviteFriendsServiceComponent from 'components/InviteFriends/index.service'

class InviteFriendsScreen extends React.Component {
  render() {
    return (
      <InviteFriendsServiceComponent>
        {(props) => (
          <InviteFriendsComponent
            {...props}
          />
        )}
      </InviteFriendsServiceComponent>
    )
  }
}

export default InviteFriendsScreen