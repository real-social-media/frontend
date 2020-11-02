import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/dating/constants'

export const initialState = {
  datingMatchedUsers: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  datingConfirmedUsers: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  datingMatchApprove: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
  },
  datingMatchReject: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
  },
}

/**
 *
 */
const datingMatchedUsersRequest = (state, action) => update(state, {
  datingMatchedUsers: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const datingMatchedUsersSuccess = (state, action) => update(state, {
  datingMatchedUsers: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const datingMatchedUsersFailure = (state, action) => update(state, {
  datingMatchedUsers: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const datingMatchedUsersIdle = (state) => update(state, {
  datingMatchedUsers: {
    data: { $set: initialState.datingMatchedUsers.data },
    error: { $set: initialState.datingMatchedUsers.error },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const datingConfirmedUsersRequest = (state, action) => update(state, {
  datingConfirmedUsers: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const datingConfirmedUsersSuccess = (state, action) => update(state, {
  datingConfirmedUsers: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const datingConfirmedUsersFailure = (state, action) => update(state, {
  datingConfirmedUsers: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const datingConfirmedUsersIdle = (state) => update(state, {
  datingConfirmedUsers: {
    data: { $set: initialState.datingConfirmedUsers.data },
    error: { $set: initialState.datingConfirmedUsers.error },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const datingMatchApproveRequest = (state, action) => update(state, {
  datingMatchApprove: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const datingMatchApproveSuccess = (state, action) => update(state, {
  datingMatchApprove: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const datingMatchApproveFailure = (state, action) => update(state, {
  datingMatchApprove: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const datingMatchApproveIdle = (state) => update(state, {
  datingMatchApprove: {
    data: { $set: initialState.datingMatchApprove.data },
    error: { $set: initialState.datingMatchApprove.error },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const datingMatchRejectRequest = (state, action) => update(state, {
  datingMatchReject: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const datingMatchRejectSuccess = (state, action) => update(state, {
  datingMatchReject: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const datingMatchRejectFailure = (state, action) => update(state, {
  datingMatchReject: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const datingMatchRejectIdle = (state) => update(state, {
  datingMatchReject: {
    data: { $set: initialState.datingMatchReject.data },
    error: { $set: initialState.datingMatchReject.error },
    status: { $set: 'idle' },
  },
})


export default handleActions({
  [constants.DATING_MATCHED_USERS_REQUEST]: datingMatchedUsersRequest,
  [constants.DATING_MATCHED_USERS_SUCCESS]: datingMatchedUsersSuccess,
  [constants.DATING_MATCHED_USERS_FAILURE]: datingMatchedUsersFailure,
  [constants.DATING_MATCHED_USERS_IDLE]: datingMatchedUsersIdle,

  [constants.DATING_CONFIRMED_USERS_REQUEST]: datingConfirmedUsersRequest,
  [constants.DATING_CONFIRMED_USERS_SUCCESS]: datingConfirmedUsersSuccess,
  [constants.DATING_CONFIRMED_USERS_FAILURE]: datingConfirmedUsersFailure,
  [constants.DATING_CONFIRMED_USERS_IDLE]: datingConfirmedUsersIdle,

  [constants.DATING_MATCH_APPROVE_REQUEST]: datingMatchApproveRequest,
  [constants.DATING_MATCH_APPROVE_SUCCESS]: datingMatchApproveSuccess,
  [constants.DATING_MATCH_APPROVE_FAILURE]: datingMatchApproveFailure,
  [constants.DATING_MATCH_APPROVE_IDLE]: datingMatchApproveIdle,

  [constants.DATING_MATCH_REJECT_REQUEST]: datingMatchRejectRequest,
  [constants.DATING_MATCH_REJECT_SUCCESS]: datingMatchRejectSuccess,
  [constants.DATING_MATCH_REJECT_FAILURE]: datingMatchRejectFailure,
  [constants.DATING_MATCH_REJECT_IDLE]: datingMatchRejectIdle,
}, initialState)
