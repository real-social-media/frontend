import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/albums/constants'

const initialState = {
  albumsGet: {
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
}

/**
 *
 */
const albumsGetRequest = (state, action) => update(state, {
  albumsGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const albumsGetSuccess = (state, action) => update(state, {
  albumsGet: {
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },

  /**
   *
   */
  albumsGetCache: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.albumsGet,
    },
  },
})

const albumsGetFailure = (state, action) => update(state, {
  albumsGet: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
  },
})

const albumsGetIdle = (state, action) => update(state, {
  albumsGet: {
    status: { $set: 'idle' },
    payload: { $set: action.payload.payload },
  },
})

/**
 *
 */
const albumsCreateRequest = (state, action) => update(state, {
  albumsCreate: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const albumsCreateSuccess = (state, action) => update(state, {
  albumsCreate: {
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const albumsCreateFailure = (state, action) => update(state, {
  albumsCreate: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
  },
})

const albumsCreateIdle = (state, action) => update(state, {
  albumsCreate: {
    status: { $set: 'idle' },
    payload: { $set: action.payload.payload },
  },
})

/**
 *
 */
const albumsEditRequest = (state, action) => update(state, {
  albumsEdit: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const albumsEditSuccess = (state, action) => update(state, {
  albumsEdit: {
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const albumsEditFailure = (state, action) => update(state, {
  albumsEdit: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
  },
})

const albumsEditIdle = (state, action) => update(state, {
  albumsEdit: {
    status: { $set: 'idle' },
    payload: { $set: action.payload.payload },
  },
})

/**
 *
 */
const albumsDeleteRequest = (state, action) => update(state, {
  albumsDelete: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const albumsDeleteSuccess = (state, action) => update(state, {
  albumsDelete: {
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const albumsDeleteFailure = (state, action) => update(state, {
  albumsDelete: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
  },
})

const albumsDeleteIdle = (state, action) => update(state, {
  albumsDelete: {
    status: { $set: 'idle' },
    payload: { $set: action.payload.payload },
  },
})

export default handleActions({
  [constants.ALBUMS_GET_REQUEST]: albumsGetRequest,
  [constants.ALBUMS_GET_SUCCESS]: albumsGetSuccess,
  [constants.ALBUMS_GET_FAILURE]: albumsGetFailure,
  [constants.ALBUMS_GET_IDLE]: albumsGetIdle,

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
}, initialState)
