import { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as authActions from 'store/ducks/auth/actions'

const VerificationService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const actionType = path(['params', 'actionType'], route)
  const handleNext = path(['params', 'handleNext'], route)
  const showHeader = path(['params', 'showHeader'], route)

  useEffect(() => {
    if (showHeader) {
      navigation.setOptions({ headerShown: true })
    }
  }, [showHeader])

  const handleClose = navigationActions.navigateBack(navigation)

  const handleBackAction = () => {
    dispatch(usersActions.usersEditProfileIdle({}))
    handleClose()
  }

  const handleHideAction = () => {
    dispatch(usersActions.usersEditProfileIdle({}))
    dispatch(authActions.authCheckIdle({ nextRoute: 'Root' }))
  }

  const handleContinueAction = () => {
    handleClose()
    handleNext()
  }

  return children({
    handleBackAction,
    handleHideAction,
    handleContinueAction,
    handleClose,
    navigation,
    actionType,
  })
}

export default VerificationService
