import React from 'react'
import PostShareServiceComponent from 'components/PostShare/index.service'
import PostShareComponent from 'components/PostShare'

class PostShareScreen extends React.Component {
  render() {
    return (
      <>
        <PostShareServiceComponent>{(shareProps) => <PostShareComponent {...shareProps} />}</PostShareServiceComponent>
      </>
    )
  }
}

export default PostShareScreen
