import { useCallback } from 'react'
import { useSelector } from 'react-redux'

const ThemeService = ({ children, themeCode }) => {
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const themeSelector = (activeThemeCode) =>
    (themeFetch.data.find(theme => theme.key === activeThemeCode) || {}).theme

  return children({
    activeTheme: themeSelector(themeCode),
  })
}

export default ThemeService
