import React from 'react'
import PostsListComponent from 'components/PostsList'
import PostsListServiceComponent from 'components/PostsList/index.service'
import ContextComponent from 'components/Cache/Context'
import { initializePriorityQueue } from 'store/ducks/cache/service'

const queues = {
  feedImages: initializePriorityQueue(),
  avatarImages: initializePriorityQueue(),
}

class FeedScreen extends React.Component {
  render() {
    return (
      <PostsListServiceComponent>
        {(postsProps) => (
          <ContextComponent.Provider value={queues}>
            <PostsListComponent
              {...postsProps}
            />
          </ContextComponent.Provider>
        )}
      </PostsListServiceComponent>
    )
  }
}

export default FeedScreen