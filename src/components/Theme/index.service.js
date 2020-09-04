import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as themeActions from 'store/ducks/theme/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'

const ThemeService = ({ children }) => {
  const dispatch = useDispatch()
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const user = useSelector(authSelector.authUserSelector)
  const themePreview = useSelector(state => state.theme.themePreview)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)

  const themePreviewRequest = (payload) =>
    dispatch(themeActions.themePreviewRequest(payload))

  const themePreviewIdle = () =>
    dispatch(themeActions.themePreviewIdle({}))

  const usersEditProfileRequest = () =>
    dispatch(usersActions.usersEditProfileRequest({ themeCode: themePreview.data.name }))
  
  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle({}))
    }
  }, [usersEditProfile.status])

  return children({
    themeFetch,
    user,
    usersEditProfileRequest,
    themePreview,
    themePreviewRequest,
    themePreviewIdle,
  })
}

export default ThemeService
