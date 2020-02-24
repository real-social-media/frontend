import React from 'react'
import ProfileEditComponent from 'components/ProfileEdit'
import ProfileEditServiceComponent from 'components/ProfileEdit/index.service'
import PrivacyServiceComponent from 'components/Privacy/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class ProfileScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onNavLeftPress={() => this.props.navigation.goBack(null)}
              title={t('Edit Profile')}
            />
          )}
        </Translation>        

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
      </React.Fragment>
    )
  }
}

export default ProfileScreen