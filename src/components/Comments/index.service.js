import { useRef } from 'react'
import { Keyboard, InteractionManager } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import { useNavigation, useRoute } from '@react-navigation/native'
import { v4 as uuid } from 'uuid'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsSelector from 'store/ducks/posts/selectors'

const CommentsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postId = route.params.postId
  const postUserId = route.params.userId
  const user = useSelector(authSelector.authUserSelector)
  const commentsAdd = useSelector(state => state.posts.commentsAdd)
  const commentsDelete = useSelector(state => state.posts.commentsDelete)
  const postsCommentsGet = useSelector(postsSelector.postsCommentsGetSelector(postId))
  const postsSingleGet = useSelector(postsSelector.postsSingleGetSelector(postId))

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))
    dispatch(postsActions.postsCommentsGetRequest({ postId, userId: postUserId }))
    dispatch(postsActions.postsReportPostViewsRequest({ postIds: [postId] }))

  }, [])

  useEffect(() => {
    dispatch(postsActions.postsCommentsGetRequest({ postId, userId: postUserId }))
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))
    dispatch(postsActions.commentsAddIdle({}))
  }, [commentsAdd.status === 'success'])

  useEffect(() => {
    dispatch(postsActions.postsCommentsGetRequest({ postId, userId: postUserId }))
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))
    dispatch(postsActions.commentsDeleteIdle({}))
  }, [commentsDelete.status === 'success'])

  const commentsAddRequest = ({ text }) => {
    const commentId = uuid()
    dispatch(postsActions.commentsAddRequest({
      commentId,
      postId,
      text,
    }))
  }

  const commentsDeleteRequest = (payload) =>
    dispatch(postsActions.commentsDeleteRequest(payload))

  /**
   * Keyboard movement calculator 
   */
  const [offset, setOffset] = useState(0)

  const keyboardWillShow = (event) => {
    setOffset(event.endCoordinates.height - ifIphoneX(40, 0) + 12)
  }

  const keyboardWillHide = (event) => {
    setOffset(0)
  }

  useEffect(() => {
    const keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', keyboardWillShow)
    const keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', keyboardWillHide)

    return () => {
      keyboardWillShowSub.remove()
      keyboardWillHideSub.remove()
    }
  }, [])

  const marginBottom = offset + ifIphoneX(40, 0)
  
  const onViewableItemsChanged = ({ viewableItems }) => {
  }

  /**
   * FlatList feed config ref, used for reporting scroll events
   */
  const onViewableItemsChangedRef = useRef(onViewableItemsChanged)
  const viewabilityConfigRef = useRef({
    minimumViewTime: 300,
    viewAreaCoveragePercentThreshold: 5,
    waitForInteraction: false,
  })

  return children({
    user,
    commentsAdd,
    commentsAddRequest,
    commentsDeleteRequest,
    postsCommentsGet,
    postsSingleGet,
    marginBottom,
    onViewableItemsChangedRef,
    viewabilityConfigRef,
  })
}

export default CommentsService
