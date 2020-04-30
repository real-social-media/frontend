import React from 'react'
import AlbumsGridServiceComponent from 'components/AlbumsGrid/index.service'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import ProfileServiceComponent from 'components/Profile/index.service'
import ProfileComponent from 'components/Profile'
import ContextComponent from 'components/Cache/Context'
import { initializePriorityQueue } from 'store/ducks/cache/service'

const queues = {
  feedImages: initializePriorityQueue(),
  albumImages: initializePriorityQueue(),
}

class ProfileScreen extends React.Component {
  render() {
    return (
      <ProfileServiceComponent>
        {(profileProps) => (
          <PostsGridServiceComponent>
            {(postsProps) => (
              <AlbumsGridServiceComponent>
                {(albumsProps) => (
                  <ContextComponent.Provider value={queues}>
                    <ProfileComponent
                      {...profileProps}
                      {...postsProps}
                      {...albumsProps}
                    />
                  </ContextComponent.Provider>
                )}
              </AlbumsGridServiceComponent>
            )}
          </PostsGridServiceComponent>
        )}
      </ProfileServiceComponent>
    )
  }
}

export default ProfileScreen