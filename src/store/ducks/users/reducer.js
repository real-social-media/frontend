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
  usersImagePostsGet: {
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
  usersGetCards: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },

  usersPool: {

  },

  usersGetFollowerUsersCache: {},
  usersGetFollowedUsersCache: {},
}

const usersResourcePoolMerge = (state, action) => update(state, {
  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolMerge: {
      ...action,
      initialState: initialState.usersGetProfile,
    },
  },
})

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
    data: { $usersResourceSetSuccess: action },
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolMerge: {
      ...action,
      initialState: initialState.usersGetProfile,
    },
  },
})

const usersSearchFailure = (state, action) => update(state, {
  usersSearch: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersSearchIdle = (state, action) => update(state, {
  usersSearch: {
    data: { $set: initialState.usersSearch.data },
    error: { $set: initialState.usersSearch.error },
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
    data: { $usersResourceSetSuccess: action },
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolMerge: {
      ...action,
      initialState: initialState.usersGetProfile,
    },
  },
})

const usersGetFollowedUsersWithStoriesFailure = (state, action) => update(state, {
  usersGetFollowedUsersWithStories: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersGetFollowedUsersWithStoriesIdle = (state, action) => update(state, {
  usersGetFollowedUsersWithStories: {
    data: { $set: initialState.usersGetFollowedUsersWithStories.data },
    error: { $set: initialState.usersGetFollowedUsersWithStories.error },
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
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.usersGetFollowedUsers,
    },
  },
})

const usersGetFollowedUsersSuccess = (state, action) => update(state, {
  usersGetFollowedUsers: {
    data: { $usersResourceSetSuccess: action },
    status: { $set: 'success' },
  },
  usersGetFollowedUsersCache: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetFollowedUsers,
    },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolMerge: {
      ...action,
      initialState: initialState.usersGetProfile,
    },
  },
})

const usersGetFollowedUsersFailure = (state, action) => update(state, {
  usersGetFollowedUsers: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
  usersGetFollowedUsersCache: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetFollowedUsers,
    },
  },
})

const usersGetFollowedUsersIdle = (state, action) => update(state, {
  usersGetFollowedUsers: {
    data: { $set: initialState.usersGetFollowedUsers.data },
    error: { $set: initialState.usersGetFollowedUsers.error },
    status: { $set: 'idle' },
  },
  usersGetFollowedUsersCache: {
    $resourceCacheSetIdle: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetFollowedUsers,
    },
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
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.usersGetFollowerUsers,
    },
  },
})

const usersGetFollowerUsersSuccess = (state, action) => update(state, {
  usersGetFollowerUsers: {
    data: { $usersResourceSetSuccess: action },
    status: { $set: 'success' },
  },
  usersGetFollowerUsersCache: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetFollowerUsers,
    },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolMerge: {
      ...action,
      initialState: initialState.usersGetProfile,
    },
  },
})

const usersGetFollowerUsersFailure = (state, action) => update(state, {
  usersGetFollowerUsers: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
  usersGetFollowerUsersCache: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetFollowerUsers,
    },
  },
})

const usersGetFollowerUsersIdle = (state, action) => update(state, {
  usersGetFollowerUsers: {
    data: { $set: initialState.usersGetFollowerUsers.data },
    error: { $set: initialState.usersGetFollowerUsers.error },
    status: { $set: 'idle' },
  },
  usersGetFollowerUsersCache: {
    $resourceCacheSetIdle: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetFollowerUsers,
    },
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
  usersGetFollowerUsersCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.usersGetPendingFollowers,
    },
  },
})

const usersGetPendingFollowersSuccess = (state, action) => update(state, {
  usersGetPendingFollowers: {
    data: { $usersResourceSetSuccess: action },
    status: { $set: 'success' },
  },
  usersGetFollowerUsersCache: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetPendingFollowers,
    },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolMerge: {
      ...action,
      initialState: initialState.usersGetProfile,
    },
  },
})

const usersGetPendingFollowersFailure = (state, action) => update(state, {
  usersGetPendingFollowers: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
  usersGetFollowerUsersCache: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetPendingFollowers,
    },
  },
})

const usersGetPendingFollowersIdle = (state, action) => update(state, {
  usersGetPendingFollowers: {
    data: { $set: initialState.usersGetPendingFollowers.data },
    error: { $set: initialState.usersGetPendingFollowers.error },
    status: { $set: 'idle' },
  },
  usersGetFollowerUsersCache: {
    $resourceCacheSetIdle: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetPendingFollowers,
    },
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
})

const usersFollowSuccess = (state, action) => update(state, {
  usersFollow: {
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolSet: action,
  },
})

const usersFollowFailure = (state, action) => update(state, {
  usersFollow: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersFollowIdle = (state, action) => update(state, {
  usersFollow: {
    data: { $set: initialState.usersFollow.data },
    error: { $set: initialState.usersFollow.error },
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
})

const usersUnfollowSuccess = (state, action) => update(state, {
  usersUnfollow: {
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolSet: action,
  },
})

const usersUnfollowFailure = (state, action) => update(state, {
  usersUnfollow: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersUnfollowIdle = (state, action) => update(state, {
  usersUnfollow: {
    data: { $set: initialState.usersUnfollow.data },
    error: { $set: initialState.usersUnfollow.error },
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
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolSet: action,
  },
})

const usersAcceptFollowerUserFailure = (state, action) => update(state, {
  usersAcceptFollowerUser: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersAcceptFollowerUserIdle = (state, action) => update(state, {
  usersAcceptFollowerUser: {
    data: { $set: initialState.usersAcceptFollowerUser.data },
    error: { $set: initialState.usersAcceptFollowerUser.error },
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
})

const usersBlockSuccess = (state, action) => update(state, {
  usersBlock: {
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolSet: action,
  },
})

const usersBlockFailure = (state, action) => update(state, {
  usersBlock: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersBlockIdle = (state, action) => update(state, {
  usersBlock: {
    data: { $set: initialState.usersBlock.data },
    error: { $set: initialState.usersBlock.error },
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
})

const usersUnblockSuccess = (state, action) => update(state, {
  usersUnblock: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolSet: action,
  },
})

const usersUnblockFailure = (state, action) => update(state, {
  usersUnblock: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersUnblockIdle = (state, action) => update(state, {
  usersUnblock: {
    data: { $set: initialState.usersUnblock.data },
    error: { $set: initialState.usersUnblock.error },
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
})

const usersGetProfileSuccess = (state, action) => update(state, {
  usersGetProfile: {
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolSet: action,
  },
})

const usersGetProfileFailure = (state, action) => update(state, {
  usersGetProfile: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersGetProfileIdle = (state, action) => update(state, {
  usersGetProfile: {
    data: { $set: initialState.usersGetProfile.data },
    error: { $set: initialState.usersGetProfile.error },
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
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolSet: action,
  },
})

const usersGetProfileSelfFailure = (state, action) => update(state, {
  usersGetProfileSelf: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersGetProfileSelfIdle = (state, action) => update(state, {
  usersGetProfileSelf: {
    data: { $set: initialState.usersGetProfileSelf.data },
    error: { $set: initialState.usersGetProfileSelf.error },
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
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  usersPool: {
    $usersResourcePoolSet: action,
  },
})

const usersEditProfileFailure = (state, action) => update(state, {
  usersEditProfile: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersEditProfileIdle = (state, action) => update(state, {
  usersEditProfile: {
    data: { $set: initialState.usersEditProfile.data },
    error: { $set: initialState.usersEditProfile.error },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersImagePostsGetRequest = (state, action) => update(state, {
  usersImagePostsGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersImagePostsGetSuccess = (state, action) => update(state, {
  usersImagePostsGet: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersImagePostsGetFailure = (state, action) => update(state, {
  usersImagePostsGet: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersImagePostsGetIdle = (state, action) => update(state, {
  usersImagePostsGet: {
    data: { $set: initialState.usersImagePostsGet.data },
    error: { $set: initialState.usersImagePostsGet.error },
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
    data: { $usersResourceSetSuccess: action },
    status: { $set: 'success' },
  },

  usersPool: {
    $usersResourcePoolMerge: {
      ...action,
      initialState: initialState.usersGetProfile,
    },
  },
})

const usersGetTrendingUsersFailure = (state, action) => update(state, {
  usersGetTrendingUsers: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersGetTrendingUsersIdle = (state, action) => update(state, {
  usersGetTrendingUsers: {
    data: { $set: initialState.usersGetTrendingUsers.data },
    error: { $set: initialState.usersGetTrendingUsers.error },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersGetCardsRequest = (state, action) => update(state, {
  usersGetCards: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersGetCardsSuccess = (state, action) => update(state, {
  usersGetCards: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersGetCardsFailure = (state, action) => update(state, {
  usersGetCards: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersGetCardsIdle = (state, action) => update(state, {
  usersGetCards: {
    data: { $set: initialState.usersGetCards.data },
    error: { $set: initialState.usersGetCards.error },
    status: { $set: 'idle' },
  },
})

export default handleActions({
  [constants.USERS_SEARCH_REQUEST]: usersSearchRequest,
  [constants.USERS_SEARCH_SUCCESS]: usersSearchSuccess,
  [constants.USERS_SEARCH_FAILURE]: usersSearchFailure,
  [constants.USERS_SEARCH_IDLE]: usersSearchIdle,

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

  [constants.USERS_IMAGE_POSTS_GET_REQUEST]: usersImagePostsGetRequest,
  [constants.USERS_IMAGE_POSTS_GET_SUCCESS]: usersImagePostsGetSuccess,
  [constants.USERS_IMAGE_POSTS_GET_FAILURE]: usersImagePostsGetFailure,
  [constants.USERS_IMAGE_POSTS_GET_IDLE]: usersImagePostsGetIdle,

  [constants.USERS_GET_CARDS_REQUEST]: usersGetCardsRequest,
  [constants.USERS_GET_CARDS_SUCCESS]: usersGetCardsSuccess,
  [constants.USERS_GET_CARDS_FAILURE]: usersGetCardsFailure,
  [constants.USERS_GET_CARDS_IDLE]: usersGetCardsIdle,

  [constants.USERS_RESOURCE_POOL_MERGE]: usersResourcePoolMerge,

  /**
   * Clear on logout
   */
  ['AUTH_SIGNOUT_REQUEST']: (state, action) => initialState,
}, initialState)
