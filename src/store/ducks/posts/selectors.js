import { createSelectorCreator, defaultMemoize } from 'reselect'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const entities = () => path(['entities'])
const postsGetCache = (userId) => path(['posts', 'postsGetCache', userId])
const postsCommentsGetCache = (postId) => path(['posts', 'postsCommentsGetCache', postId])
const postsViewsGetCache = (postId) => path(['posts', 'postsViewsGetCache', postId])
const postsLikesGetCache = (postId) => path(['posts', 'postsLikesGetCache', postId])

/**
 *
 */
const postsGet = () => path(['posts', 'postsGet'])

export const postsGetSelector = (userId) => createDeepEqualSelector(
  [postsGet(), postsGetCache(userId), entities()],
  (postsGet, postsGetCache, entities) => {
    const posts = path(['data'])(postsGetCache) || []
    const denormalized = normalizer.denormalizePostsGet(posts, entities)
    return assocPath(['data'], denormalized)(postsGet)
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

export const postsFeedGetSelector = () => createDeepEqualSelector(
  [postsFeedGet(), entities()],
  (postsFeedGet, entities) => {
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
const postsCommentsGet = () => path(['posts', 'postsCommentsGet'])

export const postsCommentsGetSelector = (postId) => createDeepEqualSelector(
  [postsCommentsGet(), postsCommentsGetCache(postId), entities()],
  (postsCommentsGet, postsCommentsGetCache, entities) => {
    const comments = path(['data'])(postsCommentsGetCache) || []
    const denormalized = normalizer.denormalizeCommentsGet(comments, entities)
    return assocPath(['data'], denormalized)(postsCommentsGet)
  }
)

/**
 *
 */
const postsViewsGet = () => path(['posts', 'postsViewsGet'])

export const postsViewsGetSelector = (postId) => createDeepEqualSelector(
  [postsViewsGet(), postsViewsGetCache(postId), entities()],
  (postsViewsGet, postsViewsGetCache, entities) => {
    const users = path(['data'])(postsViewsGetCache) || []
    const denormalized = normalizer.denormalizeUsersGet(users, entities)
    return assocPath(['data'], denormalized)(postsViewsGet)
  }
)

/**
 *
 */
const postsLikesGet = () => path(['posts', 'postsLikesGet'])

export const postsLikesGetSelector = (postId) => createDeepEqualSelector(
  [postsLikesGet(), postsLikesGetCache(postId), entities()],
  (postsLikesGet, entities) => {
    const users = path(['data'])(postsLikesGetCache) || []
    const denormalized = normalizer.denormalizeUsersGet(users, entities)
    return assocPath(['data'], denormalized)(postsLikesGet)
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
