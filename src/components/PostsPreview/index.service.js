import { useState } from 'react'
import path from 'ramda/src/path'

const PostsPreviewService = ({ children }) => {
  const [selectedPost, setSelectedPost] = useState([])
  const handlePostPress = (post) => {
    setSelectedPost([
      {
        url: path(['image', 'url4k'])(post),
      },
    ])
  }

  const handlePostClose = () => {
    setSelectedPost([])
  }

  return children({
    selectedPost,
    handlePostPress,
    handlePostClose,
  })
}

export default PostsPreviewService
