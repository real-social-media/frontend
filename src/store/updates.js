import update, { extend } from 'immutability-helper'
import path from 'ramda/src/path'

update.extend('$map', (value, nextObject) =>
  nextObject.map((element) => update(element, value))
)

/**
 *
 */
extend('$resourceCacheSetRequest', ({ payload, resourceKey, initialState }, original) => {
  const nextState = (path([resourceKey])(original)) ?
    original :
    update(original, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      status: { $set: 'loading' },
      payload: { $set: payload },
    },
  })
})

/**
 *
 */
extend('$resourceCacheSetSuccess', ({ payload, resourceKey, initialState }, original) => {
  const nextState = (path([resourceKey])(original)) ?
    original :
    update(original, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      data: { $set: payload.data },
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
extend('$resourceCacheSetFailure', ({ payload, resourceKey, initialState }, original) => {
  const nextState = (path([resourceKey])(original)) ?
    original :
    update(original, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      status: { $set: 'failure' },
      payload: { $set: payload.payload || {} },
    },
  })
})

/**
 *
 */
extend('$resourceCacheSetIdle', ({ payload, resourceKey, initialState }, original) => {
  const nextState = (path([resourceKey])(original)) ?
    original :
    update(original, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      status: { $set: 'idle' },
      payload: { $set: payload.payload || {} },
    },
  })
})

/**
 *
 */

extend('$resourceCacheSetRemove', ({ payload, resourceKey }, original) =>
  update(original, {
    $unset: [resourceKey],
  })
)

/**
 *
 */
extend('$resourceCacheAlterRequest', ({ payload, resourceKey, initialState }, original) => {
  const nextState = (path([resourceKey])(original)) ?
    original :
    update(original, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      data: { $set: payload.data },
      status: { $set: 'loading' },
      error: { $set: {} },
      payload: { $set: payload.payload || {} },
      meta: { $set: payload.meta || {} },
    },
  })
})

/**
 *
 */
extend('$resourceCachePushRequest', ({ payload, resourceKey, initialState }, original) => {
  const nextState = (path([resourceKey])(original)) ?
    original :
    update(original, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      status: { $set: 'loading' },
      payload: { $set: payload },
    },
  })
})

extend('$resourceCachePushSuccess', ({ payload, resourceKey, initialState }, original) => {
  const nextState = (path([resourceKey])(original)) ?
    original :
    update(original, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      status: { $set: 'success' },
      data: { $push: payload.data },
      payload: { $set: payload.payload || {} },
      meta: { $set: payload.meta || {} },
    },
  })
})