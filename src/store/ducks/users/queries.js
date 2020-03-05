import {
  imageFragment,
  postFragment,
  userFragment,
} from 'store/fragments'

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
  mutation setUserDetails(
    $fullName: String,
    $bio: String,
    $photoPostId: ID,
    $privacyStatus: PrivacyStatus,
    $followCountsHidden: Boolean,
    $viewCountsHidden: Boolean,
    $commentsDisabled: Boolean,
    $likesDisabled: Boolean,
    $sharingDisabled: Boolean,
    $themeCode: String,
    $languageCode: String,
    $verificationHidden: Boolean
  ) {
    setUserDetails(
      fullName: $fullName,
      bio: $bio,
      photoPostId: $photoPostId,
      privacyStatus: $privacyStatus,
      followCountsHidden: $followCountsHidden,
      viewCountsHidden: $viewCountsHidden,
      commentsDisabled: $commentsDisabled,
      likesDisabled: $likesDisabled,
      sharingDisabled: $sharingDisabled,
      themeCode: $themeCode,
      languageCode: $languageCode,
      verificationHidden: $verificationHidden
    ) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const getImagePosts = `
  query GetImagePosts($userId: ID!) {
    user(userId: $userId) {
      posts(postType: 'IMAGE') {
        items {
          ...postFragment
        }
        nextToken
      }
    }
  }
  ${postFragment}
`

export const getFollowedUsersWithStories = `
  query GetFollowedUsersWithStories($limit: Int, $nextToken: String) {
    self {
      followedUsersWithStories(limit: $limit, nextToken: $nextToken) {
        items {
          ...userFragment
        }
        nextToken
      }
    }
  }
  ${userFragment}
`

export const getFollowedUsers = `
  query getFollowedUsers($userId: ID!, $followStatus: FollowStatus) {
    user(userId: $userId) {
      followedUsers (followStatus: $followStatus) {
        items {
          ...userFragment
        }
        nextToken
      }
    }
  }
  ${userFragment}
`

export const getFollowerUsers = `
  query getFollowerUsers($userId: ID!, $followStatus: FollowStatus) {
    user(userId: $userId) {
      followerUsers (followStatus: $followStatus) {
        items {
          ...userFragment
        }
        nextToken
      }
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