import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import toLower from 'ramda/src/toLower'

const OnboardNameService = ({ children }) => {
  const dispatch = useDispatch()
  const authCheck = useSelector(state => state.auth.authCheck)
  const authOnboard = useSelector(state => state.auth.authOnboard)

  const authOnboardRequest = (payload) =>
    dispatch(authActions.authOnboardRequest({
      username: toLower(payload.username),
      fullName: payload.fullName,
    }))

  const authOnboardIdle = () =>
    dispatch(authActions.authOnboardIdle())

  const authSignoutRequest = (payload) =>
    dispatch(authActions.authSignoutRequest(payload))

  useEffect(() => {
    if (authOnboard.status === 'success') {
      dispatch(authActions.authSignupIdle())
      dispatch(authActions.authSigninIdle())
      dispatch(authActions.authSignupConfirmIdle())
      dispatch(authActions.authCheckIdle({ nextRoute: 'OnboardPhoto' }))
    }
  }, [
    authOnboard.status,
  ])

  return children({
    authCheck,
    authOnboard,
    authOnboardRequest,
    authOnboardIdle,
    authSignoutRequest,
  })
}

export default OnboardNameService
