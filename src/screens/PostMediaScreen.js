import React from 'react'
import PostMediaComponent from 'components/PostMedia'
import PostMediaServiceComponent from 'components/PostMedia/index.service'
import PostServiceComponent from 'components/Post/index.service'

class PostMediaScreen extends React.Component {
  render() {
    return (
      <PostServiceComponent>
        {(postProps) => (
          <PostMediaServiceComponent>
            {(postMediaProps) => <PostMediaComponent {...postMediaProps} {...postProps} />}
          </PostMediaServiceComponent>
        )}
      </PostServiceComponent>
    )
  }
}

export default PostMediaScreen
