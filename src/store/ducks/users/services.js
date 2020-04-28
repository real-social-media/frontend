import update from 'immutability-helper'
import path from 'ramda/src/path'

/**
 * 
 * 
 * @param {*} usersGetProfile 
 * @param {*} navigation 
 */
export const cachedUsersGetProfile = (usersGetProfile, usersGetProfileCache, cache) => {
  const response = update(usersGetProfile, {
    data: { $set: cache },
  })

  const cachedUser = path([cache.userId])(usersGetProfileCache)

  if (cachedUser && cachedUser.status === 'success') {
    return cachedUser
  }

  if (path(['data', 'userId'])(usersGetProfile) === cache.userId && usersGetProfile.status === 'success') {
    return usersGetProfile
  }

  return response
}

/**
 * 
 * 
 * @param {*} usersGetProfile 
 * @param {*} navigation 
 */
export const cachedUsersGetProfileSelf = (usersGetProfile, user) => {
  const response = update(usersGetProfile, {
    data: { $set: user },
  })

  return response
}

/**
 * 
 * 
 * @param {*} usersGetProfile 
 * @param {*} navigation 
 */
export const cachedUsersGetFollowedUsers = (usersGetFollowedUsers, usersGetFollowedUsersCache, userId) => {
  const cachedUser = path([userId])(usersGetFollowedUsersCache)
  return cachedUser || usersGetFollowedUsers
}


/**
 * 
 * 
 * @param {*} usersGetProfile 
 * @param {*} navigation 
 */
export const cachedUsersGetFollowerUsers = (usersGetFollowerUsers, usersGetFollowerUsersCache, userId) => {
  const cachedUser = path([userId])(usersGetFollowerUsersCache)
  return cachedUser || usersGetFollowerUsers
}

/**
 * 
 * 
 * @param {*} usersGetProfile 
 * @param {*} navigation 
 */
export const cachedUsersSearch = (usersSearch, usersGetProfileCache) => {
  const mapper = (user) => {
    const userId = path(['userId'])(user)
    const cachedUserData = path([userId, 'data'])(usersGetProfileCache)
    const cachedUserStatus = path([userId, 'status'])(usersGetProfileCache)

    if (cachedUserStatus !== 'success' || !cachedUserData) {
      return user
    }

    return cachedUserData
  }

  const response = update(usersSearch, {
    data: { $map: mapper },
  })

  return response
}

/**
 * 
 * 
 * @param {*} usersGetProfile 
 * @param {*} navigation 
 */
export const cachedUsersGetTrendingUsers = (usersSearch, usersGetProfileCache) => {
  const mapper = (user) => {
    const userId = path(['userId'])(user)
    const cachedUserData = path([userId, 'data'])(usersGetProfileCache)
    const cachedUserStatus = path([userId, 'status'])(usersGetProfileCache)

    if (cachedUserStatus !== 'success' || !cachedUserData) {
      return user
    }

    return cachedUserData
  }

  const response = update(usersSearch, {
    data: { $map: mapper },
  })

  return response
}
