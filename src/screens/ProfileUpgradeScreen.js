import React from 'react'
import ProfileUpgradeComponent from 'components/ProfileUpgrade'
import ProfileUpgradeServiceComponent from 'components/ProfileUpgrade/index.service'
import AuthHomeServiceComponent from 'components/AuthHome/index.service'

class ProfileUpgradeScreen extends React.Component {
  render() {
    return (
      <AuthHomeServiceComponent>
        {((authProps) => (
          <ProfileUpgradeServiceComponent>
            {((shareProps) => (
              <ProfileUpgradeComponent
                {...shareProps}
                {...authProps}
              />
            ))}
          </ProfileUpgradeServiceComponent>
        ))}
      </AuthHomeServiceComponent>
    )
  }
}

export default ProfileUpgradeScreen