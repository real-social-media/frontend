import React from 'react'
import PostsListComponent from 'components/PostsList'
import PostsListServiceComponent from 'components/PostsList/index.service'
import StoriesServiceComponent from 'components/Stories/index.service'
import UserServiceProvider from 'services/providers/User'

class FeedScreen extends React.Component {
  render() {
    return (
      <PostsListServiceComponent>
        {(postsProps) => (
          <StoriesServiceComponent>
            {((storiesProps) => (
              <UserServiceProvider navigation={this.props.navigation}>
                {((userProps) => (
                  <PostsListComponent
                    {...postsProps}
                    {...storiesProps}
                    {...userProps}
                  />
                ))}
              </UserServiceProvider>
            ))}
          </StoriesServiceComponent>
        )}
      </PostsListServiceComponent>
    )
  }
}

export default FeedScreen