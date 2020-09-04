import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as postsActions from 'store/ducks/posts/actions'
import { useNavigation, useRoute } from '@react-navigation/native'
import useCounter from 'react-use/lib/useCounter'
import pathOr from 'ramda/src/pathOr'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'

const StoryService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const userId = path(['user', 'userId'])(route.params)
  const stories = pathOr([], ['usersGetFollowedUsersWithStories', 'data'])(route.params)
    .sort((prev) => (prev.viewedStatus === 'VIEWED') ? 1 : -1)

  const [currentStory, { inc: nextStory, dec: prevStory, reset: resetStory }] = useCounter(0)

  useEffect(() => {
    dispatch(usersActions.usersGetProfileRequest({ userId }))
  }, [])

  const storyRef = useRef(null)
  const currentUserStory = stories.find(user => user.userId === userId)
  const countStories = pathOr(0, ['stories', 'items', 'length'], currentUserStory)
  const userStoryIndex = stories.findIndex(user => user.userId === userId)
  const nextUserStoryPool = pathOr([], [userStoryIndex + 1], stories)
  const prevUserStoryPool = pathOr([], [userStoryIndex - 1], stories)

  const postsShareRequest = (payload) =>
    dispatch(postsActions.postsShareRequest(payload))

  const postsOnymouslyLikeRequest = (payload) =>
    dispatch(postsActions.postsOnymouslyLikeRequest(payload))

  const postsDislikeRequest = (payload) =>
    dispatch(postsActions.postsDislikeRequest(payload))

  const onSnapItem = (index) => {
    navigation.setParams({
      user: stories[index],
    })
    resetStory()
  }

  const onNextStory = () => {
    if (currentStory + 1 < countStories) {
      return nextStory()
    }

    if (nextUserStoryPool.length) {
      navigation.setParams({
        user: nextUserStoryPool,
      })
      resetStory()
      storyRef.current.snapToNext()
    } else {
      resetStory()
      navigationActions.navigateBack(navigation)()
    }
  }
    
  const onPrevStory = () => {
    if (currentStory > 0) {
      return prevStory()
    }
    
    if (prevUserStoryPool.length) {
      navigation.setParams({
        user: prevUserStoryPool,
      })
      resetStory()
      storyRef.current.snapToPrev()
    } else {
      resetStory()
      navigationActions.navigateBack(navigation)()
    }
  }

  const onCloseStory = () => {
    resetStory()
    navigationActions.navigateBack(navigation)()
  }

  /**
   *
   */
  const textPostRefs = useRef({})
  const createTextPostRef = post => element => {
    if (!textPostRefs.current[post.postId]) {
      textPostRefs.current[post.postId] = element
    }
  }

  const getTextPostRef = post => textPostRefs.current[post.postId]


  return children({
    storyRef,
    userId,
    stories,
    countStories,
    currentStory,
    onNextStory,
    onPrevStory,
    onCloseStory,
    onSnapItem,
    postsShareRequest,
    postsOnymouslyLikeRequest,
    postsDislikeRequest,

    textPostRefs,
    createTextPostRef,
    getTextPostRef,
  })
}

export default StoryService
