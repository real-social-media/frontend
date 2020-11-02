import path from 'ramda/src/path'
import is from 'ramda/src/is'
import pathOr from 'ramda/src/pathOr'
import propEq from 'ramda/src/propEq'

const isUserTagged = (post, user) => {
  const taggedUsers = pathOr([], ['textTaggedUsers'], post)
  const username = `@${path(['username'])(user)}`

  return taggedUsers.findIndex(propEq('tag', username)) !== -1
}

/**
 * Visibility of like button, like button will be visible if:
 * - Post has comments setting enabled
 * - Authenticated user has like setting enabled 
 */
const postLikeVisibility = (post, user) => (
  !path(['likesDisabled'], post) &&
  !path(['likesDisabled'])(user)
)

/**
 * Visibility of comment button, comment button will be visible if:
 * - Post has comments setting enabled
 * - Authenticated user has comments setting enabled 
 */
const postCommentVisibility = (post, user) => (
  !path(['commentsDisabled'], post) &&
  !path(['commentsDisabled'], user)
)

/**
 * Visibility of share button, share button will be visible if:
 * - A post has not been archived
 * 
 * - Authenticated user has share setting enabled 
 * 
 * - Post has share setting enabled
 * - Or Authenticated user has been tagged in post by author
 */
const postShareVisibility = (post, user) => (
  !propEq('postStatus', 'ARCHIVED')(post) &&
  !path(['sharingDisabled'])(user) &&
  !(propEq('sharingDisabled', true)(post) && !isUserTagged(post, user))
)

/**
 * Visibility of seen by text, text will be visible if:
 * - Authenticated user owns the post
 * - viewedByCount greater than 0
 */
const postSeenByVisility = (post, user) => (
  path(['postedBy', 'userId'], post) === path(['userId'], user) &&
  post.viewedByCount > 0
)

/**
 * Visibility of repost, button will be visible if:
 * - Authenticated user is not owner of a post
 */
const postRepostVisiblity = (post) =>
  !!path(['originalPost', 'postedBy', 'username'], post) &&
  path(['postedBy', 'username'])(post) !== path(['originalPost', 'postedBy', 'username'])(post)

/**
 * Visibility of post verification, modal will be visible if:
 * - Authenticated user is owner of a post
 * - Post is not text only
 * - Post has isVerified setting enabled 
 */
const postVerificationVisibility = (post) => (
  !PrivacyService.postRepostVisiblity(post) &&
  path(['isVerified'])(post) === false &&
  path(['postType'])(post) !== 'TEXT_ONLY'
)

/**
 * Visibility of post expiry, expiry will be visible if:
 * - Authenticated user is owner of a post
 * - Post is not text only
 * - Post has isVerified setting enabled 
 * - Post has expiresAt date
 */
const postExpiryVisiblity = (post) => (
  !PrivacyService.postVerificationVisibility(post) &&
  !!path(['expiresAt'])(post)
)

/**
 * Visibility of post likes, likes will be visible if:
 * - Post has likes setting enabled 
 * - Authenticated user is owner of a post
 */
const postLikedVisibility = (post, user) => (
  !!path(['onymouslyLikedBy', 'items', '0', 'username'])(post) &&
  !path(['likesDisabled'], post) &&
  path(['postedBy', 'userId'])(post) === user.userId
)

/**
 * Visibility of followers/followed, they will be visible if:
 * - Count of followers/followed is a number
 * 
 * - Authenticated user has followCounts setting enabled 
 * - Or Authenticated user is owner of a post
 * 
 * - Authenticated user has public account setting enabled 
 * - Or Authenticated user follow a post owner profile
 * - Or Authenticated user is owner of a post
 */
const followVisibilityRules = user => (
  path(['followCountsHidden'])(user) !== true ||
  path(['followedStatus'])(user) === 'SELF'
) && !(
  path(['followedStatus'])(user) !== 'FOLLOWING' &&
  path(['followedStatus'])(user) !== 'SELF' &&
  path(['privacyStatus'])(user) === 'PRIVATE'
)

const userFollowingVisibility = (user) => (
  is(Number)(path(['followersCount'])(user)) &&
  followVisibilityRules(user)
)

const userFollowerVisibility = (user) => (
  is(Number)(path(['followedsCount'])(user)) &&
  followVisibilityRules(user)
)

/**
 * Mock/Spy exported functions within a single module in Jest
 * https://medium.com/@DavideRama/mock-spy-exported-functions-within-a-single-module-in-jest-cdf2b61af642
 */ 
const PrivacyService = {
  postLikeVisibility,
  postCommentVisibility,
  postShareVisibility,
  postSeenByVisility,
  postRepostVisiblity,
  postVerificationVisibility,
  postExpiryVisiblity,
  postLikedVisibility,
  userFollowingVisibility,
  userFollowerVisibility,
}

export default PrivacyService
