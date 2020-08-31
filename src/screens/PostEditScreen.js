import React from 'react'
import PostEditComponent from 'components/PostEdit'
import PostEditServiceComponent from 'components/PostEdit/index.service'
import PostsPreviewComponent from 'components/PostsPreview/'
import PostsPreviewServiceComponent from 'components/PostsPreview/index.service'

class PostEditScreen extends React.Component {
  render() {
    return (
      <PostsPreviewServiceComponent>
        {(previewProps) => (
          <PostEditServiceComponent>
            {(props) => (
              <React.Fragment>
                <PostsPreviewComponent {...previewProps} />
                <PostEditComponent {...props} {...previewProps} />
              </React.Fragment>
            )}
          </PostEditServiceComponent>
        )}
      </PostsPreviewServiceComponent>
    )
  }
}

export default PostEditScreen
