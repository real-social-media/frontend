import React from 'react'
import PostLikesComponent from 'components/PostLikes'
import PostLikesServiceComponent from 'components/PostLikes/index.service'

class PostLikesScreen extends React.Component {
  render() {
    return (
      <PostLikesServiceComponent>
        {((shareProps) => (
          <PostLikesComponent
            {...shareProps}
          />
        ))}
      </PostLikesServiceComponent>
    )
  }
}

export default PostLikesScreen