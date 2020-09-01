import { createSelector } from 'reselect'
import pathOr from 'ramda/src/pathOr'
import path from 'ramda/src/path'
import is from 'ramda/src/is'
import * as normalizer from 'normalizer/schemas'

const entities = () => path(['entities'])
const authUser = () => path(['auth', 'user'])
const usersEditProfile = () => path(['users', 'usersEditProfile'])
const usersGetProfileSelf = () => path(['users', 'usersGetProfileSelf'])
const usersDeleteAvatar = path(['users', 'usersDeleteAvatar'])

export const authUserSelector = createSelector(
  [authUser(), usersEditProfile(), usersGetProfileSelf(), usersDeleteAvatar, entities()],
  (authUser, usersEditProfile, usersGetProfileSelf, usersDeleteAvatar, entities) => {
    return normalizer.denormalizeUserGet(authUser, entities)
  },
)

export const authUserIdSelector = createSelector(
  [authUser()],
  (authUser) => {
    return is(String, authUser) && authUser
  },
)

export const languageCodeSelector = 
  state => pathOr('', ['auth', 'user', 'languageCode'], state)

export const themeCodeSelector = 
  state => pathOr('black.green', ['auth', 'user', 'themeCode'], state)

export const themeFetchSelector =
  state => pathOr([], ['theme', 'themeFetch', 'data'], state)

export const themeSelector = createSelector(
  authUserSelector,
  themeFetchSelector,
  (authUser, themeFetch) => {
    const activeTheme = (authUser.themeCode || 'black.green')
    return (themeFetch.find(theme => theme.key === activeTheme) || {}).theme
  },
)