import update, { extend } from 'immutability-helper'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import map from 'ramda/src/map'
import set from 'ramda/src/set'
import lensProp from 'ramda/src/lensProp'
import assocPath from 'ramda/src/assocPath'
import compose from 'ramda/src/compose'

const getFilteredState = map(set(lensProp('status'), 'idle'))

/**
 *
 */
extend('$usersResourceCacheSetSuccess', ({ payload, resourceKey, initialState }, original) => {
  const filtered = getFilteredState(original)
  const nextState = (path([resourceKey])(filtered)) ?
    filtered :
    update(filtered, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      data: { $set: pathOr([], ['data'])(payload).map(user => user.userId) },
      status: { $set: 'success' },
      error: { $set: {} },
      payload: { $set: payload.payload || {} },
      meta: { $set: payload.meta || {} },
    },
  })
})

/**
 *
 */
extend('$usersResourceSetSuccess', ({ payload }, original) => {
  return update(original, { $set: pathOr([], ['data'])(payload).map(user => user.userId) })
})

/**
 * Resource pool user hash, will replace user object with userId key
 * [{userId, image ...}, {userId, image ...}] -> [userId, userId]
 */
extend('$usersResourcePoolHash', ({ payload }, original) => {
  return update(original, {
    $set: pathOr([], ['data'])(payload).map(user => user.userId),
  })
})

/**
 * Resource pool merge
 */
extend('$usersResourcePoolSet', ({ payload }, original) => {
  return compose(
    assocPath([payload.data.userId, 'data'], payload.data),
    assocPath([payload.data.userId, 'status'], 'success'),
  )(original)
})
