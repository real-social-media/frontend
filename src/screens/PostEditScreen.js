import React from 'react'
import PostEditComponent from 'components/PostEdit'
import PostEditServiceComponent from 'components/PostEdit/index.service'

class PostEditScreen extends React.Component {
  render() {
    return (
      <PostEditServiceComponent>
        {(props) => (
          <PostEditComponent
            {...props}
          />
        )}
      </PostEditServiceComponent>
    )
  }
}

export default PostEditScreen