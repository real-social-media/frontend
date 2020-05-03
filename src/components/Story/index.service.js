import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import { useNavigation, useRoute } from '@react-navigation/native'
import useCounter from 'react-use/lib/useCounter'
import pathOr from 'ramda/src/pathOr'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'

const StoryService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const themes = useSelector(state => state.theme.themeFetch.data)

  const userId = path(['user', 'userId'])(route.params)
  const usersGetFollowedUsersWithStories = path(['usersGetFollowedUsersWithStories'])(route.params)

  const [currentStory, { inc: nextStory, dec: prevStory, reset: resetStory }] = useCounter(0)

  useEffect(() => {
    dispatch(usersActions.usersGetProfileRequest({ userId }))
  }, [])

  const storyRef = useRef(null)
  const currentUserStory = pathOr([], ['data'], usersGetFollowedUsersWithStories).find(user => user.userId === userId)
  const countStories = pathOr(0, ['stories', 'items', 'length'], currentUserStory)
  const userStoryIndex = pathOr([], ['data'], usersGetFollowedUsersWithStories).findIndex(user => user.userId === userId)
  const nextUserStoryPool = pathOr([], ['data', userStoryIndex + 1], usersGetFollowedUsersWithStories)
  const prevUserStoryPool = pathOr([], ['data', userStoryIndex - 1], usersGetFollowedUsersWithStories)

  const onSnapItem = (index) => {
    navigation.setParams({
      user: usersGetFollowedUsersWithStories.data[index]
    })
    resetStory()
  }

  const onNextStory = () => {
    if (currentStory + 1 < countStories) {
      return nextStory()
    }

    if (nextUserStoryPool.length) {
      navigation.setParams({
        user: nextUserStoryPool
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
        user: prevUserStoryPool
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

  return children({
    themes,
    storyRef,
    userId,
    usersGetFollowedUsersWithStories,
    countStories,
    currentStory,
    onNextStory,
    onPrevStory,
    onCloseStory,
    onSnapItem,
  })
}

export default StoryService
