import React from 'react'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import ProfileSelfServiceComponent from 'components/ProfileSelf/index.service'
import ProfileComponent from 'components/Profile'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import path from 'ramda/src/path'
import UserServiceProvider from 'services/providers/User'

class ProfileSelfScreen extends React.Component {
  render() {
    return (
      <ProfileSelfServiceComponent>
        {(profileProps) => (
          <UserServiceProvider navigation={this.props.navigation}>
            {((userProps) => (
              <React.Fragment>
                <NavigationSecondary
                  title={(
                    path(['data', 'username'])(profileProps.usersGetProfile) ||
                    path(['username'])(profileProps.authUser)
                  )}
                  onNavRightPress={() => {}}
                  rightLabel="$0.00"
                />
                <PostsGridServiceComponent>
                  {(postsProps) => (
                    <ProfileComponent
                      {...profileProps}
                      {...userProps}
                      {...postsProps}
                    />
                  )}
                </PostsGridServiceComponent>
              </React.Fragment>
            ))}
          </UserServiceProvider>
        )}
      </ProfileSelfServiceComponent>
    )
  }
}

export default ProfileSelfScreen