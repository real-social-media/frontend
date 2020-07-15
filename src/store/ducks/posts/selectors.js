import { createSelectorCreator, defaultMemoize } from 'reselect'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'
import { initialState } from 'store/ducks/posts/reducer'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const entities = () => path(['entities'])

/**
 *
 */
const postsGetCache = (userId) => path(['posts', 'postsGetCache', userId])

export const postsGetSelector = (userId) => createDeepEqualSelector(
  [postsGetCache(userId), entities()],
  (postsGetCache, entities) => {
    const posts = path(['data'])(postsGetCache) ? postsGetCache : initialState.postsGet
    const denormalized = normalizer.denormalizePostsGet(posts.data, entities)
    return assocPath(['data'], denormalized)(posts)
  }
)

/**
 *
 */
const postsGetUnreadComments = () => path(['posts', 'postsGetUnreadComments'])

export const postsGetUnreadCommentsSelector = () => createDeepEqualSelector(
  [postsGetUnreadComments(), entities()],
  (postsGetUnreadComments, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGetUnreadComments.data, entities)
    return assocPath(['data'], denormalized)(postsGetUnreadComments)
  }
)

/**
 *
 */
const postsGetArchived = () => path(['posts', 'postsGetArchived'])

export const postsGetArchivedSelector = () => createDeepEqualSelector(
  [postsGetArchived(), entities()],
  (postsGetArchived, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGetArchived.data, entities)
    return assocPath(['data'], denormalized)(postsGetArchived)
  }
)

/**
 *
 */
const postsFeedGet = () => path(['posts', 'postsFeedGet'])
const postsOnymouslyLike = () => path(['posts', 'postsOnymouslyLike'])
const postsDislike = () => path(['posts', 'postsDislike'])

export const postsFeedGetSelector = () => createDeepEqualSelector(
  [postsFeedGet(), postsOnymouslyLike(), postsDislike(), entities()],
  (postsFeedGet, postsOnymouslyLike, postsDislike, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsFeedGet.data, entities)
    return assocPath(['data'], denormalized)(postsFeedGet)
  }
)

/**
 *
 */
const postsSingleGet = () => path(['posts', 'postsSingleGet'])

export const postsSingleGetSelector = (postId) => createDeepEqualSelector(
  [postsSingleGet(), entities()],
  (postsSingleGet, entities) => {
    const denormalized = normalizer.denormalizePostGet(postId, entities)
    return assocPath(['data'], denormalized)(postsSingleGet)
  }
)

/**
 *
 */
const postsCommentsGetCache = (postId) => path(['posts', 'postsCommentsGetCache', postId])

export const postsCommentsGetSelector = (postId) => createDeepEqualSelector(
  [postsCommentsGetCache(postId), entities()],
  (postsCommentsGetCache, entities) => {
    const comments = path(['data'])(postsCommentsGetCache) ? postsCommentsGetCache : initialState.postsCommentsGet
    const denormalized = normalizer.denormalizeCommentsGet(comments.data, entities)
    return assocPath(['data'], denormalized)(comments)
  }
)

/**
 *
 */
const postsViewsGetCache = (postId) => path(['posts', 'postsViewsGetCache', postId])

export const postsViewsGetSelector = (postId) => createDeepEqualSelector(
  [postsViewsGetCache(postId), entities()],
  (postsViewsGetCache, entities) => {
    const users = path(['data'])(postsViewsGetCache) ? postsViewsGetCache : initialState.postsViewsGet
    const denormalized = normalizer.denormalizeUsersGet(users.data, entities)
    return assocPath(['data'], denormalized)(users)
  }
)

/**
 *
 */
const postsLikesGetCache = (postId) => path(['posts', 'postsLikesGetCache', postId])

export const postsLikesGetSelector = (postId) => createDeepEqualSelector(
  [postsLikesGetCache(postId), entities()],
  (postsLikesGetCache, entities) => {
    const users = path(['data'])(postsLikesGetCache) ? postsLikesGetCache : initialState.postsLikesGet
    const denormalized = normalizer.denormalizeUsersGet(users.data, entities)
    return assocPath(['data'], denormalized)(users)
  }
)

/**
 *
 */
const postsGetTrendingPosts = () => path(['posts', 'postsGetTrendingPosts'])

export const postsGetTrendingPostsSelector = () => createDeepEqualSelector(
  [postsGetTrendingPosts(), entities()],
  (postsGetTrendingPosts, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGetTrendingPosts.data, entities)
    return assocPath(['data'], denormalized)(postsGetTrendingPosts)
  }
)
