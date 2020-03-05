import React from 'react'
import AlbumsGridServiceComponent from 'components/AlbumsGrid/index.service'
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
              <AlbumsGridServiceComponent>
                {(albumsProps) => (
                  <ProfileComponent
                    {...profileProps}
                    {...postsProps}
                    {...albumsProps}
                  />
                )}
              </AlbumsGridServiceComponent>
            )}
          </PostsGridServiceComponent>
        )}
      </ProfileSelfServiceComponent>
    )
  }
}

export default ProfileSelfScreen