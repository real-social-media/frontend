import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/users/constants'

export const usersResourcePoolMerge = createAction('USERS_RESOURCE_POOL_MERGE')

export const globalAuthUserTrigger = createAction('GLOBAL_AUTH_USER_TRIGGER')

/**
 * 
 */
export const usersSearchIdle = createAction(constants.USERS_SEARCH_IDLE)
export const usersSearchRequest = createAction(constants.USERS_SEARCH_REQUEST)
export const usersSearchSuccess = createAction(constants.USERS_SEARCH_SUCCESS)
export const usersSearchFailure = createAction(constants.USERS_SEARCH_FAILURE)

/**
 * 
 */
export const usersGetFollowedUsersWithStoriesIdle = createAction(constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_IDLE)
export const usersGetFollowedUsersWithStoriesRequest = createAction(constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_REQUEST)
export const usersGetFollowedUsersWithStoriesSuccess = createAction(constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_SUCCESS)
export const usersGetFollowedUsersWithStoriesFailure = createAction(constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_FAILURE)

/**
 * 
 */
export const usersGetFollowerUsersIdle = createAction(constants.USERS_GET_FOLLOWER_USERS_IDLE)
export const usersGetFollowerUsersRequest = createAction(constants.USERS_GET_FOLLOWER_USERS_REQUEST)
export const usersGetFollowerUsersSuccess = createAction(constants.USERS_GET_FOLLOWER_USERS_SUCCESS)
export const usersGetFollowerUsersFailure = createAction(constants.USERS_GET_FOLLOWER_USERS_FAILURE)

/**
 * 
 */
export const usersGetFollowedUsersIdle = createAction(constants.USERS_GET_FOLLOWED_USERS_IDLE)
export const usersGetFollowedUsersRequest = createAction(constants.USERS_GET_FOLLOWED_USERS_REQUEST)
export const usersGetFollowedUsersSuccess = createAction(constants.USERS_GET_FOLLOWED_USERS_SUCCESS)
export const usersGetFollowedUsersFailure = createAction(constants.USERS_GET_FOLLOWED_USERS_FAILURE)

/**
 * 
 */
export const usersGetPendingFollowersIdle = createAction(constants.USERS_GET_PENDING_FOLLOWERS_IDLE)
export const usersGetPendingFollowersRequest = createAction(constants.USERS_GET_PENDING_FOLLOWERS_REQUEST)
export const usersGetPendingFollowersSuccess = createAction(constants.USERS_GET_PENDING_FOLLOWERS_SUCCESS)
export const usersGetPendingFollowersFailure = createAction(constants.USERS_GET_PENDING_FOLLOWERS_FAILURE)

/**
 * 
 */
export const usersAcceptFollowerUserIdle = createAction(constants.USERS_ACCEPT_FOLLOWER_USER_IDLE)
export const usersAcceptFollowerUserRequest = createAction(constants.USERS_ACCEPT_FOLLOWER_USER_REQUEST)
export const usersAcceptFollowerUserSuccess = createAction(constants.USERS_ACCEPT_FOLLOWER_USER_SUCCESS)
export const usersAcceptFollowerUserFailure = createAction(constants.USERS_ACCEPT_FOLLOWER_USER_FAILURE)

/**
 * 
 */
export const usersDeclineFollowerUserIdle = createAction(constants.USERS_DECLINE_FOLLOWER_USER_IDLE)
export const usersDeclineFollowerUserRequest = createAction(constants.USERS_DECLINE_FOLLOWER_USER_REQUEST)
export const usersDeclineFollowerUserSuccess = createAction(constants.USERS_DECLINE_FOLLOWER_USER_SUCCESS)
export const usersDeclineFollowerUserFailure = createAction(constants.USERS_DECLINE_FOLLOWER_USER_FAILURE)

/**
 * 
 */
export const usersFollowIdle = createAction(constants.USERS_FOLLOW_IDLE)
export const usersFollowRequest = createAction(constants.USERS_FOLLOW_REQUEST)
export const usersFollowSuccess = createAction(constants.USERS_FOLLOW_SUCCESS)
export const usersFollowFailure = createAction(constants.USERS_FOLLOW_FAILURE)


/**
 * 
 */
export const usersUnfollowIdle = createAction(constants.USERS_UNFOLLOW_IDLE)
export const usersUnfollowRequest = createAction(constants.USERS_UNFOLLOW_REQUEST)
export const usersUnfollowSuccess = createAction(constants.USERS_UNFOLLOW_SUCCESS)
export const usersUnfollowFailure = createAction(constants.USERS_UNFOLLOW_FAILURE)

/**
 * 
 */
export const usersBlockIdle = createAction(constants.USERS_BLOCK_IDLE)
export const usersBlockRequest = createAction(constants.USERS_BLOCK_REQUEST)
export const usersBlockSuccess = createAction(constants.USERS_BLOCK_SUCCESS)
export const usersBlockFailure = createAction(constants.USERS_BLOCK_FAILURE)

/**
 * 
 */
export const usersUnblockIdle = createAction(constants.USERS_UNBLOCK_IDLE)
export const usersUnblockRequest = createAction(constants.USERS_UNBLOCK_REQUEST)
export const usersUnblockSuccess = createAction(constants.USERS_UNBLOCK_SUCCESS)
export const usersUnblockFailure = createAction(constants.USERS_UNBLOCK_FAILURE)

/**
 * 
 */
export const usersGetProfileIdle = createAction(constants.USERS_GET_PROFILE_IDLE)
export const usersGetProfileRequest = createAction(constants.USERS_GET_PROFILE_REQUEST)
export const usersGetProfileSuccess = createAction(constants.USERS_GET_PROFILE_SUCCESS)
export const usersGetProfileFailure = createAction(constants.USERS_GET_PROFILE_FAILURE)

/**
 * 
 */
export const usersGetProfileSelfIdle = createAction(constants.USERS_GET_PROFILE_SELF_IDLE)
export const usersGetProfileSelfRequest = createAction(constants.USERS_GET_PROFILE_SELF_REQUEST)
export const usersGetProfileSelfSuccess = createAction(constants.USERS_GET_PROFILE_SELF_SUCCESS)
export const usersGetProfileSelfFailure = createAction(constants.USERS_GET_PROFILE_SELF_FAILURE)

/**
 * 
 */
export const usersEditProfileIdle = createAction(constants.USERS_EDIT_PROFILE_IDLE)
export const usersEditProfileRequest = createAction(constants.USERS_EDIT_PROFILE_REQUEST)
export const usersEditProfileSuccess = createAction(constants.USERS_EDIT_PROFILE_SUCCESS)
export const usersEditProfileFailure = createAction(constants.USERS_EDIT_PROFILE_FAILURE)

/**
 * 
 */
export const usersImagePostsGetIdle = createAction(constants.USERS_IMAGE_POSTS_GET_IDLE)
export const usersImagePostsGetRequest = createAction(constants.USERS_IMAGE_POSTS_GET_REQUEST)
export const usersImagePostsGetSuccess = createAction(constants.USERS_IMAGE_POSTS_GET_SUCCESS)
export const usersImagePostsGetFailure = createAction(constants.USERS_IMAGE_POSTS_GET_FAILURE)

/**
 * 
 */
export const usersGetTrendingUsersIdle = createAction(constants.USERS_GET_TRENDING_USERS_IDLE)
export const usersGetTrendingUsersRequest = createAction(constants.USERS_GET_TRENDING_USERS_REQUEST)
export const usersGetTrendingUsersSuccess = createAction(constants.USERS_GET_TRENDING_USERS_SUCCESS)
export const usersGetTrendingUsersFailure = createAction(constants.USERS_GET_TRENDING_USERS_FAILURE)

/**
 * 
 */
export const usersGetCardsIdle = createAction(constants.USERS_GET_CARDS_IDLE)
export const usersGetCardsRequest = createAction(constants.USERS_GET_CARDS_REQUEST)
export const usersGetCardsSuccess = createAction(constants.USERS_GET_CARDS_SUCCESS)
export const usersGetCardsFailure = createAction(constants.USERS_GET_CARDS_FAILURE)
