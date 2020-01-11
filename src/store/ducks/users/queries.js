const mediaObjectFragment = `
  fragment mediaObjectFragment on MediaObject {
    mediaId
    mediaType
    mediaStatus
    url
    url480p
    url64p
    url1080p
    url4k
    uploadUrl
    width
    height
    isVerified
  }
`

const userFragment = `
  fragment userFragment on User {
    userId
    username
    photoUrl
    photoUrl64p
    photoUrl480p
    photoUrl1080p
    photoUrl4k
    privacyStatus
    followedStatus
    followerStatus
    followedCount
    followerCount
    followCountsHidden
    commentsDisabled
    likesDisabled
    postCount
    fullName
    themeCode
    blockedAt
    blockerAt
    bio
    email
    phoneNumber
    languageCode
  }
`

const userPostFragment = `
  fragment userPostFragment on Post {
    postId
    postedAt
    postedBy {
      ...userFragment
    }
    expiresAt
    text
    mediaObjects {
      ...mediaObjectFragment
    }
    likeStatus
    onymousLikeCount
    anonymousLikeCount
    onymouslyLikedBy (limit: 1) {
      ...userFragment
    }
  }
  ${mediaObjectFragment}
  ${userFragment}
`

export const searchUsers = `
  query SearchUsers($searchToken: String!, $limit: Int, $nextToken: String) {
    searchUsers(searchToken: $searchToken, limit: $limit, nextToken: $nextToken) {
      items {
        ...userFragment
      }
      nextToken
    }
  }
  ${userFragment}
`

export const followUser = `
  mutation FollowUser($userId: ID!) {
    followUser (userId: $userId) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const unfollowUser = `
  mutation UnfollowUser($userId: ID!) {
    unfollowUser (userId: $userId) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const blockUser = `
  mutation BlockUser($userId: ID!) {
    blockUser (userId: $userId) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const unblockUser = `
  mutation UnblockUser($userId: ID!) {
    unblockUser (userId: $userId) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const user = `
  query user($userId: ID!) {
    user(userId: $userId) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const setUserDetails = `
  mutation SetUserDetails($fullName: String, $bio: String, $photoMediaId: ID, $privacyStatus: PrivacyStatus, $followCountsHidden: Boolean, $commentsDisabled: Boolean, $likesDisabled: Boolean, $themeCode: String, $languageCode: String) {
    setUserDetails(fullName: $fullName, bio: $bio, photoMediaId: $photoMediaId, privacyStatus: $privacyStatus, followCountsHidden: $followCountsHidden, commentsDisabled: $commentsDisabled, likesDisabled: $likesDisabled, themeCode: $themeCode, languageCode: $languageCode) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const getMediaObjects = `
  query GetMediaObjects($userId: ID) {
    getMediaObjects(userId: $userId) {
      items {
        ...mediaObjectFragment
      }
      nextToken
    }
  }
  ${mediaObjectFragment}
`

export const getFollowedUsersWithStories = `
  query GetFollowedUsersWithStories($limit: Int, $nextToken: String) {
    getFollowedUsersWithStories(limit: $limit, nextToken: $nextToken) {
      items {
        ...userFragment
      }
      nextToken
    }
  }
  ${userFragment}
`

export const getFollowedUsers = `
  query GetFollowedUsers($userId: ID, $followStatus: FollowStatus) {
    getFollowedUsers(userId: $userId, followStatus: $followStatus) {
      items {
        ...userFragment
      }
      nextToken
    }
  }
  ${userFragment}
`

export const getFollowerUsers = `
  query GetFollowerUsers($userId: ID, $followStatus: FollowStatus) {
    getFollowerUsers(userId: $userId, followStatus: $followStatus) {
      items {
        ...userFragment
      }
      nextToken
    }
  }
  ${userFragment}
`

export const acceptFollowerUser = `
  mutation AcceptFollowerUser($userId: ID!) {
    acceptFollowerUser (userId: $userId) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const denyFollowerUser = `
  mutation DenyFollowerUser($userId: ID!) {
    denyFollowerUser (userId: $userId) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const getStories = `
  query GetStories {
    getStories {
      items {
        ...userPostFragment
      }
      nextToken
    }
  }
  ${userPostFragment}
`

export const self = `
  query self {
    self {
      ...userFragment
    }
  }
  ${userFragment}
`

export const trendingUsers = `
  query trendingUsers($limit: Int) {
    trendingUsers(limit: $limit) {
      items {
        ...userFragment
      }
      nextToken
    }
  }
  ${userFragment}
`