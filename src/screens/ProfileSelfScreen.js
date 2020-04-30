import React from 'react'
import AlbumsGridServiceComponent from 'components/AlbumsGrid/index.service'
import PostsGridServiceComponent from 'components/PostsGrid/index.service'
import ProfileSelfServiceComponent from 'components/ProfileSelf/index.service'
import ProfileComponent from 'components/Profile'
import ContextComponent from 'components/Cache/Context'
import { initializePriorityQueue } from 'store/ducks/cache/service'

const queues = {
  feedImages: initializePriorityQueue(),
  albumImages: initializePriorityQueue(),
}

class ProfileSelfScreen extends React.Component {
  render() {
    return (
      <ProfileSelfServiceComponent>
        {(profileProps) => (
          <PostsGridServiceComponent>
            {(postsProps) => (
              <AlbumsGridServiceComponent>
                {(albumsProps) => (
                  <ContextComponent.Provider value={queues}>
                    <ProfileComponent
                      {...postsProps}
                      {...albumsProps}
                      {...profileProps}
                    />
                  </ContextComponent.Provider>
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