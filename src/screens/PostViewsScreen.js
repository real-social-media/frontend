import React from 'react'
import PostViewsComponent from 'components/PostViews'
import PostViewsServiceComponent from 'components/PostViews/index.service'
import UserServiceProvider from 'services/providers/User'

class PostViews extends React.Component {
  render() {
    return (
      <PostViewsServiceComponent>
        {(props) => (
          <UserServiceProvider navigation={this.props.navigation}>
            {((userProps) => (
              <PostViewsComponent
                {...props}
                {...userProps}
              />
            ))}
          </UserServiceProvider>
        )}
      </PostViewsServiceComponent>
    )
  }
}

export default PostViews