import { useSelector, useDispatch } from 'react-redux'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersActions from 'store/ducks/users/actions'

const DatingProfileService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const usersSetUserDatingStatus = useSelector(state => state.users.usersSetUserDatingStatus)

  const usersSetUserDatingStatusRequest = () =>
    dispatch(usersActions.usersSetUserDatingStatusRequest({ status: 'ENABLED' }))

  return children({
    user,
    usersSetUserDatingStatus,
    usersSetUserDatingStatusRequest,
  })
}

export default DatingProfileService
