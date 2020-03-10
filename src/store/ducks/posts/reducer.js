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
  postsAvatar: {
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

  postsCreateQueue: {},
  postsGetCache: {},
  postsCommentsGetCache: {},
  postsViewsGetCache: {},
  postsLikesGetCache: {},
}

/**
 *
 */
const postsGetRequest = (state, action) => update(state, {
  postsGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
  postsGetCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.postsGet,
    },
  },
})

const postsGetSuccess = (state, action) => update(state, {
  postsGet: {
    status: { $set: 'success' },
    payload: { $set: action.payload },
  },
  postsGetCache: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.postsGet,
    },
  },
})

const postsGetFailure = (state, action) => update(state, {
  postsGet: {
    status: { $set: 'failure' },
    payload: { $set: action.payload },
  },
  postsGetCache: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.postsGet,
    },
  },
})

const postsGetIdle = (state, action) => update(state, {
  postsGet: {
    status: { $set: 'idle' },
    payload: { $set: action.payload },
  },
  postsGetCache: {
    $resourceCacheSetIdle: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.postsGet,
    },
  },
})

const postsGetMoreRequest = (state, action) => update(state, {
  postsGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
  postsGetCache: {
    $resourceCachePushRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.postsGet,
    },
  },
})

const postsGetMoreSuccess = (state, action) => update(state, {
  postsGet: {
    status: { $set: 'success' },
    payload: { $set: action.payload },
  },
  postsGetCache: {
    $resourceCachePushSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.postsGet,
    },
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
  postsViewsGetCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.postId,
      initialState: initialState.postsViewsGet,
    },
  },
})

const postsViewsGetSuccess = (state, action) => update(state, {
  postsViewsGet: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  postsViewsGetCache: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsViewsGet,
    },
  },
})

const postsViewsGetFailure = (state, action) => update(state, {
  postsViewsGet: {
    status: { $set: 'failure' },
  },
  postsViewsGetCache: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsViewsGet,
    },
  },
})

const postsViewsGetIdle = (state, action) => update(state, {
  postsViewsGet: {
    data: { $set: initialState.postsViewsGet.data },
    status: { $set: 'idle' },
  },
  postsViewsGetCache: {
    $resourceCacheSetIdle: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsViewsGet,
    },
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
  postsLikesGetCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.postId,
      initialState: initialState.postsLikesGet,
    },
  },
})

const postsLikesGetSuccess = (state, action) => update(state, {
  postsLikesGet: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  postsLikesGetCache: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsLikesGet,
    },
  },
})

const postsLikesGetFailure = (state, action) => update(state, {
  postsLikesGet: {
    status: { $set: 'failure' },
  },
  postsLikesGetCache: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsLikesGet,
    },
  },
})

const postsLikesGetIdle = (state, action) => update(state, {
  postsLikesGet: {
    data: { $set: initialState.postsLikesGet.data },
    status: { $set: 'idle' },
  },
  postsLikesGetCache: {
    $resourceCacheSetIdle: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsViewsGet,
    },
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
    data: { $set: action.payload.data },
    status: { $set: 'success' },
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
  postsGetCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.postsGet,
    },
  },
})

const postsEditSuccess = (state, action) => update(state, {
  postsEdit: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  postsFeedGet: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGet: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGetCache: {
    [action.payload.data.postedBy.userId]: {
      data: {
        $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
      },
    },
  },
  postsGetArchived: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
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
  postsGetCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.postsGet,
    },
  },
})

const postsDeleteSuccess = (state, action) => update(state, {
  postsDelete: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  postsFeedGet: {
    data: {
      $feedPostRemove: { postId: action.payload.data.postId },
    },
  },
  postsGetArchived: {
    data: {
      $feedPostRemove: { postId: action.payload.data.postId },
    },
  },
  postsGet: {
    data: {
      $feedPostRemove: { postId: action.payload.data.postId },
    },
  },
  postsGetCache: {
    [action.payload.data.postedBy.userId]: {
      data: {
        $feedPostRemove: { postId: action.payload.data.postId },
      },
    },
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
  postsGetCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.postsGet,
    },
  },
})

const postsArchiveSuccess = (state, action) => update(state, {
  postsArchive: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  postsFeedGet: {
    data: {
      $feedPostRemove: { postId: action.payload.data.postId },
    },
  },
  postsGetArchived: {
    data: {
      $feedPostRemove: { postId: action.payload.data.postId },
    },
  },
  postsGet: {
    data: {
      $feedPostRemove: { postId: action.payload.data.postId },
    },
  },
  postsGetCache: {
    [action.payload.data.postedBy.userId]: {
      data: {
        $feedPostRemove: { postId: action.payload.data.postId },
      },
    },
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
  postsGetArchived: {
    data: {
      $feedPostRemove: { postId: action.payload.data.postId },
    },
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
  postsFeedGet: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
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
  postsGetCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.postsGet,
    },
  },
})

const postsSingleGetSuccess = (state, action) => update(state, {
  postsSingleGet: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  postsFeedGet: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGet: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGetCache: {
    [action.payload.data.postedBy.userId]: {
      data: {
        $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
      },
    },
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
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    meta: { $set: action.payload.meta },
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
  },
})

const postsFeedGetMoreSuccess = (state, action) => update(state, {
  postsFeedGet: {
    data: { $push: action.payload.data },
    status: { $set: 'success' },
    meta: { $set: action.payload.meta },
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
  postsCreateQueue: {
    $resourceCacheSetIdle: {
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
const postsAvatarRequest = (state, action) => update(state, {
  postsAvatar: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsAvatarSuccess = (state, action) => update(state, {
  postsAvatar: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const postsAvatarFailure = (state, action) => update(state, {
  postsAvatar: {
    status: { $set: 'failure' },
  },
})

const postsAvatarIdle = (state, action) => update(state, {
  postsAvatar: {
    data: { $set: initialState.postsAvatar.data },
    status: { $set: 'idle' },
  },
})

const postsAvatarProgress = (state, action) => update(state, {
  postsAvatar: {
    status: { $set: 'loading' },
    meta: { $set: action.payload.meta },
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
  postsSingleGet: {
    data: {
      $singlePostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'ONYMOUSLY_LIKED' },
    },
  },
  postsFeedGet: {
    data: {
      $feedPostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'ONYMOUSLY_LIKED' },
    },
  },
  postsGetArchived: {
    data: {
      $feedPostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'ONYMOUSLY_LIKED' },
    },
  },
  postsGet: {
    data: {
      $feedPostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'ONYMOUSLY_LIKED' },
    },
  },
  postsGetCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.postsGet,
    },
  },
})

const postsOnymouslyLikeSuccess = (state, action) => update(state, {
  postsOnymouslyLike: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  postsFeedGet: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGetArchived: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGet: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGetCache: {
    [action.payload.data.postedBy.userId]: {
      data: {
        $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
      },
    },
  },
})

const postsOnymouslyLikeFailure = (state, action) => update(state, {
  postsOnymouslyLike: {
    status: { $set: 'failure' },
  },
  postsFeedGet: {
    data: {
      $feedPostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'NOT_LIKED' },
    },
  },
  postsSingleGet: {
    data: {
      $singlePostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'NOT_LIKED' },
    },
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
  postsSingleGet: {
    data: {
      $singlePostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'ANONYMOUSLY_LIKED' },
    },
  },
  postsFeedGet: {
    data: {
      $feedPostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'ANONYMOUSLY_LIKED' },
    },
  },
  postsGetArchived: {
    data: {
      $feedPostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'ANONYMOUSLY_LIKED' },
    },
  },
  postsGet: {
    data: {
      $feedPostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'ANONYMOUSLY_LIKED' },
    },
  },
  postsGetCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.postsGet,
    },
  },
})

const postsAnonymouslyLikeSuccess = (state, action) => update(state, {
  postsAnonymouslyLike: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  postsFeedGet: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGetArchived: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGet: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGetCache: {
    [action.payload.data.postedBy.userId]: {
      data: {
        $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
      },
    },
  },
})

const postsAnonymouslyLikeFailure = (state, action) => update(state, {
  postsAnonymouslyLike: {
    status: { $set: 'failure' },
  },
  postsFeedGet: {
    data: {
      $feedPostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'NOT_LIKED' },
    },
  },
  postsSingleGet: {
    data: {
      $singlePostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'NOT_LIKED' },
    },
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
  postsSingleGet: {
    data: {
      $singlePostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'NOT_LIKED' },
    },
  },
  postsFeedGet: {
    data: {
      $feedPostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'NOT_LIKED' },
    },
  },
  postsGetArchived: {
    data: {
      $feedPostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'NOT_LIKED' },
    },
  },
  postsGet: {
    data: {
      $feedPostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'NOT_LIKED' },
    },
  },
  postsGetCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.postsGet,
    },
  },
})

const postsDislikeSuccess = (state, action) => update(state, {
  postsDislike: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  postsFeedGet: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGetArchived: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGet: {
    data: {
      $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
    },
  },
  postsGetCache: {
    [action.payload.data.postedBy.userId]: {
      data: {
        $feedPostUpdate: { postId: action.payload.data.postId, post: action.payload.data },
      },
    },
  },
})

const postsDislikeFailure = (state, action) => update(state, {
  postsDislike: {
    status: { $set: 'failure' },
  },
  postsFeedGet: {
    data: {
      $feedPostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'ONYMOUSLY_LIKED' },
    },
  },
  postsSingleGet: {
    data: {
      $singlePostLikeStatusUpdate: { postId: action.payload.postId, likeStatus: 'ONYMOUSLY_LIKED' },
    },
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
const postsGetTrendingPostsRequest = (state, action) => update(state, {
  postsGetTrendingPosts: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const postsGetTrendingPostsSuccess = (state, action) => update(state, {
  postsGetTrendingPosts: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
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

/**
 *
 */
const postsCommentsGetRequest = (state, action) => update(state, {
  postsCommentsGet: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
  postsCommentsGetCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.postId,
      initialState: initialState.postsCommentsGet,
    },
  },
})

const postsCommentsGetSuccess = (state, action) => update(state, {
  postsCommentsGet: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
  postsCommentsGetCache: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsCommentsGet,
    },
  },
})

const postsCommentsGetFailure = (state, action) => update(state, {
  postsCommentsGet: {
    status: { $set: 'failure' },
  },
  postsCommentsGetCache: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsCommentsGet,
    },
  },
})

const postsCommentsGetIdle = (state, action) => update(state, {
  postsCommentsGet: {
    data: { $set: initialState.postsCommentsGet.data },
    status: { $set: 'idle' },
  },
  postsCommentsGetCache: {
    $resourceCacheSetIdle: {
      ...action,
      resourceKey: action.payload.payload.postId,
      initialState: initialState.postsCommentsGet,
    },
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

export default handleActions({
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

  [constants.POSTS_AVATAR_REQUEST]: postsAvatarRequest,
  [constants.POSTS_AVATAR_SUCCESS]: postsAvatarSuccess,
  [constants.POSTS_AVATAR_FAILURE]: postsAvatarFailure,
  [constants.POSTS_AVATAR_IDLE]: postsAvatarIdle,
  [constants.POSTS_AVATAR_PROGRESS]: postsAvatarProgress,

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

  [constants.POSTS_GET_TRENDING_POSTS_REQUEST]: postsGetTrendingPostsRequest,
  [constants.POSTS_GET_TRENDING_POSTS_SUCCESS]: postsGetTrendingPostsSuccess,
  [constants.POSTS_GET_TRENDING_POSTS_FAILURE]: postsGetTrendingPostsFailure,
  [constants.POSTS_GET_TRENDING_POSTS_IDLE]: postsGetTrendingPostsIdle,

  [constants.POSTS_COMMENTS_GET_REQUEST]: postsCommentsGetRequest,
  [constants.POSTS_COMMENTS_GET_SUCCESS]: postsCommentsGetSuccess,
  [constants.POSTS_COMMENTS_GET_FAILURE]: postsCommentsGetFailure,
  [constants.POSTS_COMMENTS_GET_IDLE]: postsCommentsGetIdle,

  [constants.COMMENTS_ADD_REQUEST]: commentsAddRequest,
  [constants.COMMENTS_ADD_SUCCESS]: commentsAddSuccess,
  [constants.COMMENTS_ADD_FAILURE]: commentsAddFailure,
  [constants.COMMENTS_ADD_IDLE]: commentsAddIdle,

  /**
   * Clear on logout
   */
  ['AUTH_SIGNOUT_REQUEST']: (state, action) => initialState,
}, initialState)
