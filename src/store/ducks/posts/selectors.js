import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import assocPath from 'ramda/src/assocPath'
import equals from 'ramda/src/equals'
import * as normalizer from 'normalizer/schemas'
import { initialState } from 'store/ducks/posts/reducer'
import { entitiesSelector } from 'store/ducks/entities/selectors'
import { createSelectorCreator } from 'reselect'
import { equalityCheckNParamsCreator } from 'reselect-equality-check-n-parameters'

const equalityCheckFirstParam = equalityCheckNParamsCreator(1)
const createSelectorFirstParam = createSelectorCreator(equalityCheckFirstParam, equals)

/**
 *
 */
const postsGetCache = (userId) => path(['posts', 'postsGetCache', userId])

export const postsGetSelector = (userId) => createSelectorFirstParam(
  [postsGetCache(userId), entitiesSelector],
  (postsGetCache, entities) => {
    const posts = path(['data'])(postsGetCache) ? postsGetCache : initialState.postsGet
    const denormalized = normalizer.denormalizePostsGet(posts.data, entities)
    return assocPath(['data'], denormalized)(posts)
  },
)

/**
 *
 */
const postsGetUnreadComments = () => path(['posts', 'postsGetUnreadComments'])

export const postsGetUnreadCommentsSelector = () => createSelectorFirstParam(
  [postsGetUnreadComments(), entitiesSelector],
  (postsGetUnreadComments, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGetUnreadComments.data, entities)
    return assocPath(['data'], denormalized)(postsGetUnreadComments)
  },
)

/**
 *
 */
const postsGetArchived = () => path(['posts', 'postsGetArchived'])

export const postsGetArchivedSelector = () => createSelectorFirstParam(
  [postsGetArchived(), entitiesSelector],
  (postsGetArchived, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGetArchived.data, entities)
    return assocPath(['data'], denormalized)(postsGetArchived)
  },
)

/**
 *
 */
const postsFeedGet = () => path(['posts', 'postsFeedGet'])

export const postsFeedGetSelector = () => createSelectorFirstParam(
  [postsFeedGet(), entitiesSelector],
  (postsFeedGet, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsFeedGet.data, entities)
    return assocPath(['data'], denormalized)(postsFeedGet)
  },
)

/**
 *
 */
export const postsSingleGet = () => path(['posts', 'postsSingleGet'])

export const postsSingleGetSelector = (postId) => createSelectorFirstParam(
  [postsSingleGet(), entitiesSelector],
  (postsSingleGet, entities) => {
    const denormalized = normalizer.denormalizePostGet(postId, entities)
    return assocPath(['data'], denormalized || {})(postsSingleGet)
  },
)

/**
 *
 */
const postsCommentsGetCache = (postId) => path(['posts', 'postsCommentsGetCache', postId])

export const postsCommentsGetSelector = (postId) => createSelectorFirstParam(
  [postsCommentsGetCache(postId), entitiesSelector],
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

export const postsViewsGetSelector = (postId) => createSelectorFirstParam(
  [postsViewsGetCache(postId), entitiesSelector],
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

export const postsLikesGetSelector = (postId) => createSelectorFirstParam(
  [postsLikesGetCache(postId), entitiesSelector],
  (postsLikesGetCache, entities) => {
    const users = path(['data'])(postsLikesGetCache) ? postsLikesGetCache : initialState.postsLikesGet
    const denormalized = normalizer.denormalizeUsersGet(users.data, entities)
    return assocPath(['data'], denormalized)(users)
  },
)

/**
 *
 */
export const postsGetTrendingPosts = () => path(['posts', 'postsGetTrendingPosts'])
export const postsGetTrendingPostsFilters = compose(path(['filters']), postsGetTrendingPosts())

export const postsGetTrendingPostsSelector = () => createSelectorFirstParam(
  [postsGetTrendingPosts(), entitiesSelector],
  (postsGetTrendingPosts, entities) => {
    const denormalized = normalizer.denormalizePostsGet(postsGetTrendingPosts.data, entities)
    return assocPath(['data'], denormalized)(postsGetTrendingPosts)
  },
)

/**
 *
 */
export const postsCreate = path(['posts', 'postsCreate'])

/**
 *
 */
export const postsShare = path(['posts', 'postsShare'])
