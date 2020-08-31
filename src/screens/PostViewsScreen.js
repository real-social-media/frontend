import React from 'react'
import PostViewsComponent from 'components/PostViews'
import PostViewsServiceComponent from 'components/PostViews/index.service'

class PostViews extends React.Component {
  render() {
    return <PostViewsServiceComponent>{(props) => <PostViewsComponent {...props} />}</PostViewsServiceComponent>
  }
}

export default PostViews
