import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/posts/constants'

const initialState = {
  postsGet: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsGetUnreadComments: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsViewsGet: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsLikesGet: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsGetArchived: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsEdit: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsDelete: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsArchive: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsRestoreArchived: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsFlag: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsSingleGet: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsFeedGet: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsCreate: {
    data: {},
    status: 'idle',
    error: {},
    payload: {
      images: [],
    },
    meta: {},
  },
  postsOnymouslyLike: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsAnonymouslyLike: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsDislike: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsShare: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsReportPostViews: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsReportCommentViews: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsGetTrendingPosts: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  postsCommentsGet: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  commentsAdd: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  commentsDelete: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },

  /**
   * postId -> { data: {} }
   */
  postsPool: {

  },

  postsCreateQueue: {},
  postsRecreateQueue: {},
  postsGetCache: {},
  postsCommentsGetCache: {},
  postsViewsGetCache: {},
  postsLikesGetCache: {},
}
 
const postsResourcePoolMerge = (state, action) => update(state, {
  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolMerge: {
      ...action,
      initialState: initialState.postsSingleGet,
    },
  }
})

/**
 *
 */
const postsGetRequest = (state, action) => update(state, {
  postsGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsGetSuccess = (state, action) => update(state, {
  postsGet: {
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
    meta: { $set: action.payload.meta },
  },
  
  /**
   * 
   */
  postsGetCache: {
    $postsResourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.postsGet,
    },
  },

  /**
   *
   */
  postsPool: {
    $postsResourcePoolMerge: {
      ...action,
      initialState: initialState.postsSingleGet,
    },
  },
})

const postsGetFailure = (state, action) => update(state, {
  postsGet: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
  },
})

const postsGetIdle = (state, action) => update(state, {
  postsGet: {
    status: { $set: 'idle' },
    payload: { $set: action.payload.payload },
  },
})

const postsGetMoreRequest = (state, action) => update(state, {
  postsGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsGetMoreSuccess = (state, action) => update(state, {
  postsGet: {
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
    meta: { $set: action.payload.meta },
  },

  /**
   * 
   */
  postsGetCache: {
    $postsResourceCachePushSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.postsGet,
    },
  },
  
  /**
   *
   */
  postsPool: {
    $postsResourcePoolMerge: {
      ...action,
      initialState: initialState.postsSingleGet,
    },
  },
})

/**
 *
 */
const postsGetUnreadCommentsRequest = (state, action) => update(state, {
  postsGetUnreadComments: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsGetUnreadCommentsSuccess = (state, action) => update(state, {
  postsGetUnreadComments: {
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
    meta: { $set: action.payload.meta },
  },
  
  /**
   * 
   */
  postsGetUnreadCommentsCache: {
    $postsResourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.postsGetUnreadComments,
    },
  },

  /**
   *
   */
  postsPool: {
    $postsResourcePoolMerge: {
      ...action,
      initialState: initialState.postsSingleGet,
    },
  },
})

const postsGetUnreadCommentsFailure = (state, action) => update(state, {
  postsGetUnreadComments: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
  },
})

const postsGetUnreadCommentsIdle = (state, action) => update(state, {
  postsGetUnreadComments: {
    status: { $set: 'idle' },
    payload: { $set: action.payload.payload },
  },
})


/**
 *
 */
const postsViewsGetRequest = (state, action) => update(state, {
  postsViewsGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsViewsGetSuccess = (state, action) => update(state, {
  postsViewsGet: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const postsViewsGetFailure = (state, action) => update(state, {
  postsViewsGet: {
    status: { $set: 'failure' },
  },
})

const postsViewsGetIdle = (state, action) => update(state, {
  postsViewsGet: {
    data: { $set: initialState.postsViewsGet.data },
    status: { $set: 'idle' },
  },
})

const postsViewsGetMoreRequest = (state, action) => update(state, {
  postsViewsGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsViewsGetMoreSuccess = (state, action) => update(state, {
  postsViewsGet: {
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})


/**
 *
 */
const postsLikesGetRequest = (state, action) => update(state, {
  postsLikesGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsLikesGetSuccess = (state, action) => update(state, {
  postsLikesGet: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const postsLikesGetFailure = (state, action) => update(state, {
  postsLikesGet: {
    status: { $set: 'failure' },
  },
})

const postsLikesGetIdle = (state, action) => update(state, {
  postsLikesGet: {
    data: { $set: initialState.postsLikesGet.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsGetArchivedRequest = (state, action) => update(state, {
  postsGetArchived: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsGetArchivedSuccess = (state, action) => update(state, {
  postsGetArchived: {
    data: { $postsResourceSetSuccess: action },
    status: { $set: 'success' },
  },

  /**
   * 
   */
  postsGetCache: {
    $postsResourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.postsGet,
    },
  },
  
  /**
   *
   */
  postsPool: {
    $postsResourcePoolMerge: {
      ...action,
      initialState: initialState.postsSingleGet,
    },
  },
})

const postsGetArchivedFailure = (state, action) => update(state, {
  postsGetArchived: {
    status: { $set: 'failure' },
  },
})

const postsGetArchivedIdle = (state, action) => update(state, {
  postsGetArchived: {
    data: { $set: initialState.postsGetArchived.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsEditRequest = (state, action) => update(state, {
  postsEdit: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsEditSuccess = (state, action) => update(state, {
  postsEdit: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolSet: action,
  },
})

const postsEditFailure = (state, action) => update(state, {
  postsEdit: {
    status: { $set: 'failure' },
  },
})

const postsEditIdle = (state, action) => update(state, {
  postsEdit: {
    data: { $set: initialState.postsEdit.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsDeleteRequest = (state, action) => update(state, {
  postsDelete: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsDeleteSuccess = (state, action) => update(state, {
  postsDelete: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },

  /**
   *
   */
  postsFeedGet: {
    data: { $postsResourceRemoveSuccess: action },
  },
})

const postsDeleteFailure = (state, action) => update(state, {
  postsDelete: {
    status: { $set: 'failure' },
  },
})

const postsDeleteIdle = (state, action) => update(state, {
  postsDelete: {
    data: { $set: initialState.postsDelete.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsArchiveRequest = (state, action) => update(state, {
  postsArchive: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsArchiveSuccess = (state, action) => update(state, {
  postsArchive: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolSet: action,
  },
})

const postsArchiveFailure = (state, action) => update(state, {
  postsArchive: {
    status: { $set: 'failure' },
  },
})

const postsArchiveIdle = (state, action) => update(state, {
  postsArchive: {
    data: { $set: initialState.postsArchive.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsRestoreArchivedRequest = (state, action) => update(state, {
  postsRestoreArchived: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsRestoreArchivedSuccess = (state, action) => update(state, {
  postsRestoreArchived: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolSet: action,
  },
})

const postsRestoreArchivedFailure = (state, action) => update(state, {
  postsRestoreArchived: {
    status: { $set: 'failure' },
  },
})

const postsRestoreArchivedIdle = (state, action) => update(state, {
  postsRestoreArchived: {
    data: { $set: initialState.postsRestoreArchived.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsFlagRequest = (state, action) => update(state, {
  postsFlag: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsFlagSuccess = (state, action) => update(state, {
  postsFlag: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolSet: action,
  },
})

const postsFlagFailure = (state, action) => update(state, {
  postsFlag: {
    status: { $set: 'failure' },
  },
})

const postsFlagIdle = (state, action) => update(state, {
  postsFlag: {
    data: { $set: initialState.postsFlag.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsSingleGetRequest = (state, action) => update(state, {
  postsSingleGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsSingleGetSuccess = (state, action) => update(state, {
  postsSingleGet: {
    status: { $set: 'success' },
  },
  
  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolSet: action,
  },
})

const postsSingleGetFailure = (state, action) => update(state, {
  postsSingleGet: {
    status: { $set: 'failure' },
  },
})

const postsSingleGetIdle = (state, action) => update(state, {
  postsSingleGet: {
    data: { $set: initialState.postsSingleGet.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsFeedGetRequest = (state, action) => update(state, {
  postsFeedGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
    meta: { $set: action.meta },
  },
})

const postsFeedGetSuccess = (state, action) => update(state, {
  postsFeedGet: {
    data: { $postsResourceSetSuccess: action },
    status: { $set: 'success' },
    meta: { $set: action.payload.meta },
  },

  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolMerge: {
      ...action,
      initialState: initialState.postsSingleGet,
    },
  },
})

const postsFeedGetFailure = (state, action) => update(state, {
  postsFeedGet: {
    status: { $set: 'failure' },
  },
})

const postsFeedGetIdle = (state, action) => update(state, {
  postsFeedGet: {
    data: { $set: initialState.postsFeedGet.data },
    status: { $set: 'idle' },
  },
})

const postsFeedGetMoreRequest = (state, action) => update(state, {
  postsFeedGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
    meta: { $set: action.meta },
  },
})

const postsFeedGetMoreSuccess = (state, action) => update(state, {
  postsFeedGet: {
    data: { $postsResourcePushSuccess: action },
    status: { $set: 'success' },
    meta: { $set: action.payload.meta },
  },

  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolMerge: {
      ...action,
      initialState: initialState.postsSingleGet,
    },
  },
})

/**
 *
 */
const postsCreateRequest = (state, action) => update(state, {
  postsCreate: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },

  /**
   *
   */
  postsCreateQueue: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.postId,
      initialState: initialState.postsCreate,
    },
  },
})

const postsCreateSuccess = (state, action) => update(state, {
  postsCreate: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },

  /**
   *
   */
  postsCreateQueue: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsCreate,
    },
  },
})

const postsCreateFailure = (state, action) => update(state, {
  postsCreate: {
    status: { $set: 'failure' },
  },

  /**
   *
   */
  postsCreateQueue: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsCreate,
    },
  },
})

const postsCreateIdle = (state, action) => update(state, {
  postsCreate: {
    data: { $set: initialState.postsCreate.data },
    status: { $set: 'idle' },
  },

  /**
   *
   */
  postsCreateQueue: {
    $resourceCacheSetRemove: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsCreate,
    },
  },
})

const postsCreateProgress = (state, action) => update(state, {
  postsCreate: {
    status: { $set: 'loading' },
    meta: { $set: action.payload.meta },
  },

  /**
   *
   */
  postsCreateQueue: {
    $resourceCacheAlterRequest: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsCreate,
    },
  },
})

/**
 *
 */
const postsOnymouslyLikeRequest = (state, action) => update(state, {
  postsOnymouslyLike: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsOnymouslyLikeSuccess = (state, action) => update(state, {
  postsOnymouslyLike: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolSet: action,
  },
})

const postsOnymouslyLikeFailure = (state, action) => update(state, {
  postsOnymouslyLike: {
    status: { $set: 'failure' },
  },
})

const postsOnymouslyLikeIdle = (state, action) => update(state, {
  postsOnymouslyLike: {
    data: { $set: initialState.postsOnymouslyLike.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsAnonymouslyLikeRequest = (state, action) => update(state, {
  postsAnonymouslyLike: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsAnonymouslyLikeSuccess = (state, action) => update(state, {
  postsAnonymouslyLike: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolSet: action,
  },
})

const postsAnonymouslyLikeFailure = (state, action) => update(state, {
  postsAnonymouslyLike: {
    status: { $set: 'failure' },
  },
})

const postsAnonymouslyLikeIdle = (state, action) => update(state, {
  postsAnonymouslyLike: {
    data: { $set: initialState.postsAnonymouslyLike.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsDislikeRequest = (state, action) => update(state, {
  postsDislike: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsDislikeSuccess = (state, action) => update(state, {
  postsDislike: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },

  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolSet: action,
  },
})

const postsDislikeFailure = (state, action) => update(state, {
  postsDislike: {
    status: { $set: 'failure' },
  },
})

const postsDislikeIdle = (state, action) => update(state, {
  postsDislike: {
    data: { $set: initialState.postsDislike.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsShareRequest = (state, action) => update(state, {
  postsShare: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsShareSuccess = (state, action) => update(state, {
  postsShare: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const postsShareFailure = (state, action) => update(state, {
  postsShare: {
    status: { $set: 'failure' },
  },
})

const postsShareIdle = (state, action) => update(state, {
  postsShare: {
    data: { $set: initialState.postsShare.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsReportPostViewsRequest = (state, action) => update(state, {
  postsReportPostViews: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsReportPostViewsSuccess = (state, action) => update(state, {
  postsReportPostViews: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const postsReportPostViewsFailure = (state, action) => update(state, {
  postsReportPostViews: {
    status: { $set: 'failure' },
  },
})

const postsReportPostViewsIdle = (state, action) => update(state, {
  postsReportPostViews: {
    data: { $set: initialState.postsReportPostViews.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsReportCommentViewsRequest = (state, action) => update(state, {
  postsReportCommentViews: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsReportCommentViewsSuccess = (state, action) => update(state, {
  postsReportCommentViews: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const postsReportCommentViewsFailure = (state, action) => update(state, {
  postsReportCommentViews: {
    status: { $set: 'failure' },
  },
})

const postsReportCommentViewsIdle = (state, action) => update(state, {
  postsReportCommentViews: {
    data: { $set: initialState.postsReportPostViews.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const postsGetTrendingPostsRequest = (state, action) => update(state, {
  postsGetTrendingPosts: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
    meta: { $set: action.meta },
  },
})

const postsGetTrendingPostsSuccess = (state, action) => update(state, {
  postsGetTrendingPosts: {
    data: { $postsResourceSetSuccess: action },
    status: { $set: 'success' },
    meta: { $set: action.payload.meta },
  },

  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolMerge: {
      ...action,
      initialState: initialState.postsSingleGet,
    },
  },
})

const postsGetTrendingPostsFailure = (state, action) => update(state, {
  postsGetTrendingPosts: {
    status: { $set: 'failure' },
  },
})

const postsGetTrendingPostsIdle = (state, action) => update(state, {
  postsGetTrendingPosts: {
    data: { $set: initialState.postsGetTrendingPosts.data },
    status: { $set: 'idle' },
  },
})

const postsGetTrendingPostsMoreRequest = (state, action) => update(state, {
  postsGetTrendingPosts: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
    meta: { $set: action.meta },
  },
})

const postsGetTrendingPostsMoreSuccess = (state, action) => update(state, {
  postsGetTrendingPosts: {
    data: { $postsResourcePushSuccess: action },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
    meta: { $set: action.payload.meta },
  },

  /**
   * User pool entry
   */
  postsPool: {
    $postsResourcePoolMerge: {
      ...action,
      initialState: initialState.postsSingleGet,
    },
  },
})

/**
 *
 */
const postsCommentsGetRequest = (state, action) => update(state, {
  postsCommentsGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsCommentsGetSuccess = (state, action) => update(state, {
  postsCommentsGet: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const postsCommentsGetFailure = (state, action) => update(state, {
  postsCommentsGet: {
    status: { $set: 'failure' },
  },
})

const postsCommentsGetIdle = (state, action) => update(state, {
  postsCommentsGet: {
    data: { $set: initialState.postsCommentsGet.data },
    status: { $set: 'idle' },
  },
})

/**
 * 
 */
const commentsAddRequest = (state, action) => update(state, {
  commentsAdd: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const commentsAddSuccess = (state, action) => update(state, {
  commentsAdd: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const commentsAddFailure = (state, action) => update(state, {
  commentsAdd: {
    status: { $set: 'failure' },
  },
})

const commentsAddIdle = (state, action) => update(state, {
  commentsAdd: {
    data: { $set: initialState.commentsAdd.data },
    status: { $set: 'idle' },
  },
})

/**
 * 
 */
const commentsDeleteRequest = (state, action) => update(state, {
  commentsDelete: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const commentsDeleteSuccess = (state, action) => update(state, {
  commentsDelete: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const commentsDeleteFailure = (state, action) => update(state, {
  commentsDelete: {
    status: { $set: 'failure' },
  },
})

const commentsDeleteIdle = (state, action) => update(state, {
  commentsDelete: {
    data: { $set: initialState.commentsDelete.data },
    status: { $set: 'idle' },
  },
})

export default handleActions({
  [constants.POSTS_RESOURCE_POOL_MERGE]: postsResourcePoolMerge,

  [constants.POSTS_GET_REQUEST]: postsGetRequest,
  [constants.POSTS_GET_SUCCESS]: postsGetSuccess,
  [constants.POSTS_GET_FAILURE]: postsGetFailure,
  [constants.POSTS_GET_IDLE]: postsGetIdle,
  [constants.POSTS_GET_MORE_REQUEST]: postsGetMoreRequest,
  [constants.POSTS_GET_MORE_SUCCESS]: postsGetMoreSuccess,

  [constants.POSTS_VIEWS_GET_REQUEST]: postsViewsGetRequest,
  [constants.POSTS_VIEWS_GET_SUCCESS]: postsViewsGetSuccess,
  [constants.POSTS_VIEWS_GET_FAILURE]: postsViewsGetFailure,
  [constants.POSTS_VIEWS_GET_IDLE]: postsViewsGetIdle,
  [constants.POSTS_VIEWS_GET_MORE_REQUEST]: postsViewsGetMoreRequest,
  [constants.POSTS_VIEWS_GET_MORE_SUCCESS]: postsViewsGetMoreSuccess,

  [constants.POSTS_LIKES_GET_REQUEST]: postsLikesGetRequest,
  [constants.POSTS_LIKES_GET_SUCCESS]: postsLikesGetSuccess,
  [constants.POSTS_LIKES_GET_FAILURE]: postsLikesGetFailure,
  [constants.POSTS_LIKES_GET_IDLE]: postsLikesGetIdle,

  [constants.POSTS_GET_ARCHIVED_REQUEST]: postsGetArchivedRequest,
  [constants.POSTS_GET_ARCHIVED_SUCCESS]: postsGetArchivedSuccess,
  [constants.POSTS_GET_ARCHIVED_FAILURE]: postsGetArchivedFailure,
  [constants.POSTS_GET_ARCHIVED_IDLE]: postsGetArchivedIdle,

  [constants.POSTS_EDIT_REQUEST]: postsEditRequest,
  [constants.POSTS_EDIT_SUCCESS]: postsEditSuccess,
  [constants.POSTS_EDIT_FAILURE]: postsEditFailure,
  [constants.POSTS_EDIT_IDLE]: postsEditIdle,

  [constants.POSTS_DELETE_REQUEST]: postsDeleteRequest,
  [constants.POSTS_DELETE_SUCCESS]: postsDeleteSuccess,
  [constants.POSTS_DELETE_FAILURE]: postsDeleteFailure,
  [constants.POSTS_DELETE_IDLE]: postsDeleteIdle,

  [constants.POSTS_ARCHIVE_REQUEST]: postsArchiveRequest,
  [constants.POSTS_ARCHIVE_SUCCESS]: postsArchiveSuccess,
  [constants.POSTS_ARCHIVE_FAILURE]: postsArchiveFailure,
  [constants.POSTS_ARCHIVE_IDLE]: postsArchiveIdle,

  [constants.POSTS_RESTORE_ARCHIVED_REQUEST]: postsRestoreArchivedRequest,
  [constants.POSTS_RESTORE_ARCHIVED_SUCCESS]: postsRestoreArchivedSuccess,
  [constants.POSTS_RESTORE_ARCHIVED_FAILURE]: postsRestoreArchivedFailure,
  [constants.POSTS_RESTORE_ARCHIVED_IDLE]: postsRestoreArchivedIdle,

  [constants.POSTS_FLAG_REQUEST]: postsFlagRequest,
  [constants.POSTS_FLAG_SUCCESS]: postsFlagSuccess,
  [constants.POSTS_FLAG_FAILURE]: postsFlagFailure,
  [constants.POSTS_FLAG_IDLE]: postsFlagIdle,

  [constants.POSTS_SINGLE_GET_REQUEST]: postsSingleGetRequest,
  [constants.POSTS_SINGLE_GET_SUCCESS]: postsSingleGetSuccess,
  [constants.POSTS_SINGLE_GET_FAILURE]: postsSingleGetFailure,
  [constants.POSTS_SINGLE_GET_IDLE]: postsSingleGetIdle,

  [constants.POSTS_FEED_GET_REQUEST]: postsFeedGetRequest,
  [constants.POSTS_FEED_GET_SUCCESS]: postsFeedGetSuccess,
  [constants.POSTS_FEED_GET_FAILURE]: postsFeedGetFailure,
  [constants.POSTS_FEED_GET_IDLE]: postsFeedGetIdle,
  [constants.POSTS_FEED_GET_MORE_REQUEST]: postsFeedGetMoreRequest,
  [constants.POSTS_FEED_GET_MORE_SUCCESS]: postsFeedGetMoreSuccess,

  [constants.POSTS_CREATE_REQUEST]: postsCreateRequest,
  [constants.POSTS_CREATE_SUCCESS]: postsCreateSuccess,
  [constants.POSTS_CREATE_FAILURE]: postsCreateFailure,
  [constants.POSTS_CREATE_IDLE]: postsCreateIdle,
  [constants.POSTS_CREATE_PROGRESS]: postsCreateProgress,

  [constants.POSTS_ONYMOUSLY_LIKE_REQUEST]: postsOnymouslyLikeRequest,
  [constants.POSTS_ONYMOUSLY_LIKE_SUCCESS]: postsOnymouslyLikeSuccess,
  [constants.POSTS_ONYMOUSLY_LIKE_FAILURE]: postsOnymouslyLikeFailure,
  [constants.POSTS_ONYMOUSLY_LIKE_IDLE]: postsOnymouslyLikeIdle,

  [constants.POSTS_ANONYMOUSLY_LIKE_REQUEST]: postsAnonymouslyLikeRequest,
  [constants.POSTS_ANONYMOUSLY_LIKE_SUCCESS]: postsAnonymouslyLikeSuccess,
  [constants.POSTS_ANONYMOUSLY_LIKE_FAILURE]: postsAnonymouslyLikeFailure,
  [constants.POSTS_ANONYMOUSLY_LIKE_IDLE]: postsAnonymouslyLikeIdle,

  [constants.POSTS_DISLIKE_REQUEST]: postsDislikeRequest,
  [constants.POSTS_DISLIKE_SUCCESS]: postsDislikeSuccess,
  [constants.POSTS_DISLIKE_FAILURE]: postsDislikeFailure,
  [constants.POSTS_DISLIKE_IDLE]: postsDislikeIdle,

  [constants.POSTS_SHARE_REQUEST]: postsShareRequest,
  [constants.POSTS_SHARE_SUCCESS]: postsShareSuccess,
  [constants.POSTS_SHARE_FAILURE]: postsShareFailure,
  [constants.POSTS_SHARE_IDLE]: postsShareIdle,

  [constants.POSTS_REPORT_POST_VIEWS_REQUEST]: postsReportPostViewsRequest,
  [constants.POSTS_REPORT_POST_VIEWS_SUCCESS]: postsReportPostViewsSuccess,
  [constants.POSTS_REPORT_POST_VIEWS_FAILURE]: postsReportPostViewsFailure,
  [constants.POSTS_REPORT_POST_VIEWS_IDLE]: postsReportPostViewsIdle,

  [constants.POSTS_REPORT_COMMENT_VIEWS_REQUEST]: postsReportCommentViewsRequest,
  [constants.POSTS_REPORT_COMMENT_VIEWS_SUCCESS]: postsReportCommentViewsSuccess,
  [constants.POSTS_REPORT_COMMENT_VIEWS_FAILURE]: postsReportCommentViewsFailure,
  [constants.POSTS_REPORT_COMMENT_VIEWS_IDLE]: postsReportCommentViewsIdle,

  [constants.POSTS_GET_TRENDING_POSTS_REQUEST]: postsGetTrendingPostsRequest,
  [constants.POSTS_GET_TRENDING_POSTS_SUCCESS]: postsGetTrendingPostsSuccess,
  [constants.POSTS_GET_TRENDING_POSTS_FAILURE]: postsGetTrendingPostsFailure,
  [constants.POSTS_GET_TRENDING_POSTS_IDLE]: postsGetTrendingPostsIdle,
  [constants.POSTS_GET_TRENDING_POSTS_MORE_REQUEST]: postsGetTrendingPostsMoreRequest,
  [constants.POSTS_GET_TRENDING_POSTS_MORE_SUCCESS]: postsGetTrendingPostsMoreSuccess,

  [constants.POSTS_COMMENTS_GET_REQUEST]: postsCommentsGetRequest,
  [constants.POSTS_COMMENTS_GET_SUCCESS]: postsCommentsGetSuccess,
  [constants.POSTS_COMMENTS_GET_FAILURE]: postsCommentsGetFailure,
  [constants.POSTS_COMMENTS_GET_IDLE]: postsCommentsGetIdle,

  [constants.COMMENTS_ADD_REQUEST]: commentsAddRequest,
  [constants.COMMENTS_ADD_SUCCESS]: commentsAddSuccess,
  [constants.COMMENTS_ADD_FAILURE]: commentsAddFailure,
  [constants.COMMENTS_ADD_IDLE]: commentsAddIdle,

  [constants.COMMENTS_DELETE_REQUEST]: commentsDeleteRequest,
  [constants.COMMENTS_DELETE_SUCCESS]: commentsDeleteSuccess,
  [constants.COMMENTS_DELETE_FAILURE]: commentsDeleteFailure,
  [constants.COMMENTS_DELETE_IDLE]: commentsDeleteIdle,

  /**
   * Clear on logout
   */
  ['AUTH_SIGNOUT_REQUEST']: (state, action) => initialState,
}, initialState)
