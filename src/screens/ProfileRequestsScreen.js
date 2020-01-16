import React from 'react'
import { SafeAreaView } from 'react-native'
import ProfileRequestsComponent from 'components/ProfileRequests'
import ProfileRequestsServiceComponent from 'components/ProfileRequests/index.service'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import UserServiceProvider from 'services/providers/User'

class ProfileRequests extends React.Component {
  static navigationOptions = DefaultNavigationComponent
  
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
      </SafeAreaView>
    )
  }
}

export default ProfileRequests