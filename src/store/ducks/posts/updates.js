import update, { extend } from 'immutability-helper'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import map from 'ramda/src/map'
import set from 'ramda/src/set'
import lensProp from 'ramda/src/lensProp'
import without from 'ramda/src/without'

const getFilteredState = map(set(lensProp('status'), 'idle'))

/**
 *
 */
extend('$postsResourceCacheSetSuccess', ({ payload, resourceKey, initialState }, original) => {
  const filtered = getFilteredState(original)
  const nextState = (path([resourceKey])(filtered)) ?
    filtered :
    update(filtered, { [resourceKey]: { $set: initialState } })

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
extend('$postsResourceCachePushSuccess', ({ payload, resourceKey, initialState }, original) => {
  const filtered = getFilteredState(original)
  const nextState = (path([resourceKey])(filtered)) ?
    filtered :
    update(filtered, { [resourceKey]: { $set: initialState } })

  return update(nextState, {
    [resourceKey]: {
      data: { $push: payload.data },
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
extend('$postsResourceSetSuccess', ({ payload }, original) => {
  return update(original, { $set: payload.data })
})

/**
 *
 */
extend('$postsResourcePushSuccess', ({ payload }, original) => {
  return update(original, { $push: payload.data })
})

extend('$postsResourceRemoveSuccess', ({ payload }, original) => {
  return update(original, {
    $set: without([payload.data[selector]], original),
  })
})

/**
 * Resource pool post hash, will replace post object with postId key
 * [{postId, image ...}, {postId, image ...}] -> [postId, postId]
 */
extend('$postsResourcePoolHash', ({ payload }, original) => {
  return update(original, {
    $set: payload.data
  })
})

/**
 * Resource pool set
 */
extend('$postsResourcePoolSet', ({ payload }, original) => {
  return update(original, {
    [payload.data[selector]]: {
      data: { $set: payload.data },
      status: { $set: 'success' },
    },
  })
})

/**
 * Resource pool merge
 */
extend('$postsResourcePoolMerge', ({ payload, initialState }, original) => {
  return update(original, {
    $merge: pathOr([], ['data'])(payload).reduce((acc, post) => {
      acc[post[selector]] = update(initialState, {
        data: { $set: post },
        status: { $set: 'success' },
      })
      return acc
    }, {})
  })
})

