import { useState } from 'react'
import path from 'ramda/src/path'
import { Platform } from 'react-native'

const PostsPreviewService = ({ children }) => {
  const [selectedPost, setSelectedPost] = useState([])
  const handlePostPress = (post) => {
    setSelectedPost([{
      url: Platform.select({
        ios: path(['image', 'url4k'])(post),
        android: `file://${path(['image', 'url4k'])(post)}`,
      }),
    }])
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
