import path from 'ramda/src/path'
import is from 'ramda/src/is'
import isEmpty from 'ramda/src/isEmpty'
import pathOr from 'ramda/src/pathOr'
import propEq from 'ramda/src/propEq'

/**
 * Visibility of like button, like button will be visible if:
 * - Post owner has enabled likes
 * - Post owner has not enabled likesDisabled global setting
 * - Like hasn't been set before, which allows only 1 like per post
 */
const postLikeVisibility = (post, user) => (
  !path(['likesDisabled'], post) &&
  !path(['postedBy', 'likesDisabled'])(post) &&
  !path(['likesDisabled'])(user)
)

/**
 * Visibility of comment button, comment button will be visible if:
 * - Post owner has enabled comments
 * - Post owner has not enabled commentsDisabled global setting
 */
const postCommentVisibility = (post, user) => (
  !path(['commentsDisabled'], post) &&
  !path(['postedBy', 'commentsDisabled'])(post) &&
  !path(['commentsDisabled'])(user)
)

/**
 * Visibility of share button, share button will be visible if:
 * - Post owner has enabled shares
 * - Current authenticated user has shares enabled in settings
 * - Current authenticated user is tagged in post by author
 * - Post owner has enabled shares on post level
 */
const isUserTagged = (post, user) => {
  const taggedUsers = pathOr([], ['textTaggedUsers'], post)
  const username = `@${path(['username'])(user)}`

  return taggedUsers.findIndex(propEq('tag', username)) !== -1
}

const postShareVisibility = (post, user) => (
  !propEq('postStatus', 'ARCHIVED')(post) &&
  !path(['sharingDisabled'])(user) &&
  !path(['postedBy', 'sharingDisabled'])(post) &&
  !(propEq('sharingDisabled', true)(post) && !isUserTagged(post, user))
)

/**
 * Visibility of seen by text, text will be visible if:
 * - Current authenticated user owns the post
 * - Post has not enabled viewCountsHidden setting
 * - Post owner has not enabled viewCountsHidden global setting
 */
const postSeenByVisility = (post, user) => (
  path(['postedBy', 'userId'], post) === path(['userId'], user) &&
  !path(['viewCountsHidden'], post) &&
  !path(['viewCountsHidden'], user) &&
  !path(['postedBy', 'viewCountsHidden'], post) &&
  post.viewedByCount > 0
)

/**
 *
 */
const postRepostVisiblity = (post) => (
  !isEmpty(path(['originalPost', 'postedBy', 'username'])(post)) &&
  path(['postedBy', 'username'])(post) !== path(['originalPost', 'postedBy', 'username'])(post)
)

/**
 *
 */
const postVerificationVisibility = (post) => (
  !PrivacyService.postRepostVisiblity(post) &&
  path(['isVerified'])(post) === false &&
  path(['postType'])(post) !== 'TEXT_ONLY'
)

/**
 *
 */
const selfPostVerificationVisibility = (post, user) => (
  user.userId === path(['postedBy', 'userId'])(post) &&
  PrivacyService.postVerificationVisibility(post)
)

/**
 *
 */
const postExpiryVisiblity = (post) => (
  !PrivacyService.postRepostVisiblity(post) &&
  !PrivacyService.postVerificationVisibility(post) &&
  !!path(['expiresAt'])(post)
)

/**
 *
 */
const postLikedVisibility = (post, user) => (
  !!path(['onymouslyLikedBy', 'items', '0', 'username'])(post) &&
  !path(['postedBy', 'likesDisabled'])(post) &&
  !path([ 'likesDisabled'], post) &&
  path(['postedBy', 'userId'])(post) === user.userId
)

/**
 *
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
  selfPostVerificationVisibility,
  postExpiryVisiblity,
  postLikedVisibility,
  userFollowingVisibility,
  userFollowerVisibility,
}

export default PrivacyService