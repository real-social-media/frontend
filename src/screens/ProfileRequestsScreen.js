import React from 'react'
import ProfileRequestsComponent from 'components/ProfileRequests'
import ProfileRequestsServiceComponent from 'components/ProfileRequests/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import UserServiceProvider from 'services/providers/User'

class ProfileRequests extends React.Component {
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onClosePress={() => this.props.navigation.goBack(null)}
              title={t('Pending Requests')}
            />
          )}
        </Translation>        

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
      </>
    )
  }
}

export default ProfileRequests