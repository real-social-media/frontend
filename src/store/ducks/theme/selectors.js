import { createSelector } from 'reselect'
import pathOr from 'ramda/src/pathOr'

export const themeCodeSelector = (state) => pathOr('black.green', ['auth', 'user', 'themeCode'], state)

export const themeFetchSelector = (state) => pathOr([], ['theme', 'themeFetch', 'data'], state)

export const userThemeSelector = (themeCode) =>
  createSelector(themeFetchSelector, (themeFetch) => {
    return (themeFetch.find((theme) => theme.key === themeCode) || {}).theme
  })
