import { createSelector } from 'reselect'
import prop from 'ramda/src/prop'
import assocPath from 'ramda/src/assocPath'
import compose from 'ramda/src/compose'
import is from 'ramda/src/is'
import * as normalizer from 'normalizer/schemas'
import { entitiesSelector } from 'store/ducks/entities/selectors'

const authRoot = prop('auth')
export const authForgot = compose(prop('authForgot'), authRoot)
export const authForgotConfirm = compose(prop('authForgotConfirm'), authRoot)
export const authSigninCognito = compose(prop('authSigninCognito'), authRoot)
export const authSigninGoogle = compose(prop('authSigninGoogle'), authRoot)
export const authSigninApple = compose(prop('authSigninApple'), authRoot)
export const authSigninAnonymous = compose(prop('authSigninAnonymous'), authRoot)
export const authFlow = compose(prop('authFlow'), authRoot)

/**
 *
 */
export const authGetUser = compose(prop('authGetUser'), authRoot)
export const authUserId = createSelector(authGetUser, authGetUser => {
  const userId = prop('data', authGetUser)
  return is(String, userId) && userId
})

export const authUserSelector = createSelector(
  [ authGetUser, entitiesSelector],
  ( authGetUser, entities) => {
    const userId = authGetUser.data
    const denormalized = normalizer.denormalizeUserGet(userId, entities)
    return assocPath(['data'], denormalized)(authGetUser)
  },
)

export const authUser = createSelector(authUserSelector, prop('data'))
