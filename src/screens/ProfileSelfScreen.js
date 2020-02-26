import React from 'react'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import ProfileSelfServiceComponent from 'components/ProfileSelf/index.service'
import ProfileComponent from 'components/Profile'
import UserServiceProvider from 'services/providers/User'

class ProfileSelfScreen extends React.Component {
  render() {
    return (
      <ProfileSelfServiceComponent>
        {(profileProps) => (
          <UserServiceProvider navigation={this.props.navigation}>
            {((userProps) => (
              <PostsGridServiceComponent>
                {(postsProps) => (
                  <ProfileComponent
                    {...profileProps}
                    {...userProps}
                    {...postsProps}
                  />
                )}
              </PostsGridServiceComponent>
            ))}
          </UserServiceProvider>
        )}
      </ProfileSelfServiceComponent>
    )
  }
}

export default ProfileSelfScreen