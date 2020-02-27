import React from 'react'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import ProfileSelfServiceComponent from 'components/ProfileSelf/index.service'
import ProfileComponent from 'components/Profile'

class ProfileSelfScreen extends React.Component {
  render() {
    return (
      <ProfileSelfServiceComponent>
        {(profileProps) => (
          <PostsGridServiceComponent>
            {(postsProps) => (
              <ProfileComponent
                {...profileProps}
                {...postsProps}
              />
            )}
          </PostsGridServiceComponent>
        )}
      </ProfileSelfServiceComponent>
    )
  }
}

export default ProfileSelfScreen