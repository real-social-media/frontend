import React from 'react'
import ProfileEditComponent from 'components/ProfileEdit'
import ProfileEditServiceComponent from 'components/ProfileEdit/index.service'
import PrivacyServiceComponent from 'components/Privacy/index.service'

class ProfileScreen extends React.Component {
  render() {
    return (
      <ProfileEditServiceComponent>
        {(profileEditProps) => (
          <PrivacyServiceComponent>
            {(privacyProps) => (
              <ProfileEditComponent
                {...profileEditProps}
                {...privacyProps}
              />
            )}
          </PrivacyServiceComponent>
        )}
      </ProfileEditServiceComponent>
    )
  }
}

export default ProfileScreen