import update, { extend } from 'immutability-helper'
import path from 'ramda/src/path'

update.extend('$map', (value, nextObject) =>
  nextObject.map((element) => update(element, value))
)

/**
 *
 */
extend('$userCacheRequest', ({ payload }, original) =>
  update(original, {
    [payload.userId]: {
      $set: {
        data: [],
        status: 'loading',
        error: {},
        payload,
        meta: {},
      },
    },
  })
)

/**
 *
 */
extend('$userCacheSuccess', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      $set: {
        data: payload.data,
        status: 'success',
        error: {},
        payload: payload.payload || {},
      },
    },
  })
)

/**
 *
 */
extend('$userCacheFailure', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      $set: {
        data: [],
        status: 'failure',
        error: {},
        payload: payload.payload || {},
      },
    },
  })
)

/**
 *
 */
extend('$userCacheIdle', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      $set: {
        data: [],
        status: 'idle',
        error: {},
        payload: payload.payload || {},
      },
    },
  })
)

/**
 *
 */
extend('$usersGetProfileCacheRequest', ({ payload, initialState }, original) => {
  const nextState = (path([payload.userId])(original)) ?
    original :
    update(original, { [payload.userId]: { $set: initialState } })

  return update(nextState, {
    [payload.userId]: {
      status: { $set: 'loading' },
      payload: { $set: payload },
    },
  })
})

/**
 *
 */
extend('$usersGetProfileCacheSuccess', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      data: { $set: payload.data },
      status: { $set: 'success' },
      error: { $set: {} },
      payload: { $set: payload.payload || {} },
      meta: { $set: payload.meta || {} },
    },
  })
)

/**
 *
 */
extend('$usersGetProfileCacheFailure', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      status: { $set: 'failure' },
      payload: { $set: payload.payload || {} },
    },
  })
)

/**
 *
 */
extend('$usersGetProfileCacheIdle', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      status: { $set: 'idle' },
      payload: { $set: payload.payload || {} },
    },
  })
)