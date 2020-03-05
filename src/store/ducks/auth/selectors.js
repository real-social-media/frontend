import { createSelector } from 'reselect'
import update from 'immutability-helper'
import pathOr from 'ramda/src/pathOr'

export const authUserSelector = createSelector(
  state => state.auth.user,
  authUser => update(authUser, {
    data: {
      $set: {
        username: pathOr('', ['data', 'username'], authUser),
        fullName: pathOr('', ['data', 'fullName'], authUser),
        bio: pathOr('', ['data', 'bio'], authUser),
        email: pathOr('', ['data', 'email'], authUser),
        phoneNumber: pathOr('', ['data', 'phoneNumber'], authUser),
        privacyStatus: pathOr('', ['data', 'privacyStatus'], authUser),
        followCountsHidden: pathOr('', ['data', 'followCountsHidden'], authUser),
        viewCountsHidden: pathOr('', ['data', 'viewCountsHidden'], authUser),
        photo: {
          url: pathOr('', ['data', 'photo', 'url'], authUser),
          url64p: pathOr('', ['data', 'photo', 'url64p'], authUser),
          url480p: pathOr('', ['data', 'photo', 'url480p'], authUser),
          url1080p: pathOr('', ['data', 'photo', 'url1080p'], authUser),
          url4k: pathOr('', ['data', 'photo', 'url4k'], authUser),
        },
      },
    },
  })
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