import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/albums/constants'

export const initialState = {
  albumsGet: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  albumsSingleGet: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  albumsPostsGet: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  albumsCreate: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  albumsEdit: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  albumsDelete: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },

  albumsGetCache: {},
  albumsPostsGetCache: {},
}

/**
 *
 */
const albumsGetRequest = (state, action) =>
  update(state, {
    albumsGetCache: {
      $resourceCacheSetRequest: {
        ...action,
        resourceKey: action.payload.userId,
        initialState: initialState.albumsGet,
      },
    },
  })

const albumsGetSuccess = (state, action) =>
  update(state, {
    albumsGetCache: {
      $resourceCacheSetSuccess: {
        ...action,
        resourceKey: action.payload.payload.userId,
        initialState: initialState.albumsGet,
      },
    },
  })

const albumsGetFailure = (state, action) =>
  update(state, {
    albumsGetCache: {
      $resourceCacheSetFailure: {
        ...action,
        resourceKey: action.payload.payload.userId,
        initialState: initialState.albumsGet,
      },
    },
  })

const albumsGetIdle = (state, action) =>
  update(state, {
    albumsGetCache: {
      $resourceCacheSetIdle: {
        ...action,
        resourceKey: action.payload.payload.userId,
        initialState: initialState.albumsGet,
      },
    },
  })

/**
 *
 */
const albumsCreateRequest = (state, action) =>
  update(state, {
    albumsCreate: {
      status: { $set: 'loading' },
      payload: { $set: action.payload },
    },
  })

const albumsCreateSuccess = (state, action) =>
  update(state, {
    albumsCreate: {
      status: { $set: 'success' },
      payload: { $set: action.payload.payload },
    },
  })

const albumsCreateFailure = (state, action) =>
  update(state, {
    albumsCreate: {
      status: { $set: 'failure' },
      payload: { $set: action.payload.payload },
    },
  })

const albumsCreateIdle = (state, action) =>
  update(state, {
    albumsCreate: {
      status: { $set: 'idle' },
      payload: { $set: action.payload.payload },
    },
  })

/**
 *
 */
const albumsSingleGetRequest = (state, action) =>
  update(state, {
    albumsSingleGet: {
      status: { $set: 'loading' },
      payload: { $set: action.payload },
    },
  })

const albumsSingleGetSuccess = (state, action) =>
  update(state, {
    albumsSingleGet: {
      status: { $set: 'success' },
      payload: { $set: action.payload.payload },
    },
  })

const albumsSingleGetFailure = (state, action) =>
  update(state, {
    albumsSingleGet: {
      status: { $set: 'failure' },
      payload: { $set: action.payload.payload },
    },
  })

const albumsSingleGetIdle = (state, action) =>
  update(state, {
    albumsSingleGet: {
      status: { $set: 'idle' },
      payload: { $set: action.payload.payload },
    },
  })

/**
 *
 */
const albumsPostsGetRequest = (state, action) =>
  update(state, {
    albumsPostsGetCache: {
      $resourceCacheSetRequest: {
        ...action,
        resourceKey: action.payload.albumId,
        initialState: initialState.albumsPostsGet,
      },
    },
  })

const albumsPostsGetSuccess = (state, action) =>
  update(state, {
    albumsPostsGetCache: {
      $resourceCacheSetSuccess: {
        ...action,
        resourceKey: action.payload.payload.albumId,
        initialState: initialState.albumsPostsGet,
      },
    },
  })

const albumsPostsGetFailure = (state, action) =>
  update(state, {
    albumsPostsGetCache: {
      $resourceCacheSetFailure: {
        ...action,
        resourceKey: action.payload.payload.albumId,
        initialState: initialState.albumsPostsGet,
      },
    },
  })

const albumsPostsGetIdle = (state, action) =>
  update(state, {
    albumsPostsGetCache: {
      $resourceCacheSetIdle: {
        ...action,
        resourceKey: action.payload.payload.albumId,
        initialState: initialState.albumsPostsGet,
      },
    },
  })

const albumsPostsGetMoreRequest = (state, action) =>
  update(state, {
    albumsPostsGetCache: {
      $resourceCachePushRequest: {
        ...action,
        resourceKey: action.payload.albumId,
        initialState: initialState.albumsPostsGet,
      },
    },
  })

const albumsPostsGetMoreSuccess = (state, action) =>
  update(state, {
    albumsPostsGetCache: {
      $postsResourceCachePushSuccess: {
        ...action,
        resourceKey: action.payload.payload.albumId,
        initialState: initialState.albumsPostsGet,
      },
    },
  })

/**
 *
 */
const albumsEditRequest = (state, action) =>
  update(state, {
    albumsEdit: {
      status: { $set: 'loading' },
      payload: { $set: action.payload },
    },
  })

const albumsEditSuccess = (state, action) =>
  update(state, {
    albumsEdit: {
      status: { $set: 'success' },
      payload: { $set: action.payload.payload },
    },
  })

const albumsEditFailure = (state, action) =>
  update(state, {
    albumsEdit: {
      status: { $set: 'failure' },
      payload: { $set: action.payload.payload },
    },
  })

const albumsEditIdle = (state, action) =>
  update(state, {
    albumsEdit: {
      status: { $set: 'idle' },
      payload: { $set: action.payload.payload },
    },
  })

/**
 *
 */
const albumsDeleteRequest = (state, action) =>
  update(state, {
    albumsDelete: {
      status: { $set: 'loading' },
      payload: { $set: action.payload },
    },
  })

const albumsDeleteSuccess = (state, action) =>
  update(state, {
    albumsDelete: {
      status: { $set: 'success' },
      payload: { $set: action.payload.payload },
    },
  })

const albumsDeleteFailure = (state, action) =>
  update(state, {
    albumsDelete: {
      status: { $set: 'failure' },
      payload: { $set: action.payload.payload },
    },
  })

const albumsDeleteIdle = (state, action) =>
  update(state, {
    albumsDelete: {
      status: { $set: 'idle' },
      payload: { $set: action.payload.payload },
    },
  })

export default handleActions(
  {
    [constants.ALBUMS_GET_REQUEST]: albumsGetRequest,
    [constants.ALBUMS_GET_SUCCESS]: albumsGetSuccess,
    [constants.ALBUMS_GET_FAILURE]: albumsGetFailure,
    [constants.ALBUMS_GET_IDLE]: albumsGetIdle,

    [constants.ALBUMS_SINGLE_GET_REQUEST]: albumsSingleGetRequest,
    [constants.ALBUMS_SINGLE_GET_SUCCESS]: albumsSingleGetSuccess,
    [constants.ALBUMS_SINGLE_GET_FAILURE]: albumsSingleGetFailure,
    [constants.ALBUMS_SINGLE_GET_IDLE]: albumsSingleGetIdle,

    [constants.ALBUMS_POSTS_GET_REQUEST]: albumsPostsGetRequest,
    [constants.ALBUMS_POSTS_GET_SUCCESS]: albumsPostsGetSuccess,
    [constants.ALBUMS_POSTS_GET_FAILURE]: albumsPostsGetFailure,
    [constants.ALBUMS_POSTS_GET_IDLE]: albumsPostsGetIdle,
    [constants.ALBUMS_POSTS_GET_MORE_REQUEST]: albumsPostsGetMoreRequest,
    [constants.ALBUMS_POSTS_GET_MORE_SUCCESS]: albumsPostsGetMoreSuccess,

    [constants.ALBUMS_CREATE_REQUEST]: albumsCreateRequest,
    [constants.ALBUMS_CREATE_SUCCESS]: albumsCreateSuccess,
    [constants.ALBUMS_CREATE_FAILURE]: albumsCreateFailure,
    [constants.ALBUMS_CREATE_IDLE]: albumsCreateIdle,

    [constants.ALBUMS_EDIT_REQUEST]: albumsEditRequest,
    [constants.ALBUMS_EDIT_SUCCESS]: albumsEditSuccess,
    [constants.ALBUMS_EDIT_FAILURE]: albumsEditFailure,
    [constants.ALBUMS_EDIT_IDLE]: albumsEditIdle,

    [constants.ALBUMS_DELETE_REQUEST]: albumsDeleteRequest,
    [constants.ALBUMS_DELETE_SUCCESS]: albumsDeleteSuccess,
    [constants.ALBUMS_DELETE_FAILURE]: albumsDeleteFailure,
    [constants.ALBUMS_DELETE_IDLE]: albumsDeleteIdle,
  },
  initialState,
)
