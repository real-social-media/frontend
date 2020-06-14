import { createSelector } from 'reselect'
import pathOr from 'ramda/src/pathOr'
import path from 'ramda/src/path'
import * as normalizer from 'normalizer/schemas'

const entities = () => path(['entities'])
const authUser = () => path(['auth', 'user'])

export const authUserSelector = createSelector(
  [authUser(), entities()],
  (authUser, entities) => {
    return normalizer.denormalizeUserGet(authUser, entities)
  }
)

export const languageCodeSelector = 
  state => pathOr('', ['auth', 'user', 'languageCode'], state)

export const themeCodeSelector = 
  state => pathOr('black.green', ['auth', 'user', 'themeCode'], state)

export const themeFetchSelector =
  state => pathOr([], ['theme', 'themeFetch', 'data'], state)

export const themeSelector = createSelector(
  themeCodeSelector,
  themeFetchSelector,
  (themeCode, themeFetch) => {
    return (themeFetch.find(theme => theme.key === themeCode) || {}).theme
  }
)