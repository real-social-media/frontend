import { createSelector } from 'reselect'
import pathOr from 'ramda/src/pathOr'
import themesJson from 'assets/themes.json'
import * as authSelector from 'store/ducks/auth/selectors'
import * as constants from 'store/ducks/themes/constants'

export const getTheme = key => (themesJson.find((theme) => theme.key === key) || {}).theme

export const themeSelector = createSelector(authSelector.authUser, (authUser) => {
  const activeTheme = pathOr(constants.DEFAULT_THEME, ['themeCode'])(authUser)
  return getTheme(activeTheme)
})
