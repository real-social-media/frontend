import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/users/constants'

export const initialState = {
  usersSearch: {
    data: [],
    status: 'idle',
    payload: {},
  },
  usersDelete: {
    status: 'idle',
  },
  usersGetFollowedUsersWithStories: {
    data: [],
    status: 'idle',
    payload: {},
  },
  usersGetFollowedUsers: {
    data: [],
    status: 'idle',
    payload: {},
  },
  usersGetFollowerUsers: {
    data: [],
    status: 'idle',
    payload: {},
  },
  usersGetPendingFollowers: {
    data: [],
    status: 'idle',
    payload: {},
  },
  usersFollow: {
    status: 'idle',
    payload: {},
  },
  usersAcceptFollowerUser: {
    status: 'idle',
    payload: {},
  },
  usersDeclineFollowerUser: {
    status: 'idle',
    payload: {},
  },
  usersUnfollow: {
    status: 'idle',
    payload: {},
  },
  usersBlock: {
    data: {},
    status: 'idle',
    payload: {},
  },
  usersUnblock: {
    data: {},
    status: 'idle',
    payload: {},
  },
  usersGetProfile: {
    data: {},
    status: 'idle',
    payload: {},
  },
  usersEditProfile: {
    data: {},
    status: 'idle',
    payload: {},
  },
  usersImagePostsGet: {
    data: [],
    status: 'idle',
    payload: {},
  },
  usersGetTrendingUsers: {
    data: [],
    status: 'idle',
    payload: {},
  },
  usersGetCards: {
    data: [],
    status: 'idle',
    payload: {},
  },
  usersDeleteCard: {
    data: [],
    status: 'idle',
    payload: {},
  },
  usersDeleteAvatar: {
    status: 'idle',
  },
  usersSetUserDatingStatus: {
    data: [],
    status: 'idle',
    payload: {},
  },
  usersChangeAvatar: {
    status: 'idle',
  },
  usersCreateAvatar: {
    status: 'idle',
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

const usersSearchFailure = (state) => update(state, {
  usersSearch: {
    status: { $set: 'failure' },
  },
})

const usersSearchIdle = (state) => update(state, {
  usersSearch: {
    data: { $set: initialState.usersSearch.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersDeleteRequest = (state) => update(state, {
  usersDelete: {
    status: { $set: 'loading' },
  },
})

const usersDeleteSuccess = (state) => update(state, {
  usersDelete: {
    status: { $set: 'success' },
  },
})

const usersDeleteFailure = (state) => update(state, {
  usersDelete: {
    status: { $set: 'failure' },
  },
})

const usersDeleteIdle = (state) => update(state, {
  usersDelete: {
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

const usersGetFollowedUsersWithStoriesFailure = (state) => update(state, {
  usersGetFollowedUsersWithStories: {
    status: { $set: 'failure' },
  },
})

const usersGetFollowedUsersWithStoriesIdle = (state) => update(state, {
  usersGetFollowedUsersWithStories: {
    data: { $set: initialState.usersGetFollowedUsersWithStories.data },
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
      resourceKey: action.meta.userId,
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
      resourceKey: action.meta.userId,
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

const usersGetPendingFollowersFailure = (state) => update(state, {
  usersGetPendingFollowers: {
    status: { $set: 'failure' },
  },
})

const usersGetPendingFollowersIdle = (state) => update(state, {
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
})

const usersFollowSuccess = (state) => update(state, {
  usersFollow: {
    status: { $set: 'success' },
  },
})

const usersFollowFailure = (state) => update(state, {
  usersFollow: {
    status: { $set: 'failure' },
  },
})

const usersFollowIdle = (state) => update(state, {
  usersFollow: {
    $set: initialState.usersFollow,
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

const usersUnfollowSuccess = (state) => update(state, {
  usersUnfollow: {
    status: { $set: 'success' },
  },
})

const usersUnfollowFailure = (state) => update(state, {
  usersUnfollow: {
    status: { $set: 'failure' },
  },
})

const usersUnfollowIdle = (state) => update(state, {
  usersUnfollow: {
    $set: initialState.usersUnfollow,
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

const usersAcceptFollowerUserSuccess = (state) => update(state, {
  usersAcceptFollowerUser: {
    status: { $set: 'success' },
  },
})

const usersAcceptFollowerUserFailure = (state) => update(state, {
  usersAcceptFollowerUser: {
    status: { $set: 'failure' },
  },
})

const usersAcceptFollowerUserIdle = (state) => update(state, {
  usersAcceptFollowerUser: {
    $set: initialState.usersAcceptFollowerUser,
  },
})

/**
 *
 */
const usersDeclineFollowerUserRequest = (state, action) => update(state, {
  usersDeclineFollowerUser: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersDeclineFollowerUserSuccess = (state) => update(state, {
  usersDeclineFollowerUser: {
    status: { $set: 'success' },
  },
})

const usersDeclineFollowerUserFailure = (state) => update(state, {
  usersDeclineFollowerUser: {
    status: { $set: 'failure' },
  },
})

const usersDeclineFollowerUserIdle = (state) => update(state, {
  usersDeclineFollowerUser: {
    $set: initialState.usersDeclineFollowerUser,
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

const usersBlockFailure = (state) => update(state, {
  usersBlock: {
    status: { $set: 'failure' },
  },
})

const usersBlockIdle = (state) => update(state, {
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
})

const usersUnblockSuccess = (state, action) => update(state, {
  usersUnblock: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersUnblockFailure = (state) => update(state, {
  usersUnblock: {
    status: { $set: 'failure' },
  },
})

const usersUnblockIdle = (state) => update(state, {
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
})

const usersGetProfileSuccess = (state, action) => update(state, {
  usersGetProfile: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersGetProfileFailure = (state) => update(state, {
  usersGetProfile: {
    status: { $set: 'failure' },
  },
})

const usersGetProfileIdle = (state) => update(state, {
  usersGetProfile: {
    data: { $set: initialState.usersGetProfile.data },
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

const usersEditProfileFailure = (state) => update(state, {
  usersEditProfile: {
    status: { $set: 'failure' },
  },
})

const usersEditProfileIdle = (state) => update(state, {
  usersEditProfile: {
    data: { $set: initialState.usersEditProfile.data },
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

const usersImagePostsGetFailure = (state) => update(state, {
  usersImagePostsGet: {
    status: { $set: 'failure' },
  },
})

const usersImagePostsGetIdle = (state) => update(state, {
  usersImagePostsGet: {
    data: { $set: initialState.usersImagePostsGet.data },
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

const usersGetTrendingUsersFailure = (state) => update(state, {
  usersGetTrendingUsers: {
    status: { $set: 'failure' },
  },
})

const usersGetTrendingUsersIdle = (state) => update(state, {
  usersGetTrendingUsers: {
    data: { $set: initialState.usersGetTrendingUsers.data },
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

const usersGetCardsFailure = (state) => update(state, {
  usersGetCards: {
    status: { $set: 'failure' },
  },
})

const usersGetCardsIdle = (state) => update(state, {
  usersGetCards: {
    data: { $set: initialState.usersGetCards.data },
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

const usersDeleteCardFailure = (state) => update(state, {
  usersDeleteCard: {
    status: { $set: 'failure' },
  },
})

const usersDeleteCardIdle = (state) => update(state, {
  usersDeleteCard: {
    data: { $set: initialState.usersGetCards.data },
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

const usersDeleteAvatarFailure = (state) => update(state, {
  usersDeleteAvatar: {
    status: { $set: 'failure' },
  },
})

const usersDeleteAvatarIdle = (state) => update(state, {
  usersDeleteAvatar: {
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const usersChangeAvatarRequest = (state) => update(state, {
  usersChangeAvatar: {
    status: { $set: 'loading' },
  },
})

const usersChangeAvatarSuccess = (state) => update(state, {
  usersChangeAvatar: {
    status: { $set: 'success' },
  },
})

const usersChangeAvatarFailure = (state) => update(state, {
  usersChangeAvatar: {
    status: { $set: 'failure' },
  },
})

const usersChangeAvatarIdle = (state) => update(state, {
  usersChangeAvatar: { $set: initialState.usersChangeAvatar },
})

/**
 *
 */
const usersCreateAvatarRequest = (state) => update(state, {
  usersCreateAvatar: {
    status: { $set: 'loading' },
  },
})

const usersCreateAvatarSuccess = (state) => update(state, {
  usersCreateAvatar: {
    status: { $set: 'success' },
  },
})

const usersCreateAvatarFailure = (state) => update(state, {
  usersCreateAvatar: {
    status: { $set: 'failure' },
  },
})

const usersCreateAvatarIdle = (state) => update(state, {
  usersCreateAvatar: { $set: initialState.usersCreateAvatar },
})

/**
 *
 */
const usersSetUserDatingStatusRequest = (state, action) => update(state, {
  usersSetUserDatingStatus: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const usersSetUserDatingStatusSuccess = (state, action) => update(state, {
  usersSetUserDatingStatus: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const usersSetUserDatingStatusFailure = (state) => update(state, {
  usersSetUserDatingStatus: {
    status: { $set: 'failure' },
  },
})

const usersSetUserDatingStatusIdle = (state) => update(state, {
  usersSetUserDatingStatus: {
    data: { $set: initialState.usersSetUserDatingStatus.data },
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

  [constants.USERS_DECLINE_FOLLOWER_USER_REQUEST]: usersDeclineFollowerUserRequest,
  [constants.USERS_DECLINE_FOLLOWER_USER_SUCCESS]: usersDeclineFollowerUserSuccess,
  [constants.USERS_DECLINE_FOLLOWER_USER_FAILURE]: usersDeclineFollowerUserFailure,
  [constants.USERS_DECLINE_FOLLOWER_USER_IDLE]: usersDeclineFollowerUserIdle,

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

  [constants.USERS_DELETE_AVATAR_REQUEST]: usersDeleteAvatarRequest,
  [constants.USERS_DELETE_AVATAR_SUCCESS]: usersDeleteAvatarSuccess,
  [constants.USERS_DELETE_AVATAR_FAILURE]: usersDeleteAvatarFailure,
  [constants.USERS_DELETE_AVATAR_IDLE]: usersDeleteAvatarIdle,

  [constants.USERS_SET_USER_DATING_STATUS_REQUEST]: usersSetUserDatingStatusRequest,
  [constants.USERS_SET_USER_DATING_STATUS_SUCCESS]: usersSetUserDatingStatusSuccess,
  [constants.USERS_SET_USER_DATING_STATUS_FAILURE]: usersSetUserDatingStatusFailure,
  [constants.USERS_SET_USER_DATING_STATUS_IDLE]: usersSetUserDatingStatusIdle,

  [constants.USERS_CHANGE_AVATAR_REQUEST]: usersChangeAvatarRequest,
  [constants.USERS_CHANGE_AVATAR_SUCCESS]: usersChangeAvatarSuccess,
  [constants.USERS_CHANGE_AVATAR_FAILURE]: usersChangeAvatarFailure,
  [constants.USERS_CHANGE_AVATAR_IDLE]: usersChangeAvatarIdle,

  [constants.USERS_CREATE_AVATAR_REQUEST]: usersCreateAvatarRequest,
  [constants.USERS_CREATE_AVATAR_SUCCESS]: usersCreateAvatarSuccess,
  [constants.USERS_CREATE_AVATAR_FAILURE]: usersCreateAvatarFailure,
  [constants.USERS_CREATE_AVATAR_IDLE]: usersCreateAvatarIdle,
}, initialState)
