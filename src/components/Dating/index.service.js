import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as datingActions from 'store/ducks/dating/actions'
import * as datingSelector from 'store/ducks/dating/selectors'
import path from 'ramda/src/path'
import withDatingEnabledValidation from 'components/Dating/Permission'

const DatingService = ({ children }) => {
  const dispatch = useDispatch()
  const datingMatchedUsers = useSelector(datingSelector.datingMatchedUsersSelector())

  useEffect(() => {
    dispatch(datingActions.datingMatchedUsersRequest({ matchStatus: 'POTENTIAL' }))
  }, [])
  
  const datingMatchedUsersRequest = () =>
    dispatch(datingActions.datingMatchedUsersRequest({ matchStatus: 'POTENTIAL' }))

  const datingMatchedUsersIdle = () =>
    dispatch(datingActions.datingMatchedUsersIdle({}))

  const handleSwipedLeft = (index) => {
    const swipedUserId = path(['data', index, 'userId'], datingMatchedUsers)
    dispatch(datingActions.datingMatchRejectRequest({ userId: swipedUserId }))
  }

  const handleSwipedRight = (index) => {
    const swipedUserId = path(['data', index, 'userId'], datingMatchedUsers)
    dispatch(datingActions.datingMatchApproveRequest({ userId: swipedUserId }))
  }

  return children({
    datingMatchedUsersRequest,
    datingMatchedUsersIdle,
    datingMatchedUsers,
    handleSwipedLeft,
    handleSwipedRight,
  })
}

export default withDatingEnabledValidation(DatingService)
