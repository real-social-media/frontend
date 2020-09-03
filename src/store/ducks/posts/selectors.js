import { createSelectorCreator, defaultMemoize } from 'reselect'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'
import { initialState } from 'store/ducks/posts/reducer'
import { selectEntities } from 'store/ducks/entities/selectors'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals,
)

const postsOnymouslyLike = () => path(['posts', 'postsOnymouslyLike'])
const postsDislike = () => path(['posts', 'postsDislike'])
const postsReportPostViewsRequest = () => path(['posts', 'postsReportPostViewsRequest'])

/**
 *
 */
const postsGetCache = (userId) => path(['posts', 'postsGetCache', userId])

export const postsGetSelector = (userId) => createDeepEqualSelector(
  [postsGetCache(userId), postsOnymouslyLike(), postsDislike(), postsReportPostViewsRequest(), selectEntities],
  (postsGetCache, postsOnymouslyLike, postsDislike, postsReportPostViewsRequest, entities) => {
    const posts = path(['data'])(postsGetCache) ? postsGetCache : initialState.postsGet
    const denormalized = normalizer.denormalizePostsGet(posts.data, entities)
    return assocPath(['data'], denormalized)(posts)
  },
)

/**
 *
 */
const postsGetUnreadComments = () => path(['posts', 'postsGetUnreadComments'])

export const postsGetUnreadCommentsSelector = () => createDeepEqualSelector(
  [postsGetUnreadComments(), selectEntities],
  (postsGetUnreadComments, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGetUnreadComments.data, entities)
    return assocPath(['data'], denormalized)(postsGetUnreadComments)
  },
)

/**
 *
 */
const postsGetArchived = () => path(['posts', 'postsGetArchived'])

export const postsGetArchivedSelector = () => createDeepEqualSelector(
  [postsGetArchived(), selectEntities],
  (postsGetArchived, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGetArchived.data, entities)
    return assocPath(['data'], denormalized)(postsGetArchived)
  },
)

/**
 *
 */
const postsFeedGet = () => path(['posts', 'postsFeedGet'])

export const postsFeedGetSelector = () => createDeepEqualSelector(
  [postsFeedGet(), postsOnymouslyLike(), postsDislike(), postsReportPostViewsRequest(), selectEntities],
  (postsFeedGet, postsOnymouslyLike, postsDislike, postsReportPostViewsRequest, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsFeedGet.data, entities)
    return assocPath(['data'], denormalized)(postsFeedGet)
  },
)

/**
 *
 */
const postsSingleGet = () => path(['posts', 'postsSingleGet'])

export const postsSingleGetSelector = (postId) => createDeepEqualSelector(
  [postsSingleGet(), postsOnymouslyLike(), postsDislike(), postsReportPostViewsRequest(), selectEntities],
  (postsSingleGet, postsOnymouslyLike, postsDislike, postsReportPostViewsRequest, entities) => {
    const denormalized = normalizer.denormalizePostGet(postId, entities)
    return assocPath(['data'], denormalized || {})(postsSingleGet)
  },
)

/**
 *
 */
const postsCommentsGetCache = (postId) => path(['posts', 'postsCommentsGetCache', postId])

export const postsCommentsGetSelector = (postId) => createDeepEqualSelector(
  [postsCommentsGetCache(postId), selectEntities],
  (postsCommentsGetCache, entities) => {
    const comments = path(['data'])(postsCommentsGetCache) ? postsCommentsGetCache : initialState.postsCommentsGet
    const denormalized = normalizer.denormalizeCommentsGet(comments.data, entities)
    return assocPath(['data'], denormalized)(comments)
  },
)

/**
 *
 */
const postsViewsGetCache = (postId) => path(['posts', 'postsViewsGetCache', postId])

export const postsViewsGetSelector = (postId) => createDeepEqualSelector(
  [postsViewsGetCache(postId), selectEntities],
  (postsViewsGetCache, entities) => {
    const users = path(['data'])(postsViewsGetCache) ? postsViewsGetCache : initialState.postsViewsGet
    const denormalized = normalizer.denormalizeUsersGet(users.data, entities)
    return assocPath(['data'], denormalized)(users)
  },
)

/**
 *
 */
const postsLikesGetCache = (postId) => path(['posts', 'postsLikesGetCache', postId])

export const postsLikesGetSelector = (postId) => createDeepEqualSelector(
  [postsLikesGetCache(postId), selectEntities],
  (postsLikesGetCache, entities) => {
    const users = path(['data'])(postsLikesGetCache) ? postsLikesGetCache : initialState.postsLikesGet
    const denormalized = normalizer.denormalizeUsersGet(users.data, entities)
    return assocPath(['data'], denormalized)(users)
  },
)

/**
 *
 */
const postsGetTrendingPosts = () => path(['posts', 'postsGetTrendingPosts'])

export const postsGetTrendingPostsSelector = () => createDeepEqualSelector(
  [postsGetTrendingPosts(), selectEntities],
  (postsGetTrendingPosts, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGetTrendingPosts.data, entities)
    return assocPath(['data'], denormalized)(postsGetTrendingPosts)
  },
)
