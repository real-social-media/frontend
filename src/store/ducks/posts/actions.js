import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/posts/constants'

/**
 * 
 */
export const postsGetIdle = createAction(constants.POSTS_GET_IDLE)
export const postsGetRequest = createAction(constants.POSTS_GET_REQUEST)
export const postsGetSuccess = createAction(constants.POSTS_GET_SUCCESS)
export const postsGetFailure = createAction(constants.POSTS_GET_FAILURE)

export const postsGetMoreIdle = createAction(constants.POSTS_GET_MORE_IDLE)
export const postsGetMoreRequest = createAction(constants.POSTS_GET_MORE_REQUEST)
export const postsGetMoreSuccess = createAction(constants.POSTS_GET_MORE_SUCCESS)
export const postsGetMoreFailure = createAction(constants.POSTS_GET_MORE_FAILURE)

export const postsViewsGetIdle = createAction(constants.POSTS_VIEWS_GET_IDLE)
export const postsViewsGetRequest = createAction(constants.POSTS_VIEWS_GET_REQUEST)
export const postsViewsGetSuccess = createAction(constants.POSTS_VIEWS_GET_SUCCESS)
export const postsViewsGetFailure = createAction(constants.POSTS_VIEWS_GET_FAILURE)

/**
 * 
 */
export const postsFeedGetIdle = createAction(constants.POSTS_FEED_GET_IDLE)
export const postsFeedGetRequest = createAction(constants.POSTS_FEED_GET_REQUEST)
export const postsFeedGetSuccess = createAction(constants.POSTS_FEED_GET_SUCCESS)
export const postsFeedGetFailure = createAction(constants.POSTS_FEED_GET_FAILURE)

export const postsFeedGetMoreIdle = createAction(constants.POSTS_FEED_GET_MORE_IDLE)
export const postsFeedGetMoreRequest = createAction(constants.POSTS_FEED_GET_MORE_REQUEST)
export const postsFeedGetMoreSuccess = createAction(constants.POSTS_FEED_GET_MORE_SUCCESS)
export const postsFeedGetMoreFailure = createAction(constants.POSTS_FEED_GET_MORE_FAILURE)

/**
 * 
 */
export const postsGetArchivedIdle = createAction(constants.POSTS_GET_ARCHIVED_IDLE)
export const postsGetArchivedRequest = createAction(constants.POSTS_GET_ARCHIVED_REQUEST)
export const postsGetArchivedSuccess = createAction(constants.POSTS_GET_ARCHIVED_SUCCESS)
export const postsGetArchivedFailure = createAction(constants.POSTS_GET_ARCHIVED_FAILURE)

/**
 * 
 */
export const postsEditIdle = createAction(constants.POSTS_EDIT_IDLE)
export const postsEditRequest = createAction(constants.POSTS_EDIT_REQUEST)
export const postsEditSuccess = createAction(constants.POSTS_EDIT_SUCCESS)
export const postsEditFailure = createAction(constants.POSTS_EDIT_FAILURE)

/**
 * 
 */
export const postsDeleteIdle = createAction(constants.POSTS_DELETE_IDLE)
export const postsDeleteRequest = createAction(constants.POSTS_DELETE_REQUEST)
export const postsDeleteSuccess = createAction(constants.POSTS_DELETE_SUCCESS)
export const postsDeleteFailure = createAction(constants.POSTS_DELETE_FAILURE)

/**
 * 
 */
export const postsArchiveIdle = createAction(constants.POSTS_ARCHIVE_IDLE)
export const postsArchiveRequest = createAction(constants.POSTS_ARCHIVE_REQUEST)
export const postsArchiveSuccess = createAction(constants.POSTS_ARCHIVE_SUCCESS)
export const postsArchiveFailure = createAction(constants.POSTS_ARCHIVE_FAILURE)

/**
 * 
 */
export const postsRestoreArchivedIdle = createAction(constants.POSTS_RESTORE_ARCHIVED_IDLE)
export const postsRestoreArchivedRequest = createAction(constants.POSTS_RESTORE_ARCHIVED_REQUEST)
export const postsRestoreArchivedSuccess = createAction(constants.POSTS_RESTORE_ARCHIVED_SUCCESS)
export const postsRestoreArchivedFailure = createAction(constants.POSTS_RESTORE_ARCHIVED_FAILURE)

/**
 * 
 */
export const postsFlagIdle = createAction(constants.POSTS_FLAG_IDLE)
export const postsFlagRequest = createAction(constants.POSTS_FLAG_REQUEST)
export const postsFlagSuccess = createAction(constants.POSTS_FLAG_SUCCESS)
export const postsFlagFailure = createAction(constants.POSTS_FLAG_FAILURE)

/**
 * 
 */
export const postsSingleGetIdle = createAction(constants.POSTS_SINGLE_GET_IDLE)
export const postsSingleGetRequest = createAction(constants.POSTS_SINGLE_GET_REQUEST)
export const postsSingleGetSuccess = createAction(constants.POSTS_SINGLE_GET_SUCCESS)
export const postsSingleGetFailure = createAction(constants.POSTS_SINGLE_GET_FAILURE)

/**
 * 
 */
export const postsShareIdle = createAction(constants.POSTS_SHARE_IDLE)
export const postsShareRequest = createAction(constants.POSTS_SHARE_REQUEST)
export const postsShareSuccess = createAction(constants.POSTS_SHARE_SUCCESS)
export const postsShareFailure = createAction(constants.POSTS_SHARE_FAILURE)

/**
 * 
 */
export const postsStoriesGetIdle = createAction(constants.POSTS_STORIES_GET_IDLE)
export const postsStoriesGetRequest = createAction(constants.POSTS_STORIES_GET_REQUEST)
export const postsStoriesGetSuccess = createAction(constants.POSTS_STORIES_GET_SUCCESS)
export const postsStoriesGetFailure = createAction(constants.POSTS_STORIES_GET_FAILURE)

/**
 * 
 */
export const postsCreateIdle = createAction(constants.POSTS_CREATE_IDLE)
export const postsCreateRequest = createAction(constants.POSTS_CREATE_REQUEST)
export const postsCreateSuccess = createAction(constants.POSTS_CREATE_SUCCESS)
export const postsCreateFailure = createAction(constants.POSTS_CREATE_FAILURE)
export const postsCreateProgress = createAction(constants.POSTS_CREATE_PROGRESS)

/**
 * 
 */
export const postsCreateSchedulerRequest = createAction(constants.POSTS_CREATE_SCHEDULER_REQUEST)
export const postsCreateSchedulerSuccess = createAction(constants.POSTS_CREATE_SCHEDULER_SUCCESS)
export const postsCreateSchedulerFailure = createAction(constants.POSTS_CREATE_SCHEDULER_FAILURE)
export const postsCreateSchedulerIdle = createAction(constants.POSTS_CREATE_SCHEDULER_IDLE)


/**
 * 
 */
export const postsAnonymouslyLikeIdle = createAction(constants.POSTS_ANONYMOUSLY_LIKE_IDLE)
export const postsAnonymouslyLikeRequest = createAction(constants.POSTS_ANONYMOUSLY_LIKE_REQUEST)
export const postsAnonymouslyLikeSuccess = createAction(constants.POSTS_ANONYMOUSLY_LIKE_SUCCESS)
export const postsAnonymouslyLikeFailure = createAction(constants.POSTS_ANONYMOUSLY_LIKE_FAILURE)

/**
 * 
 */
export const postsOnymouslyLikeIdle = createAction(constants.POSTS_ONYMOUSLY_LIKE_IDLE)
export const postsOnymouslyLikeRequest = createAction(constants.POSTS_ONYMOUSLY_LIKE_REQUEST)
export const postsOnymouslyLikeSuccess = createAction(constants.POSTS_ONYMOUSLY_LIKE_SUCCESS)
export const postsOnymouslyLikeFailure = createAction(constants.POSTS_ONYMOUSLY_LIKE_FAILURE)

/**
 * 
 */
export const postsDislikeIdle = createAction(constants.POSTS_DISLIKE_IDLE)
export const postsDislikeRequest = createAction(constants.POSTS_DISLIKE_REQUEST)
export const postsDislikeSuccess = createAction(constants.POSTS_DISLIKE_SUCCESS)
export const postsDislikeFailure = createAction(constants.POSTS_DISLIKE_FAILURE)

/**
 * 
 */
export const postsReportPostViewsIdle = createAction(constants.POSTS_REPORT_POST_VIEWS_IDLE)
export const postsReportPostViewsRequest = createAction(constants.POSTS_REPORT_POST_VIEWS_REQUEST)
export const postsReportPostViewsSuccess = createAction(constants.POSTS_REPORT_POST_VIEWS_SUCCESS)
export const postsReportPostViewsFailure = createAction(constants.POSTS_REPORT_POST_VIEWS_FAILURE)

/**
 * 
 */
export const postsGetTrendingPostsIdle = createAction(constants.POSTS_GET_TRENDING_POSTS_IDLE)
export const postsGetTrendingPostsRequest = createAction(constants.POSTS_GET_TRENDING_POSTS_REQUEST)
export const postsGetTrendingPostsSuccess = createAction(constants.POSTS_GET_TRENDING_POSTS_SUCCESS)
export const postsGetTrendingPostsFailure = createAction(constants.POSTS_GET_TRENDING_POSTS_FAILURE)

export const postsGetTrendingPostsMoreIdle = createAction(constants.POSTS_GET_TRENDING_POSTS_MORE_IDLE)
export const postsGetTrendingPostsMoreRequest = createAction(constants.POSTS_GET_TRENDING_POSTS_MORE_REQUEST)
export const postsGetTrendingPostsMoreSuccess = createAction(constants.POSTS_GET_TRENDING_POSTS_MORE_SUCCESS)
export const postsGetTrendingPostsMoreFailure = createAction(constants.POSTS_GET_TRENDING_POSTS_MORE_FAILURE)

/**
 * 
 */
export const postsCommentsGetIdle = createAction(constants.POSTS_COMMENTS_GET_IDLE)
export const postsCommentsGetRequest = createAction(constants.POSTS_COMMENTS_GET_REQUEST)
export const postsCommentsGetSuccess = createAction(constants.POSTS_COMMENTS_GET_SUCCESS)
export const postsCommentsGetFailure = createAction(constants.POSTS_COMMENTS_GET_FAILURE)

export const commentsAddIdle = createAction(constants.COMMENTS_ADD_IDLE)
export const commentsAddRequest = createAction(constants.COMMENTS_ADD_REQUEST)
export const commentsAddSuccess = createAction(constants.COMMENTS_ADD_SUCCESS)
export const commentsAddFailure = createAction(constants.COMMENTS_ADD_FAILURE)