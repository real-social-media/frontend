import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authSelector from 'store/ducks/auth/selectors'
import * as themesActions from 'store/ducks/themes/actions'

const ThemeService = ({ children }) => {
  const dispatch = useDispatch()
  const [appThemePreview, setAppThemePreview] = useState(null)
  const user = useSelector(authSelector.authUser)

  const appThemePreviewRequest = (payload) => setAppThemePreview(payload)
  const appThemePreviewIdle = () => setAppThemePreview(null)

  const appThemePreviewUpdate = (themeCode) => {
    dispatch(themesActions.themesEditRequest({ themeCode }))
    appThemePreviewIdle()
  }

  return children({
    user,
    appThemePreview,
    appThemePreviewUpdate,
    appThemePreviewRequest,
    appThemePreviewIdle,
  })
}

export default ThemeService
