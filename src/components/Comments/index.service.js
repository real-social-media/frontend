import { useRef } from 'react'
import { Keyboard } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import { useRoute } from '@react-navigation/native'
import { v4 as uuid } from 'uuid'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsSelector from 'store/ducks/posts/selectors'
import useViewable from 'services/providers/Viewable'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import pathOr from 'ramda/src/pathOr'

const CommentsService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute()
  const postId = route.params.postId
  const postUserId = route.params.userId
  const actionId = route.params.actionId
  const user = useSelector(authSelector.authUserSelector)
  const commentsAdd = useSelector(state => state.posts.commentsAdd)
  const commentsDelete = useSelector(state => state.posts.commentsDelete)
  const commentsFlag = useSelector(state => state.posts.commentsFlag)
  const postsCommentsGet = useSelector(postsSelector.postsCommentsGetSelector(postId))
  const postsSingleGet = useSelector(postsSelector.postsSingleGetSelector(postId))

  const commentsRef = useRef()

  useEffect(() => {
    const commentIndex = postsCommentsGet.data.findIndex(item => item.commentId === actionId)
    if (postsCommentsGet.status === 'success' && commentIndex !== -1) {
      commentsRef.current.scrollToIndex({ animated: false, index: commentIndex })
    }
  }, [postsCommentsGet.status])

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))
    dispatch(postsActions.postsCommentsGetRequest({ postId, userId: postUserId }))
    dispatch(postsActions.postsReportPostViewsRequest({ postIds: [postId], viewType: 'THUMBNAIL' }))
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

  useEffect(() => {
    dispatch(postsActions.postsCommentsGetRequest({ postId, userId: postUserId }))
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))
    dispatch(postsActions.commentsFlagIdle({}))
  }, [commentsFlag.status === 'success'])

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

  const commentsFlagRequest = (payload) =>
    dispatch(postsActions.commentsFlagRequest(payload))

  /**
   * Keyboard movement calculator 
   */
  const [offset, setOffset] = useState(0)

  const keyboardWillShow = (event) => {
    setOffset(event.endCoordinates.height - ifIphoneX(40, 0) + 12)
  }

  const keyboardWillHide = () => {
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
  
  

  /**
   * FlatList feed config ref, used for reporting scroll events
   */
  const { onViewableItemsThumbnailsRef } = useViewable()
  const viewabilityConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 5,
    waitForInteraction: false,
  })

  /**
   *
   */
  const inputRefs = useRef({
    text: useRef(null),
  })

  const [replyUser, setReplyUser] = useState(null)
  const handleUserReply = (username) => {
    setReplyUser(`@${username} `)
    if (inputRefs.current.text.current) {
      inputRefs.current.text.current.focus()
    }
  }

  const handleFormSubmit = (values, { resetForm }) => {
    commentsAddRequest(values)
    resetForm()
    Keyboard.dismiss()
  }

  const formSubmitLoading = commentsAdd.status === 'loading'
  const formSubmitDisabled = commentsAdd.status === 'loading'
  const formErrorMessage = commentsAdd.error.text

  const formInitialValues = {
    text: replyUser,
  }

  const handleFormTransform = (values) => ({
    text: compose(trim, pathOr('', ['text']))(values),
  })

  const handleErrorClose = () => dispatch(postsActions.commentsAddIdle({}))


  

  return children({
    user,
    commentsAdd,
    commentsAddRequest,
    commentsDeleteRequest,
    commentsFlagRequest,
    postsCommentsGet,
    postsSingleGet,
    marginBottom,
    onViewableItemsThumbnailsRef,
    viewabilityConfigRef,
    handleUserReply,
    commentsRef,

    formErrorMessage,
    handleFormSubmit,
    handleFormTransform,
    handleErrorClose,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
    inputRefs,
  })
}

export default CommentsService
