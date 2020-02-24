import React from 'react'
import ProfileFollowerComponent from 'components/ProfileFollower'
import ProfileFollowerServiceComponent from 'components/ProfileFollower/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import UserServiceProvider from 'services/providers/User'

class ProfileFollowed extends React.Component {
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onClosePress={() => this.props.navigation.goBack(null)}
              title={t('Followers')}
            />
          )}
        </Translation>        

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
      </>
    )
  }
}

export default ProfileFollowed