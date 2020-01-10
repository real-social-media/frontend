import update, { extend } from 'immutability-helper'
import path from 'ramda/src/path'

/**
 *
 */
extend('$feedPostUpdate', ({ postId, post }, original) => {
  const index = original.findIndex(post => post.postId === postId)
  if (index === -1) {
    return original
  }
  return update(original, {
    [index]: {
      $set: post,
    },
  })
})

/**
 *
 */
extend('$feedPostLikeStatusUpdate', ({ postId, likeStatus }, original) => {
  const index = original.findIndex(post => post.postId === postId)
  if (index === -1) {
    return original
  }
  return update(original, {
    [index]: {
      likeStatus: { $set: likeStatus },
    },
  })
})

/**
 *
 */
extend('$singlePostLikeStatusUpdate', ({ postId, likeStatus }, original) => {
  if (original.postId !== postId) {
    return original
  }
  return update(original, {
    likeStatus: { $set: likeStatus },
  })
})

/**
 *
 */
extend('$feedPostRemove', ({ postId }, original) => {
  const index = original.findIndex(post => post.postId === postId)
  if (index === -1) {
    return original
  }
  return update(original, {
    $splice: [[index, 1]],
  })
})

/**
 *
 */
extend('$postsCreateQueueRequest', ({ payload }, original) =>
  update(original, {
    [payload.postId]: {
      $set: {
        data: {},
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
extend('$postsCreateQueueProgress', ({ payload }, original) =>
  update(original, {
    [payload.payload.postId]: {
      $set: {
        data: payload.payload.data,
        status: 'loading',
        error: {},
        payload: payload.payload || {},
        meta: payload.meta,
      },
    },
  })
)

/**
 *
 */
extend('$postsCreateQueueSuccess', ({ payload }, original) =>
  update(original, {
    [payload.payload.postId]: {
      $set: {
        data: payload.data,
        status: 'success',
        error: {},
        payload: payload.payload || {},
        meta: payload.meta,
      },
    },
  })
)

/**
 *
 */
extend('$postsCreateQueueFailure', ({ payload }, original) =>
  update(original, {
    [payload.payload.postId]: {
      $set: {
        data: {},
        status: 'failure',
        error: {},
        payload: payload.payload || {},
        meta: payload.meta,
      },
    },
  })
)

/**
 *
 */
extend('$postsCreateQueueIdle', ({ payload }, original) =>
  update(original, {
    [payload.payload.postId]: {
      $set: {
        data: {},
        status: 'idle',
        error: {},
        payload: payload.payload || {},
        meta: payload.meta,
      },
    },
  })
)


/**
 *
 */
extend('$postsGetCacheRequest', ({ payload, initialState }, original) => {
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
extend('$postsGetCacheSuccess', ({ payload }, original) =>
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
extend('$postsGetCacheFailure', ({ payload }, original) =>
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
extend('$postsGetCacheIdle', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      status: { $set: 'idle' },
      payload: { $set: payload.payload || {} },
    },
  })
)

/**
 *
 */
extend('$postsGetMoreCacheRequest', ({ payload }, original) =>
  update(original, {
    [payload.userId]: {
      status: { $set: 'loading' },
    },
  })
)

extend('$postsGetMoreCacheSuccess', ({ payload }, original) =>
  update(original, {
    [payload.payload.userId]: {
      status: { $set: 'success' },
      data: { $push: payload.data },
      payload: { $set: payload.payload || {} },
      meta: { $set: payload.meta || {} },
    },
  })
)
