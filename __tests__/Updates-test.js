import {
  postsGetRequest,
  postsGetSuccess,
  postsGetFailure,
  postsGetIdle,
  postsCreateIdle,
  postsCreateProgress,
  postsGetMoreRequest,
  postsGetMoreSuccess,
} from '../src/store/ducks/posts/reducer'
import '../src/store/updates'
import { statesActions } from './states_actions'
import update from 'immutability-helper'

const {
  initialStatePosts,
  actionGetRequest,
  actionGetSuccess,
  actionGetFailure,
  actionGetIdle,
  actionCreateIdle,
  actionCreateProgress,
  actionGetMoreRequest,
  actionGetMoreSuccess,
} = {...statesActions}

const initialStateNoCache = update(initialStatePosts, { postsGetCache: { $set: {} } } ) 

test('$resourceCacheSetRequest - test update function extender on postsGetRequest reducer with existing cache case and without', () => {
  expect(postsGetRequest(initialStatePosts, actionGetRequest)).toMatchObject({
    postsGet: {
      status: 'loading',
      payload: {
        userId: 'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d'
      },
    },
    postsGetCache: {
      'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d': {
        status: 'loading',
        payload: {
          userId: 'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d'
        },
      },
    },
  })
  
  expect(postsGetRequest(initialStateNoCache, actionGetRequest)).toMatchObject({
    postsGet: {
      status: 'loading',
      payload: {
        userId: 'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d'
      },
    },
    postsGetCache: {
      'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d': {
        status: 'loading',
        payload: {
          userId: 'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d'
        },
      },
    },
  })

})

test('$resourceCacheSetSuccess - test update function extender on postsGetSuccess reducer with existing cache case and without', () => {
  expect(postsGetSuccess(initialStatePosts, actionGetSuccess)).toMatchObject({
    postsGet: {
      status: 'success',
      payload: { 
        payload: {
          userId: 'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d'
        }, 
      },
    },
    postsGetCache: {
      'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d': {
        data: expect.objectContaining(actionGetSuccess.payload.data),
        status: 'success',
        error: expect.objectContaining({}),
        payload: expect.objectContaining(actionGetSuccess.payload.payload),
        meta: expect.objectContaining(actionGetSuccess.payload.meta),
      },
    }
  })
  expect(postsGetSuccess(initialStateNoCache, actionGetSuccess)).toMatchObject({
    postsGet: {
      status: 'success',
      payload: { 
        payload: {
          userId: 'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d'
        }, 
      },
    },
    postsGetCache: {
      'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d': {
        data: expect.objectContaining(actionGetSuccess.payload.data),
        status: 'success',
        error: expect.objectContaining({}),
        payload: expect.objectContaining(actionGetSuccess.payload.payload),
        meta: expect.objectContaining(actionGetSuccess.payload.meta),
      },
    }
  })
})

test('$resourceCacheSetFailure - test update function extender on postsGetFailure reducer with existing cache case and without', () => {
  expect(postsGetFailure(initialStatePosts, actionGetFailure)).toMatchObject({
    postsGet: {
      status: 'failure' ,
      payload: expect.objectContaining(actionGetFailure.payload),
    },
    postsGetCache: {
      'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d': {
        status: 'failure',
        payload: expect.objectContaining(actionGetFailure.payload.payload)
      },
    },
  })

  expect(postsGetFailure(initialStateNoCache, actionGetFailure)).toMatchObject({
    postsGet: {
      status: 'failure' ,
      payload: expect.objectContaining(actionGetFailure.payload),
    },
    postsGetCache: {
      'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d': {
        status: 'failure',
        payload: expect.objectContaining(actionGetFailure.payload.payload)
      },
    },
  })
})

test('$resourceCacheSetIdle - test update function extender on postsGetIdle reducer with existing cache case and without', () => {
  expect(postsGetIdle(initialStatePosts, actionGetIdle)).toMatchObject({
    postsGet: {
      status: 'idle',
      payload: expect.objectContaining(actionGetIdle.payload),
    },
    postsGetCache: {
      'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d': {
        status: 'idle',
        payload: expect.objectContaining(actionGetIdle.payload.payload)
      },
    }
  })
  expect(postsGetIdle(initialStateNoCache, actionGetIdle)).toMatchObject({
    postsGet: {
      status: 'idle',
      payload: expect.objectContaining(actionGetIdle.payload),
    },
    postsGetCache: {
      'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d': {
        status: 'idle',
        payload: expect.objectContaining(actionGetIdle.payload.payload)
      },
    }
  })
})

test('$resourceCacheSetRemove - test update function extender on postsCreateIdle reducer', () => {
  expect(postsCreateIdle(initialStatePosts, actionCreateIdle)).toMatchObject({
    postsCreate: {
      data: expect.objectContaining(initialStatePosts.postsCreate.data),
      status: 'idle',
    },
    postsCreateQueue: expect.not.objectContaining({
      [actionCreateIdle.payload.payload.postId]: {},
    }),
  })
})

test('$resourceCacheAlterRequest - test update function extender on postsCreateProgress reducer', () => {
  expect(postsCreateProgress(initialStatePosts, actionCreateProgress)).toMatchObject({
    postsCreate: {
      status: 'loading',
      meta: expect.objectContaining(actionCreateProgress.payload.meta),
    },
    postsCreateQueue: {
      '15cf31fb-4da1-454d-ab55-a72bcf73568a': {
        data: expect.objectContaining(actionCreateProgress.payload.data),
        status: 'loading',
        error: {},
        payload: expect.objectContaining(actionCreateProgress.payload.payload),
        meta: expect.objectContaining(actionCreateProgress.payload.meta),
      },
    },
  })
})

test('$resourceCachePushRequest - test update function extender on postsGetMoreRequest reducer with existing cache case and without', () => {
  expect(postsGetMoreRequest(initialStatePosts, actionGetMoreRequest)).toMatchObject({
    postsGet: {
      status: 'loading',
      payload: expect.objectContaining(actionGetMoreRequest.payload),
    },
    postsGetCache: {
      'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d': {
        status: 'loading',
        payload: expect.objectContaining(actionGetMoreRequest.payload),
      },
    },
  })
  expect(postsGetMoreRequest(initialStateNoCache, actionGetMoreRequest)).toMatchObject({
    postsGet: {
      status: 'loading',
      payload: expect.objectContaining(actionGetMoreRequest.payload),
    },
    postsGetCache: {
      'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d': {
        status: 'loading',
        payload: expect.objectContaining(actionGetMoreRequest.payload),
      },
    },
  })
})

test('$resourceCachePushSuccess - test update function extender on postsGetMoreSuccess reducer with existing cache case and without', () => {
  expect(postsGetMoreSuccess(initialStatePosts, actionGetMoreSuccess)).toMatchObject({
    postsGet: {
      status: 'success',
      payload: expect.objectContaining(actionGetMoreSuccess.payload),
    },
    postsGetCache: {
      'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d': {
        status: 'success',
        data: expect.arrayContaining(actionGetMoreSuccess.payload.data),
        payload: expect.objectContaining(actionGetMoreSuccess.payload.payload),
        meta: expect.objectContaining(actionGetMoreSuccess.payload.meta),
      },
    },
  })
  expect(postsGetMoreSuccess(initialStateNoCache, actionGetMoreSuccess)).toMatchObject({
    postsGet: {
      status: 'success',
      payload: expect.objectContaining(actionGetMoreSuccess.payload),
    },
    postsGetCache: {
      'us-east-1:c9be4a03-3e92-42d7-ade2-13fe8ef2de0d': {
        status: 'success',
        data: expect.arrayContaining(actionGetMoreSuccess.payload.data),
        payload: expect.objectContaining(actionGetMoreSuccess.payload.payload),
        meta: expect.objectContaining(actionGetMoreSuccess.payload.meta),
      },
    },
  })
})