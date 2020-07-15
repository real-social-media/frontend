import { createSelector } from 'reselect'
import pathOr from 'ramda/src/pathOr'
import path from 'ramda/src/path'
import * as normalizer from 'normalizer/schemas'

const entities = () => path(['entities'])
const authUser = () => path(['auth', 'user'])
const usersEditProfile = () => path(['users', 'usersEditProfile'])
const usersGetProfileSelf = () => path(['users', 'usersGetProfileSelf'])

export const authUserSelector = createSelector(
  [authUser(), usersEditProfile(), usersGetProfileSelf(), entities()],
  (authUser, usersEditProfile, usersGetProfileSelf, entities) => {
    return normalizer.denormalizeUserGet(authUser, entities)
  }
)

export const authUserIdSelector = createSelector(
  [authUser()],
  (authUser) => {
    return authUser
  }
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
  }
)