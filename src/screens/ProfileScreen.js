import React from 'react'
import AlbumsGridServiceComponent from 'components/AlbumsGrid/index.service'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import ProfileServiceComponent from 'components/Profile/index.service'
import ProfileComponent from 'components/Profile'

class ProfileScreen extends React.Component {
  render() {
    return (
      <ProfileServiceComponent>
        {(profileProps) => (
          <PostsGridServiceComponent>
            {(postsProps) => (
              <AlbumsGridServiceComponent>
                {(albumsProps) => <ProfileComponent {...profileProps} {...postsProps} {...albumsProps} />}
              </AlbumsGridServiceComponent>
            )}
          </PostsGridServiceComponent>
        )}
      </ProfileServiceComponent>
    )
  }
}

export default ProfileScreen
