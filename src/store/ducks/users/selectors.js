import { createSelectorCreator, defaultMemoize } from 'reselect'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'
import { initialState } from 'store/ducks/users/reducer'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals,
)

const entities = () => path(['entities'])
const postsOnymouslyLike = () => path(['posts', 'postsOnymouslyLike'])

/**
 *
 */
const usersGetProfile = () => path(['users', 'usersGetProfile'])

export const usersGetProfileSelector = (userId) => createDeepEqualSelector(
  [usersGetProfile(), entities()],
  (usersGetProfile, entities) => {
    const user = userId || path(['data'])(usersGetProfile)
    const denormalized = normalizer.denormalizeUserGet(user, entities)
    return assocPath(['data'], denormalized)(usersGetProfile)
  },
)

/**
 *
 */
const usersGetProfileSelf = () => path(['users', 'usersGetProfileSelf'])
const authUser = () => path(['auth', 'user'])

export const usersGetProfileSelfSelector = () => createDeepEqualSelector(
  [authUser(), entities()],
  (authUser, entities) => {
    const denormalized = normalizer.denormalizeUserGet(authUser, entities)
    return assocPath(['data'], denormalized)(usersGetProfileSelf)
  },
)

/**
 *
 */
const usersGetFollowedUsersCacheUser = (userId) => path(['users', 'usersGetFollowedUsersCache', userId])

export const usersGetFollowedUsersSelector = (userId) => createDeepEqualSelector(
  [usersGetFollowedUsersCacheUser(userId), entities()],
  (usersGetFollowedUsersCacheUser, entities) => {
    const users = path(['data'])(usersGetFollowedUsersCacheUser) ? usersGetFollowedUsersCacheUser : initialState.usersGetFollowedUsers
    const denormalized = normalizer.denormalizeUsersGet(users.data, entities)
    return assocPath(['data'], denormalized)(users)
  },
)

/**
 *
 */
const usersGetFollowerUsersCacheUser = (userId) => path(['users', 'usersGetFollowerUsersCache', userId])

export const usersGetFollowerUsersSelector = (userId) => createDeepEqualSelector(
  [usersGetFollowerUsersCacheUser(userId), entities()],
  (usersGetFollowerUsersCacheUser, entities) => {
    const users = path(['data'])(usersGetFollowerUsersCacheUser) ? usersGetFollowerUsersCacheUser : initialState.usersGetFollowerUsers
    const denormalized = normalizer.denormalizeUsersGet(users.data, entities)
    return assocPath(['data'], denormalized)(users)
  },
)

/**
 *
 */
const usersGetTrendingUsers = () => path(['users', 'usersGetTrendingUsers'])

export const usersGetTrendingUsersSelector = () => createDeepEqualSelector(
  [usersGetTrendingUsers(), entities()],
  (usersGetTrendingUsers, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(usersGetTrendingUsers.data, entities)
    return assocPath(['data'], denormalized)(usersGetTrendingUsers)
  },
)

/**
 *
 */
const usersSearch = () => path(['users', 'usersSearch'])

export const usersSearchSelector = () => createDeepEqualSelector(
  [usersSearch(), entities()],
  (usersSearch, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(usersSearch.data, entities)
    return assocPath(['data'], denormalized)(usersSearch)
  },
)

/**
 *
 */
const usersGetFollowedUsersWithStories = () => path(['users', 'usersGetFollowedUsersWithStories'])

export const usersGetFollowedUsersWithStoriesSelector = () => createDeepEqualSelector(
  [usersGetFollowedUsersWithStories(), postsOnymouslyLike(), entities()],
  (usersGetFollowedUsersWithStories, postsOnymouslyLike, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(usersGetFollowedUsersWithStories.data, entities)
    return assocPath(['data'], denormalized)(usersGetFollowedUsersWithStories)
  },
)

/**
 *
 */
const usersGetPendingFollowers = () => path(['users', 'usersGetPendingFollowers'])

export const usersGetPendingFollowersSelector = () => createDeepEqualSelector(
  [usersGetPendingFollowers(), entities()],
  (usersGetPendingFollowers, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(usersGetPendingFollowers.data, entities)
    return assocPath(['data'], denormalized)(usersGetPendingFollowers)
  },
)

const usersImagePostsGet = () => path(['users', 'usersGetPendingFollowers'])

export const usersImagePostsGetSelector = () => createDeepEqualSelector(
  [usersImagePostsGet(), entities()],
  (usersImagePostsGet, entities) => {
    const denormalized = normalizer.denormalizePostsGet(usersImagePostsGet.data, entities)
    return assocPath(['data'], denormalized)(usersImagePostsGet)
  },
)

export const usersDeleteAvatarError = path(['users', 'usersDeleteAvatar', 'error', 'text'])