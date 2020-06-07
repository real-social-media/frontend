import React from 'react'
import FeedComponent from 'components/Feed'
import FeedServiceComponent from 'components/Feed/index.service'
import ContextComponent from 'components/Cache/Context'
import { initializePriorityQueue } from 'store/ducks/cache/service'

const queues = {
  feedImages: initializePriorityQueue(),
  avatarImages: initializePriorityQueue(),
}

class FeedScreen extends React.Component {
  render() {
    return (
      <FeedServiceComponent>
        {(postsProps) => (
          <ContextComponent.Provider value={queues}>
            <FeedComponent
              {...postsProps}
            />
          </ContextComponent.Provider>
        )}
      </FeedServiceComponent>
    )
  }
}

export default FeedScreen