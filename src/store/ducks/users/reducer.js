import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/users/constants'

export const initialState = {
  usersSearch: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  usersDelete: {
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
  usersDeleteCard: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  usersSetApnsToken: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  usersDeleteAvatar: {
    status: 'idle',
    error: {},
  },

  usersGetFollowerUsersCache: {},
  usersGetFollowedUsersCache: {},
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
    error: { $set: action.payload.message },
  },
})

const usersSearchIdle = (state) => update(state, {
  usersSearch: {
    data: { $set: initialState.usersSearch.data },
    error: { $set: initialState.usersSearch.error },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersDeleteRequest = (state, action) => update(state, {
  usersDelete: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersDeleteSuccess = (state, action) => update(state, {
  usersDelete: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersDeleteFailure = (state, action) => update(state, {
  usersDelete: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersDeleteIdle = (state) => update(state, {
  usersDelete: {
    data: { $set: initialState.usersDelete.data },
    error: { $set: initialState.usersDelete.error },
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
    error: { $set: action.payload.message },
  },
})

const usersGetFollowedUsersWithStoriesIdle = (state) => update(state, {
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
  usersGetFollowedUsersCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.usersGetFollowedUsers,
    },
  },
})

const usersGetFollowedUsersSuccess = (state, action) => update(state, {
  usersGetFollowedUsersCache: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetFollowedUsers,
    },
  },
})

const usersGetFollowedUsersFailure = (state, action) => update(state, {
  usersGetFollowedUsersCache: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetFollowedUsers,
    },
  },
})

const usersGetFollowedUsersIdle = (state, action) => update(state, {
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
  usersGetFollowerUsersCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.usersGetFollowerUsers,
    },
  },
})

const usersGetFollowerUsersSuccess = (state, action) => update(state, {
  usersGetFollowerUsersCache: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetFollowerUsers,
    },
  },
})

const usersGetFollowerUsersFailure = (state, action) => update(state, {
  usersGetFollowerUsersCache: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.usersGetFollowerUsers,
    },
  },
})

const usersGetFollowerUsersIdle = (state, action) => update(state, {
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
    error: { $set: action.payload.message },
  },
})

const usersGetPendingFollowersIdle = (state) => update(state, {
  usersGetPendingFollowers: {
    data: { $set: initialState.usersGetPendingFollowers.data },
    error: { $set: initialState.usersGetPendingFollowers.error },
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
})

const usersFollowSuccess = (state, action) => update(state, {
  usersFollow: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersFollowFailure = (state, action) => update(state, {
  usersFollow: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersFollowIdle = (state) => update(state, {
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
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersUnfollowFailure = (state, action) => update(state, {
  usersUnfollow: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersUnfollowIdle = (state) => update(state, {
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
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersAcceptFollowerUserFailure = (state, action) => update(state, {
  usersAcceptFollowerUser: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersAcceptFollowerUserIdle = (state) => update(state, {
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
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersBlockFailure = (state, action) => update(state, {
  usersBlock: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersBlockIdle = (state) => update(state, {
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
})

const usersUnblockFailure = (state, action) => update(state, {
  usersUnblock: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersUnblockIdle = (state) => update(state, {
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
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersGetProfileFailure = (state, action) => update(state, {
  usersGetProfile: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersGetProfileIdle = (state) => update(state, {
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
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersGetProfileSelfFailure = (state, action) => update(state, {
  usersGetProfileSelf: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersGetProfileSelfIdle = (state) => update(state, {
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
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersEditProfileFailure = (state, action) => update(state, {
  usersEditProfile: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersEditProfileIdle = (state) => update(state, {
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

const usersImagePostsGetIdle = (state) => update(state, {
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
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersGetTrendingUsersFailure = (state, action) => update(state, {
  usersGetTrendingUsers: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersGetTrendingUsersIdle = (state) => update(state, {
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

const usersGetCardsIdle = (state) => update(state, {
  usersGetCards: {
    data: { $set: initialState.usersGetCards.data },
    error: { $set: initialState.usersGetCards.error },
    status: { $set: 'idle' },
  },
})

const usersGetCardsOptimistic = (state, action) => update(state, {
  usersGetCards: {
    data: { $set: state.usersGetCards.data.filter(card => card.cardId !== action.payload.cardId) },
  },
})

/**
 *
 */
const usersDeleteCardRequest = (state, action) => update(state, {
  usersDeleteCard: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersDeleteCardSuccess = (state, action) => update(state, {
  usersDeleteCard: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersDeleteCardFailure = (state, action) => update(state, {
  usersDeleteCard: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersDeleteCardIdle = (state) => update(state, {
  usersDeleteCard: {
    data: { $set: initialState.usersGetCards.data },
    error: { $set: initialState.usersGetCards.error },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersDeleteAvatarRequest = (state) => update(state, {
  usersDeleteAvatar: {
    status: { $set: 'loading' },
  },
})

const usersDeleteAvatarSuccess = (state) => update(state, {
  usersDeleteAvatar: {
    status: { $set: 'success' },
  },
})

const usersDeleteAvatarFailure = (state, action) => update(state, {
  usersDeleteAvatar: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersDeleteAvatarIdle = (state) => update(state, {
  usersDeleteAvatar: {
    error: { $set: initialState.usersDeleteAvatar.error },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersSetApnsTokenRequest = (state, action) => update(state, {
  usersSetApnsToken: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersSetApnsTokenSuccess = (state, action) => update(state, {
  usersSetApnsToken: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersSetApnsTokenFailure = (state, action) => update(state, {
  usersSetApnsToken: {
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
  },
})

const usersSetApnsTokenIdle = (state) => update(state, {
  usersSetApnsToken: {
    data: { $set: initialState.usersSetApnsToken.data },
    error: { $set: initialState.usersSetApnsToken.error },
    status: { $set: 'idle' },
  },
})

export default handleActions({
  [constants.USERS_SEARCH_REQUEST]: usersSearchRequest,
  [constants.USERS_SEARCH_SUCCESS]: usersSearchSuccess,
  [constants.USERS_SEARCH_FAILURE]: usersSearchFailure,
  [constants.USERS_SEARCH_IDLE]: usersSearchIdle,

  [constants.USERS_GET_TRENDING_USERS_REQUEST]: usersGetTrendingUsersRequest,
  [constants.USERS_GET_TRENDING_USERS_SUCCESS]: usersGetTrendingUsersSuccess,
  [constants.USERS_GET_TRENDING_USERS_FAILURE]: usersGetTrendingUsersFailure,
  [constants.USERS_GET_TRENDING_USERS_IDLE]: usersGetTrendingUsersIdle,

  [constants.USERS_DELETE_REQUEST]: usersDeleteRequest,
  [constants.USERS_DELETE_SUCCESS]: usersDeleteSuccess,
  [constants.USERS_DELETE_FAILURE]: usersDeleteFailure,
  [constants.USERS_DELETE_IDLE]: usersDeleteIdle,

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
  [constants.USERS_GET_CARDS_OPTIMISTIC]: usersGetCardsOptimistic,

  [constants.USERS_DELETE_CARD_REQUEST]: usersDeleteCardRequest,
  [constants.USERS_DELETE_CARD_SUCCESS]: usersDeleteCardSuccess,
  [constants.USERS_DELETE_CARD_FAILURE]: usersDeleteCardFailure,
  [constants.USERS_DELETE_CARD_IDLE]: usersDeleteCardIdle,

  [constants.USERS_SET_APNS_TOKEN_REQUEST]: usersSetApnsTokenRequest,
  [constants.USERS_SET_APNS_TOKEN_SUCCESS]: usersSetApnsTokenSuccess,
  [constants.USERS_SET_APNS_TOKEN_FAILURE]: usersSetApnsTokenFailure,
  [constants.USERS_SET_APNS_TOKEN_IDLE]: usersSetApnsTokenIdle,

  [constants.USERS_DELETE_AVATAR_REQUEST]: usersDeleteAvatarRequest,
  [constants.USERS_DELETE_AVATAR_SUCCESS]: usersDeleteAvatarSuccess,
  [constants.USERS_DELETE_AVATAR_FAILURE]: usersDeleteAvatarFailure,
  [constants.USERS_DELETE_AVATAR_IDLE]: usersDeleteAvatarIdle,

  /**
   * Clear on logout
   */
  ['AUTH_SIGNOUT_REQUEST']: () => initialState,
}, initialState)
