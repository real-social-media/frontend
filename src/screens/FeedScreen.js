import React from 'react'
import PostsListComponent from 'components/PostsList'
import PostsListServiceComponent from 'components/PostsList/index.service'
import StoriesServiceComponent from 'components/Stories/index.service'

class FeedScreen extends React.Component {
  render() {
    return (
      <PostsListServiceComponent>
        {(postsProps) => (
          <StoriesServiceComponent>
            {((storiesProps) => (
              <PostsListComponent
                {...postsProps}
                {...storiesProps}
              />
            ))}
          </StoriesServiceComponent>
        )}
      </PostsListServiceComponent>
    )
  }
}

export default FeedScreen