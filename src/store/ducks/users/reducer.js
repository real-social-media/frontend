import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/users/constants'

const initialState = {
  usersSearch: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  usersStoriesGet: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  usersGetFollowedUsersWithStories: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  usersGetFollowedUsers: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  usersGetFollowerUsers: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  usersGetPendingFollowers: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  usersFollow: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
  },
  usersAcceptFollowerUser: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
  },
  usersUnfollow: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
  },
  usersBlock: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
  },
  usersUnblock: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
  },
  usersGetProfile: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
  },
  usersGetProfileSelf: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
  },
  usersEditProfile: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
  },
  usersMediaObjectsGet: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  usersGetTrendingUsers: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },

  usersGetFollowerUsersCache: {},
  usersGetFollowedUsersCache: {},
  usersGetProfileCache: {},
}

/**
 *
 */
const usersSearchRequest = (state, action) => update(state, {
  usersSearch: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersSearchSuccess = (state, action) => update(state, {
  usersSearch: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersSearchFailure = (state, action) => update(state, {
  usersSearch: {
    status: { $set: 'failure' },
  },
})

const usersSearchIdle = (state, action) => update(state, {
  usersSearch: {
    data: { $set: initialState.usersSearch.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersStoriesGetRequest = (state, action) => update(state, {
  usersStoriesGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersStoriesGetSuccess = (state, action) => update(state, {
  usersStoriesGet: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersStoriesGetFailure = (state, action) => update(state, {
  usersStoriesGet: {
    status: { $set: 'failure' },
  },
})

const usersStoriesGetIdle = (state, action) => update(state, {
  usersStoriesGet: {
    data: { $set: initialState.usersStoriesGet.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersGetFollowedUsersWithStoriesRequest = (state, action) => update(state, {
  usersGetFollowedUsersWithStories: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersGetFollowedUsersWithStoriesSuccess = (state, action) => update(state, {
  usersGetFollowedUsersWithStories: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersGetFollowedUsersWithStoriesFailure = (state, action) => update(state, {
  usersGetFollowedUsersWithStories: {
    status: { $set: 'failure' },
  },
})

const usersGetFollowedUsersWithStoriesIdle = (state, action) => update(state, {
  usersGetFollowedUsersWithStories: {
    data: { $set: initialState.usersGetFollowedUsersWithStories.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersGetFollowedUsersRequest = (state, action) => update(state, {
  usersGetFollowedUsers: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
  usersGetFollowedUsersCache: {
    $usersGetFollowedUsersCacheRequest: action,
  },
})

const usersGetFollowedUsersSuccess = (state, action) => update(state, {
  usersGetFollowedUsers: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  usersGetFollowedUsersCache: {
    $usersGetFollowedUsersCacheSuccess: action,
  },
})

const usersGetFollowedUsersFailure = (state, action) => update(state, {
  usersGetFollowedUsers: {
    status: { $set: 'failure' },
  },
  usersGetFollowedUsersCache: {
    $usersGetFollowedUsersCacheFailure: action,
  },
})

const usersGetFollowedUsersIdle = (state, action) => update(state, {
  usersGetFollowedUsers: {
    data: { $set: initialState.usersGetFollowedUsers.data },
    status: { $set: 'idle' },
  },
  usersGetFollowedUsersCache: {
    $usersGetFollowedUsersCacheIdle: action,
  },
})

/**
 *
 */
const usersGetFollowerUsersRequest = (state, action) => update(state, {
  usersGetFollowerUsers: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
  usersGetFollowerUsersCache: {
    $usersGetFollowerUsersCacheRequest: action,
  },
})

const usersGetFollowerUsersSuccess = (state, action) => update(state, {
  usersGetFollowerUsers: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  usersGetFollowerUsersCache: {
    $usersGetFollowerUsersCacheSuccess: action,
  },
})

const usersGetFollowerUsersFailure = (state, action) => update(state, {
  usersGetFollowerUsers: {
    status: { $set: 'failure' },
  },
  usersGetFollowerUsersCache: {
    $usersGetFollowerUsersCacheFailure: action,
  },
})

const usersGetFollowerUsersIdle = (state, action) => update(state, {
  usersGetFollowerUsers: {
    data: { $set: initialState.usersGetFollowerUsers.data },
    status: { $set: 'idle' },
  },
  usersGetFollowerUsersCache: {
    $usersGetFollowerUsersCacheIdle: action,
  },
})

/**
 *
 */
const usersGetPendingFollowersRequest = (state, action) => update(state, {
  usersGetPendingFollowers: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersGetPendingFollowersSuccess = (state, action) => update(state, {
  usersGetPendingFollowers: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersGetPendingFollowersFailure = (state, action) => update(state, {
  usersGetPendingFollowers: {
    status: { $set: 'failure' },
  },
})

const usersGetPendingFollowersIdle = (state, action) => update(state, {
  usersGetPendingFollowers: {
    data: { $set: initialState.usersGetPendingFollowers.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersFollowRequest = (state, action) => update(state, {
  usersFollow: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
  usersGetProfileCache: {
    $usersGetProfileCacheRequest: { ...action, initialState: initialState.usersGetProfile },
  },
})

const usersFollowSuccess = (state, action) => update(state, {
  usersFollow: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  usersGetProfileCache: {
    $usersGetProfileCacheSuccess: action,
  },
})

const usersFollowFailure = (state, action) => update(state, {
  usersFollow: {
    status: { $set: 'failure' },
  },
})

const usersFollowIdle = (state, action) => update(state, {
  usersFollow: {
    data: { $set: initialState.usersFollow.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersUnfollowRequest = (state, action) => update(state, {
  usersUnfollow: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
  usersGetProfileCache: {
    $usersGetProfileCacheRequest: { ...action, initialState: initialState.usersGetProfile },
  },
})

const usersUnfollowSuccess = (state, action) => update(state, {
  usersUnfollow: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  usersGetProfileCache: {
    $usersGetProfileCacheSuccess: action,
  },
})

const usersUnfollowFailure = (state, action) => update(state, {
  usersUnfollow: {
    status: { $set: 'failure' },
  },
})

const usersUnfollowIdle = (state, action) => update(state, {
  usersUnfollow: {
    data: { $set: initialState.usersUnfollow.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersAcceptFollowerUserRequest = (state, action) => update(state, {
  usersAcceptFollowerUser: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersAcceptFollowerUserSuccess = (state, action) => update(state, {
  usersAcceptFollowerUser: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersAcceptFollowerUserFailure = (state, action) => update(state, {
  usersAcceptFollowerUser: {
    status: { $set: 'failure' },
  },
})

const usersAcceptFollowerUserIdle = (state, action) => update(state, {
  usersAcceptFollowerUser: {
    data: { $set: initialState.usersAcceptFollowerUser.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersBlockRequest = (state, action) => update(state, {
  usersBlock: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
  usersGetProfileCache: {
    $usersGetProfileCacheRequest: { ...action, initialState: initialState.usersGetProfile },
  },
})

const usersBlockSuccess = (state, action) => update(state, {
  usersBlock: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  usersGetProfileCache: {
    $usersGetProfileCacheSuccess: action,
  },
})

const usersBlockFailure = (state, action) => update(state, {
  usersBlock: {
    status: { $set: 'failure' },
  },
})

const usersBlockIdle = (state, action) => update(state, {
  usersBlock: {
    data: { $set: initialState.usersBlock.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersUnblockRequest = (state, action) => update(state, {
  usersUnblock: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
  usersGetProfileCache: {
    $usersGetProfileCacheRequest: { ...action, initialState: initialState.usersGetProfile },
  },
})

const usersUnblockSuccess = (state, action) => update(state, {
  usersUnblock: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  usersGetProfileCache: {
    $usersGetProfileCacheSuccess: action,
  },
})

const usersUnblockFailure = (state, action) => update(state, {
  usersUnblock: {
    status: { $set: 'failure' },
  },
})

const usersUnblockIdle = (state, action) => update(state, {
  usersUnblock: {
    data: { $set: initialState.usersUnblock.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersGetProfileRequest = (state, action) => update(state, {
  usersGetProfile: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
  usersGetProfileCache: {
    $usersGetProfileCacheRequest: { ...action, initialState: initialState.usersGetProfile },
  },
})

const usersGetProfileSuccess = (state, action) => update(state, {
  usersGetProfile: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  usersGetProfileCache: {
    $usersGetProfileCacheSuccess: action,
  },
})

const usersGetProfileFailure = (state, action) => update(state, {
  usersGetProfile: {
    status: { $set: 'failure' },
  },
})

const usersGetProfileIdle = (state, action) => update(state, {
  usersGetProfile: {
    data: { $set: initialState.usersGetProfile.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersGetProfileSelfRequest = (state, action) => update(state, {
  usersGetProfileSelf: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersGetProfileSelfSuccess = (state, action) => update(state, {
  usersGetProfileSelf: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersGetProfileSelfFailure = (state, action) => update(state, {
  usersGetProfileSelf: {
    status: { $set: 'failure' },
  },
})

const usersGetProfileSelfIdle = (state, action) => update(state, {
  usersGetProfileSelf: {
    data: { $set: initialState.usersGetProfileSelf.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersEditProfileRequest = (state, action) => update(state, {
  usersEditProfile: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersEditProfileSuccess = (state, action) => update(state, {
  usersEditProfile: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersEditProfileFailure = (state, action) => update(state, {
  usersEditProfile: {
    status: { $set: 'failure' },
  },
})

const usersEditProfileIdle = (state, action) => update(state, {
  usersEditProfile: {
    data: { $set: initialState.usersEditProfile.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersMediaObjectsGetRequest = (state, action) => update(state, {
  usersMediaObjectsGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersMediaObjectsGetSuccess = (state, action) => update(state, {
  usersMediaObjectsGet: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersMediaObjectsGetFailure = (state, action) => update(state, {
  usersMediaObjectsGet: {
    status: { $set: 'failure' },
  },
})

const usersMediaObjectsGetIdle = (state, action) => update(state, {
  usersMediaObjectsGet: {
    data: { $set: initialState.usersMediaObjectsGet.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersGetTrendingUsersRequest = (state, action) => update(state, {
  usersGetTrendingUsers: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersGetTrendingUsersSuccess = (state, action) => update(state, {
  usersGetTrendingUsers: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersGetTrendingUsersFailure = (state, action) => update(state, {
  usersGetTrendingUsers: {
    status: { $set: 'failure' },
  },
})

const usersGetTrendingUsersIdle = (state, action) => update(state, {
  usersGetTrendingUsers: {
    data: { $set: initialState.usersGetTrendingUsers.data },
    status: { $set: 'idle' },
  },
})

export default handleActions({
  [constants.USERS_SEARCH_REQUEST]: usersSearchRequest,
  [constants.USERS_SEARCH_SUCCESS]: usersSearchSuccess,
  [constants.USERS_SEARCH_FAILURE]: usersSearchFailure,
  [constants.USERS_SEARCH_IDLE]: usersSearchIdle,

  [constants.USERS_STORIES_GET_REQUEST]: usersStoriesGetRequest,
  [constants.USERS_STORIES_GET_SUCCESS]: usersStoriesGetSuccess,
  [constants.USERS_STORIES_GET_FAILURE]: usersStoriesGetFailure,
  [constants.USERS_STORIES_GET_IDLE]: usersStoriesGetIdle,

  [constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_REQUEST]: usersGetFollowedUsersWithStoriesRequest,
  [constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_SUCCESS]: usersGetFollowedUsersWithStoriesSuccess,
  [constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_FAILURE]: usersGetFollowedUsersWithStoriesFailure,
  [constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_IDLE]: usersGetFollowedUsersWithStoriesIdle,

  [constants.USERS_GET_FOLLOWER_USERS_REQUEST]: usersGetFollowerUsersRequest,
  [constants.USERS_GET_FOLLOWER_USERS_SUCCESS]: usersGetFollowerUsersSuccess,
  [constants.USERS_GET_FOLLOWER_USERS_FAILURE]: usersGetFollowerUsersFailure,
  [constants.USERS_GET_FOLLOWER_USERS_IDLE]: usersGetFollowerUsersIdle,

  [constants.USERS_GET_FOLLOWED_USERS_REQUEST]: usersGetFollowedUsersRequest,
  [constants.USERS_GET_FOLLOWED_USERS_SUCCESS]: usersGetFollowedUsersSuccess,
  [constants.USERS_GET_FOLLOWED_USERS_FAILURE]: usersGetFollowedUsersFailure,
  [constants.USERS_GET_FOLLOWED_USERS_IDLE]: usersGetFollowedUsersIdle,

  [constants.USERS_GET_PENDING_FOLLOWERS_REQUEST]: usersGetPendingFollowersRequest,
  [constants.USERS_GET_PENDING_FOLLOWERS_SUCCESS]: usersGetPendingFollowersSuccess,
  [constants.USERS_GET_PENDING_FOLLOWERS_FAILURE]: usersGetPendingFollowersFailure,
  [constants.USERS_GET_PENDING_FOLLOWERS_IDLE]: usersGetPendingFollowersIdle,

  [constants.USERS_FOLLOW_REQUEST]: usersFollowRequest,
  [constants.USERS_FOLLOW_SUCCESS]: usersFollowSuccess,
  [constants.USERS_FOLLOW_FAILURE]: usersFollowFailure,
  [constants.USERS_FOLLOW_IDLE]: usersFollowIdle,

  [constants.USERS_UNFOLLOW_REQUEST]: usersUnfollowRequest,
  [constants.USERS_UNFOLLOW_SUCCESS]: usersUnfollowSuccess,
  [constants.USERS_UNFOLLOW_FAILURE]: usersUnfollowFailure,
  [constants.USERS_UNFOLLOW_IDLE]: usersUnfollowIdle,

  [constants.USERS_ACCEPT_FOLLOWER_USER_REQUEST]: usersAcceptFollowerUserRequest,
  [constants.USERS_ACCEPT_FOLLOWER_USER_SUCCESS]: usersAcceptFollowerUserSuccess,
  [constants.USERS_ACCEPT_FOLLOWER_USER_FAILURE]: usersAcceptFollowerUserFailure,
  [constants.USERS_ACCEPT_FOLLOWER_USER_IDLE]: usersAcceptFollowerUserIdle,

  [constants.USERS_BLOCK_REQUEST]: usersBlockRequest,
  [constants.USERS_BLOCK_SUCCESS]: usersBlockSuccess,
  [constants.USERS_BLOCK_FAILURE]: usersBlockFailure,
  [constants.USERS_BLOCK_IDLE]: usersBlockIdle,

  [constants.USERS_UNBLOCK_REQUEST]: usersUnblockRequest,
  [constants.USERS_UNBLOCK_SUCCESS]: usersUnblockSuccess,
  [constants.USERS_UNBLOCK_FAILURE]: usersUnblockFailure,
  [constants.USERS_UNBLOCK_IDLE]: usersUnblockIdle,

  [constants.USERS_GET_PROFILE_REQUEST]: usersGetProfileRequest,
  [constants.USERS_GET_PROFILE_SUCCESS]: usersGetProfileSuccess,
  [constants.USERS_GET_PROFILE_FAILURE]: usersGetProfileFailure,
  [constants.USERS_GET_PROFILE_IDLE]: usersGetProfileIdle,

  [constants.USERS_GET_PROFILE_SELF_REQUEST]: usersGetProfileSelfRequest,
  [constants.USERS_GET_PROFILE_SELF_SUCCESS]: usersGetProfileSelfSuccess,
  [constants.USERS_GET_PROFILE_SELF_FAILURE]: usersGetProfileSelfFailure,
  [constants.USERS_GET_PROFILE_SELF_IDLE]: usersGetProfileSelfIdle,

  [constants.USERS_EDIT_PROFILE_REQUEST]: usersEditProfileRequest,
  [constants.USERS_EDIT_PROFILE_SUCCESS]: usersEditProfileSuccess,
  [constants.USERS_EDIT_PROFILE_FAILURE]: usersEditProfileFailure,
  [constants.USERS_EDIT_PROFILE_IDLE]: usersEditProfileIdle,

  [constants.USERS_MEDIA_OBJECTS_GET_REQUEST]: usersMediaObjectsGetRequest,
  [constants.USERS_MEDIA_OBJECTS_GET_SUCCESS]: usersMediaObjectsGetSuccess,
  [constants.USERS_MEDIA_OBJECTS_GET_FAILURE]: usersMediaObjectsGetFailure,
  [constants.USERS_MEDIA_OBJECTS_GET_IDLE]: usersMediaObjectsGetIdle,

  [constants.USERS_GET_TRENDING_USERS_REQUEST]: usersGetTrendingUsersRequest,
  [constants.USERS_GET_TRENDING_USERS_SUCCESS]: usersGetTrendingUsersSuccess,
  [constants.USERS_GET_TRENDING_USERS_FAILURE]: usersGetTrendingUsersFailure,
  [constants.USERS_GET_TRENDING_USERS_IDLE]: usersGetTrendingUsersIdle,

  /**
   * Clear on logout
   */
  ['AUTH_SIGNOUT_REQUEST']: (state, action) => initialState,
}, initialState)
