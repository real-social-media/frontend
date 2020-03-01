import React from 'react'
import PostsGridSelectComponent from 'components/PostsGridSelect'
import PostsGridSelectServiceComponent from 'components/PostsGridSelect/index.service'

class ProfilePhotoScreen extends React.Component {
  render() {
    return (
      <PostsGridSelectServiceComponent>
        {(props) => (
          <PostsGridSelectComponent {...props} />
        )}
      </PostsGridSelectServiceComponent>
    )
  }
}

export default ProfilePhotoScreen