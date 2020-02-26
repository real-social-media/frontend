import React from 'react'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import ProfileServiceComponent from 'components/Profile/index.service'
import ProfileComponent from 'components/Profile'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import path from 'ramda/src/path'
import { Provider as PaperProvider } from 'react-native-paper'
import UserServiceProvider from 'services/providers/User'
import * as navigationActions from 'navigation/actions'

class ProfileScreen extends React.Component {
  render() {
    return (
      <ProfileServiceComponent>
        {(profileProps) => (
          <UserServiceProvider>
            {((userProps) => (
              <PaperProvider theme={this.props.route.params.theme}>
                <PostsGridServiceComponent>
                  {(postsProps) => (
                    <ProfileComponent
                      {...profileProps}
                      {...postsProps}
                      {...userProps}
                    />
                  )}
                </PostsGridServiceComponent>
              </PaperProvider>
            ))}
          </UserServiceProvider>
        )}
      </ProfileServiceComponent>
    )
  }
}

export default ProfileScreen