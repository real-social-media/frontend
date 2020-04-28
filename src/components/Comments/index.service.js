import { useRef } from 'react'
import { Keyboard, InteractionManager } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute } from '@react-navigation/native'
import { v4 as uuid } from 'uuid'
import path from 'ramda/src/path'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import * as authSelector from 'store/ducks/auth/selectors'

const CommentsService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postId = path(['params', 'post', 'postId'])(route)
  const postUserId = path(['params', 'post', 'postedBy', 'userId'])(route)
  const user = useSelector(authSelector.authUserSelector)
  const commentsAdd = useSelector(state => state.posts.commentsAdd)
  const commentsDelete = useSelector(state => state.posts.commentsDelete)
  const postsCommentsGet = useSelector(state => state.posts.postsCommentsGet)
  const postsCommentsGetCache = useSelector(state => state.posts.postsCommentsGetCache)

  useEffect(() => {
    dispatch(postsActions.postsCommentsGetRequest({ postId, userId: postUserId }))
  }, [])

  useEffect(() => {
    dispatch(postsActions.postsCommentsGetRequest({ postId, userId: postUserId }))
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))
  }, [commentsAdd.status === 'success'])

  useEffect(() => {
    dispatch(postsActions.postsCommentsGetRequest({ postId, userId: postUserId }))
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))
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
    const commentIds = viewableItems.map(viewable => path(['item', 'commentId'])(viewable))
      .filter(item => item)

    if (!Array.isArray(commentIds) || !commentIds.length) {
      return
    }

    InteractionManager.runAfterInteractions(() => {
      dispatch(postsActions.postsReportCommentViewsRequest({ commentIds }))
    })
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
    postsCommentsGet: postsServices.cachedPostsGet(postsCommentsGet, postsCommentsGetCache, postId),
    post: path(['params', 'post'])(route),
    marginBottom,
    onViewableItemsChangedRef,
    viewabilityConfigRef,
  })
}

export default CommentsService
