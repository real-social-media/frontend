import React from 'react'
import PostCreateComponent from 'components/PostCreate'
import PostCreateServiceComponent from 'components/PostCreate/index.service'
import PostsPreviewComponent from 'components/PostsPreview/'
import PostsPreviewServiceComponent from 'components/PostsPreview/index.service'

class PostCreateScreen extends React.Component {
  render() {
    return (
      <PostsPreviewServiceComponent>
        {(previewProps) => (
          <PostCreateServiceComponent>
            {(props) => (
              <React.Fragment>
                <PostsPreviewComponent {...previewProps} />
                <PostCreateComponent {...props} {...previewProps} />
              </React.Fragment>
            )}
          </PostCreateServiceComponent>
        )}
      </PostsPreviewServiceComponent>
    )
  }
}

export default PostCreateScreen
