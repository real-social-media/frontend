import { createAction } from 'redux-actions'
import { createFailureAction } from 'store/errors'
import { createActionWithMeta } from 'store/helpers'
import * as constants from 'store/ducks/users/constants'

/**
 *
 */
export const usersSearchIdle = createAction(constants.USERS_SEARCH_IDLE)
export const usersSearchRequest = createAction(constants.USERS_SEARCH_REQUEST)
export const usersSearchSuccess = createAction(constants.USERS_SEARCH_SUCCESS)
export const usersSearchFailure = createFailureAction(constants.USERS_SEARCH_FAILURE)

/**
 *
 */
export const usersDeleteIdle = createAction(constants.USERS_DELETE_IDLE)
export const usersDeleteRequest = createAction(constants.USERS_DELETE_REQUEST)
export const usersDeleteSuccess = createAction(constants.USERS_DELETE_SUCCESS)
export const usersDeleteFailure = createFailureAction(constants.USERS_DELETE_FAILURE)

/**
 *
 */
export const usersGetFollowedUsersWithStoriesIdle = createAction(constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_IDLE)
export const usersGetFollowedUsersWithStoriesRequest = createAction(constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_REQUEST)
export const usersGetFollowedUsersWithStoriesSuccess = createAction(constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_SUCCESS)
export const usersGetFollowedUsersWithStoriesFailure = createFailureAction(constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_FAILURE)

/**
 *
 */
export const usersGetFollowerUsersIdle = createAction(constants.USERS_GET_FOLLOWER_USERS_IDLE)
export const usersGetFollowerUsersRequest = createAction(constants.USERS_GET_FOLLOWER_USERS_REQUEST)
export const usersGetFollowerUsersSuccess = createAction(constants.USERS_GET_FOLLOWER_USERS_SUCCESS)
export const usersGetFollowerUsersFailure = createFailureAction(constants.USERS_GET_FOLLOWER_USERS_FAILURE)

/**
 *
 */
export const usersGetFollowedUsersIdle = createAction(constants.USERS_GET_FOLLOWED_USERS_IDLE)
export const usersGetFollowedUsersRequest = createAction(constants.USERS_GET_FOLLOWED_USERS_REQUEST)
export const usersGetFollowedUsersSuccess = createAction(constants.USERS_GET_FOLLOWED_USERS_SUCCESS)
export const usersGetFollowedUsersFailure = createFailureAction(constants.USERS_GET_FOLLOWED_USERS_FAILURE)

/**
 *
 */
export const usersGetPendingFollowersIdle = createAction(constants.USERS_GET_PENDING_FOLLOWERS_IDLE)
export const usersGetPendingFollowersRequest = createAction(constants.USERS_GET_PENDING_FOLLOWERS_REQUEST)
export const usersGetPendingFollowersSuccess = createAction(constants.USERS_GET_PENDING_FOLLOWERS_SUCCESS)
export const usersGetPendingFollowersFailure = createFailureAction(constants.USERS_GET_PENDING_FOLLOWERS_FAILURE)

/**
 *
 */
export const usersAcceptFollowerUserIdle = createAction(constants.USERS_ACCEPT_FOLLOWER_USER_IDLE)
export const usersAcceptFollowerUserRequest = createAction(constants.USERS_ACCEPT_FOLLOWER_USER_REQUEST)
export const usersAcceptFollowerUserSuccess = createAction(constants.USERS_ACCEPT_FOLLOWER_USER_SUCCESS)
export const usersAcceptFollowerUserFailure = createFailureAction(constants.USERS_ACCEPT_FOLLOWER_USER_FAILURE)

/**
 *
 */
export const usersDeclineFollowerUserIdle = createAction(constants.USERS_DECLINE_FOLLOWER_USER_IDLE)
export const usersDeclineFollowerUserRequest = createAction(constants.USERS_DECLINE_FOLLOWER_USER_REQUEST)
export const usersDeclineFollowerUserSuccess = createAction(constants.USERS_DECLINE_FOLLOWER_USER_SUCCESS)
export const usersDeclineFollowerUserFailure = createFailureAction(constants.USERS_DECLINE_FOLLOWER_USER_FAILURE)

/**
 *
 */
export const usersFollowIdle = createAction(constants.USERS_FOLLOW_IDLE)
export const usersFollowRequest = createAction(constants.USERS_FOLLOW_REQUEST)
export const usersFollowSuccess = createAction(constants.USERS_FOLLOW_SUCCESS)
export const usersFollowFailure = createFailureAction(constants.USERS_FOLLOW_FAILURE)


/**
 *
 */
export const usersUnfollowIdle = createAction(constants.USERS_UNFOLLOW_IDLE)
export const usersUnfollowRequest = createAction(constants.USERS_UNFOLLOW_REQUEST)
export const usersUnfollowSuccess = createAction(constants.USERS_UNFOLLOW_SUCCESS)
export const usersUnfollowFailure = createFailureAction(constants.USERS_UNFOLLOW_FAILURE)

/**
 *
 */
export const usersBlockIdle = createAction(constants.USERS_BLOCK_IDLE)
export const usersBlockRequest = createAction(constants.USERS_BLOCK_REQUEST)
export const usersBlockSuccess = createAction(constants.USERS_BLOCK_SUCCESS)
export const usersBlockFailure = createFailureAction(constants.USERS_BLOCK_FAILURE)

/**
 *
 */
export const usersUnblockIdle = createAction(constants.USERS_UNBLOCK_IDLE)
export const usersUnblockRequest = createAction(constants.USERS_UNBLOCK_REQUEST)
export const usersUnblockSuccess = createAction(constants.USERS_UNBLOCK_SUCCESS)
export const usersUnblockFailure = createFailureAction(constants.USERS_UNBLOCK_FAILURE)

/**
 *
 */
export const usersGetProfileIdle = createAction(constants.USERS_GET_PROFILE_IDLE)
export const usersGetProfileRequest = createAction(constants.USERS_GET_PROFILE_REQUEST)
export const usersGetProfileSuccess = createAction(constants.USERS_GET_PROFILE_SUCCESS)
export const usersGetProfileFailure = createFailureAction(constants.USERS_GET_PROFILE_FAILURE)

/**
 *
 */
export const usersEditProfileIdle = createAction(constants.USERS_EDIT_PROFILE_IDLE)
export const usersEditProfileRequest = createActionWithMeta(constants.USERS_EDIT_PROFILE_REQUEST)
export const usersEditProfileSuccess = createActionWithMeta(constants.USERS_EDIT_PROFILE_SUCCESS)
export const usersEditProfileFailure = createFailureAction(constants.USERS_EDIT_PROFILE_FAILURE)

/**
 *
 */
export const usersImagePostsGetIdle = createAction(constants.USERS_IMAGE_POSTS_GET_IDLE)
export const usersImagePostsGetRequest = createAction(constants.USERS_IMAGE_POSTS_GET_REQUEST)
export const usersImagePostsGetSuccess = createAction(constants.USERS_IMAGE_POSTS_GET_SUCCESS)
export const usersImagePostsGetFailure = createFailureAction(constants.USERS_IMAGE_POSTS_GET_FAILURE)

/**
 *
 */
export const usersGetTrendingUsersIdle = createAction(constants.USERS_GET_TRENDING_USERS_IDLE)
export const usersGetTrendingUsersRequest = createAction(constants.USERS_GET_TRENDING_USERS_REQUEST)
export const usersGetTrendingUsersSuccess = createAction(constants.USERS_GET_TRENDING_USERS_SUCCESS)
export const usersGetTrendingUsersFailure = createFailureAction(constants.USERS_GET_TRENDING_USERS_FAILURE)

/**
 *
 */
export const usersGetCardsIdle = createAction(constants.USERS_GET_CARDS_IDLE)
export const usersGetCardsRequest = createAction(constants.USERS_GET_CARDS_REQUEST)
export const usersGetCardsSuccess = createAction(constants.USERS_GET_CARDS_SUCCESS)
export const usersGetCardsFailure = createFailureAction(constants.USERS_GET_CARDS_FAILURE)
export const usersGetCardsOptimistic = createAction(constants.USERS_GET_CARDS_OPTIMISTIC)

/**
 *
 */
export const usersDeleteCardIdle = createAction(constants.USERS_DELETE_CARD_IDLE)
export const usersDeleteCardRequest = createAction(constants.USERS_DELETE_CARD_REQUEST)
export const usersDeleteCardSuccess = createAction(constants.USERS_DELETE_CARD_SUCCESS)
export const usersDeleteCardFailure = createFailureAction(constants.USERS_DELETE_CARD_FAILURE)

/**
 *
 */
export const usersDeleteAvatarIdle = createAction(constants.USERS_DELETE_AVATAR_IDLE)
export const usersDeleteAvatarRequest = createAction(constants.USERS_DELETE_AVATAR_REQUEST)
export const usersDeleteAvatarSuccess = createAction(constants.USERS_DELETE_AVATAR_SUCCESS)
export const usersDeleteAvatarFailure = createFailureAction(constants.USERS_DELETE_AVATAR_FAILURE)

/**
 *
 */
export const usersChangeAvatarIdle = createAction(constants.USERS_CHANGE_AVATAR_IDLE)
export const usersChangeAvatarRequest = createAction(constants.USERS_CHANGE_AVATAR_REQUEST)
export const usersChangeAvatarSuccess = createAction(constants.USERS_CHANGE_AVATAR_SUCCESS)
export const usersChangeAvatarFailure = createFailureAction(constants.USERS_CHANGE_AVATAR_FAILURE)

/**
 *
 */
export const usersCreateAvatarIdle = createAction(constants.USERS_CREATE_AVATAR_IDLE)
export const usersCreateAvatarRequest = createAction(constants.USERS_CREATE_AVATAR_REQUEST)
export const usersCreateAvatarSuccess = createAction(constants.USERS_CREATE_AVATAR_SUCCESS)
export const usersCreateAvatarFailure = createFailureAction(constants.USERS_CREATE_AVATAR_FAILURE)

/**
 *
 */
export const usersReportScreenViewsIdle = createAction(constants.USERS_REPORT_SCREEN_VIEWS_IDLE)
export const usersReportScreenViewsRequest = createAction(constants.USERS_REPORT_SCREEN_VIEWS_REQUEST)
export const usersReportScreenViewsSuccess = createAction(constants.USERS_REPORT_SCREEN_VIEWS_SUCCESS)
export const usersReportScreenViewsFailure = createFailureAction(constants.USERS_REPORT_SCREEN_VIEWS_FAILURE)

/**
 *
 */
export const usersSetUserDatingStatusIdle = createAction(constants.USERS_SET_USER_DATING_STATUS_IDLE)
export const usersSetUserDatingStatusRequest = createAction(constants.USERS_SET_USER_DATING_STATUS_REQUEST)
export const usersSetUserDatingStatusSuccess = createAction(constants.USERS_SET_USER_DATING_STATUS_SUCCESS)
export const usersSetUserDatingStatusFailure = createFailureAction(constants.USERS_SET_USER_DATING_STATUS_FAILURE)
