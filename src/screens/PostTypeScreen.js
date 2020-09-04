import React from 'react'
import PostTypeComponent from 'components/PostType'
import PostTypeServiceComponent from 'components/PostType/index.service'

class PostTypeScreen extends React.Component {
  render() {
    return (
      <PostTypeServiceComponent>
        {((shareProps) => (
          <PostTypeComponent
            {...shareProps}
          />
        ))}
      </PostTypeServiceComponent>
    )
  }
}

export default PostTypeScreen