import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as appActions from 'store/ducks/app/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'

const ThemeService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const appThemePreview = useSelector(state => state.app.appThemePreview)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)

  const appThemePreviewRequest = (payload) =>
    dispatch(appActions.appThemePreviewRequest(payload))

  const appThemePreviewIdle = () =>
    dispatch(appActions.appThemePreviewIdle({}))

  const usersEditProfileRequest = () =>
    dispatch(usersActions.usersEditProfileRequest({ themeCode: appThemePreview.data.name }))
  
  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle({}))
    }
  }, [usersEditProfile.status])

  return children({
    user,
    usersEditProfileRequest,
    appThemePreview,
    appThemePreviewRequest,
    appThemePreviewIdle,
  })
}

export default ThemeService
