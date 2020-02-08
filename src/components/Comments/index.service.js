import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import { withNavigation } from 'react-navigation'
import uuid from 'uuid/v4'
import path from 'ramda/src/path'

const CommentsService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const postId = path(['postId'])(navigation.getParam('post'))
  const commentsAdd = useSelector(state => state.posts.commentsAdd)
  const postsCommentsGet = useSelector(state => state.posts.postsCommentsGet)

  useEffect(() => {
    dispatch(postsActions.postsCommentsGetRequest({ postId }))
  }, [])

  useEffect(() => {
    dispatch(postsActions.postsCommentsGetRequest({ postId }))
  }, [commentsAdd.status === 'success'])

  const commentsAddRequest = ({ text }) => {
    const commentId = uuid()
    dispatch(postsActions.commentsAddRequest({
      commentId,
      postId,
      text,
    }))
  }
  
  return children({
    commentsAdd,
    commentsAddRequest,
    postsCommentsGet,
  })
}

export default withNavigation(CommentsService)
