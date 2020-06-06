import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as chatActions from 'store/ducks/chat/actions'
import { useScrollToTop } from '@react-navigation/native'
import toLower from 'ramda/src/toLower'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersSelector from 'store/ducks/users/selectors'
import * as chatSelector from 'store/ducks/chat/selectors'

const ChatService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const usersSearch = useSelector(usersSelector.usersSearchSelector())
  const chatGetChats = useSelector(chatSelector.chatGetChatsSelector())

  useEffect(() => {
    dispatch(chatActions.chatGetChatsRequest())
  }, [])

  const chatGetChatsRequest = () =>
    dispatch(chatActions.chatGetChatsRequest())

  /**
   * FlatList feed ref, used for scroll to top on tab bar press
   */
  const feedRef = useRef(null)
  useScrollToTop(feedRef)
  
  const usersSearchRequest = ({ searchToken }) => {
    dispatch(usersActions.usersFollowIdle({}))
    dispatch(usersActions.usersUnfollowIdle({}))
    dispatch(usersActions.usersSearchRequest({ searchToken: toLower(searchToken || '') }))
  }

  /**
   * Following two states are tracking values of Search/Form -> searchToken input field
   * we are dynamically rendering components on Search/index based on values below
   * 
   * formFocus is a state of focus/blur events: [searchToken input]
   * formChange is a state of value.length: [searchToken input]
   */
  const [formFocus, handleFormFocus] = useState(false)
  const [formChange, handleFormChange] = useState(false)

  return children({
    feedRef,
    user,
    formFocus,
    formChange,
    handleFormFocus,
    handleFormChange,

    chatGetChats,
    chatGetChatsRequest,
    usersSearch,
    usersSearchRequest,
  })
}

export default ChatService
