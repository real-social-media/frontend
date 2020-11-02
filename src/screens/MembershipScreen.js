import React from 'react'
import MembershipComponent from 'components/Membership'
import MembershipServiceComponent from 'components/Membership/index.service'

class MembershipScreen extends React.Component {
  render() {
    return (
			<MembershipServiceComponent>
        {(membershipProps) => (
					<MembershipComponent {...membershipProps} />
				)}
			</MembershipServiceComponent>
    )
  }
}

export default MembershipScreen