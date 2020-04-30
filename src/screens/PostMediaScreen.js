import React from 'react'
import PostMediaComponent from 'components/PostMedia'
import PostMediaServiceComponent from 'components/PostMedia/index.service'
import PostServiceComponent from 'components/Post/index.service'
import ContextComponent from 'components/Cache/Context'
import { initializePriorityQueue } from 'store/ducks/cache/service'

const queues = {
  mediaImages: initializePriorityQueue(),
}

const priorityQueueInstance = initializePriorityQueue()

class PostMediaScreen extends React.Component {
  render() {
    return (
      <PostServiceComponent>
        {(postProps) => (
          <PostMediaServiceComponent {...postProps}>
            {(postsProps) => (
              <ContextComponent.Provider value={queues}>
                <PostMediaComponent
                  {...postsProps}
                  priorityQueueInstance={priorityQueueInstance}
                />
              </ContextComponent.Provider>
            )}
          </PostMediaServiceComponent>
        )}
      </PostServiceComponent>
    )
  }
}

export default PostMediaScreen