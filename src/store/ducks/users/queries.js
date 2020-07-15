import {
  cardFragment,
  postFragment,
} from 'store/fragments'

import * as usersSingle from 'store/ducks/users/queries/single'
import * as usersList from 'store/ducks/users/queries/list'

export const searchUsers = `
  query SearchUsers($searchToken: String!, $limit: Int, $nextToken: String) {
    searchUsers(searchToken: $searchToken, limit: $limit, nextToken: $nextToken) {
      items {
        ...singleUserFragment
      }
      nextToken
    }
  }
  ${usersSingle.singleUserFragment}
`

export const followUser = `
  mutation FollowUser($userId: ID!) {
    followUser (userId: $userId) {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`

export const unfollowUser = `
  mutation UnfollowUser($userId: ID!) {
    unfollowUser (userId: $userId) {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`

export const deleteUser = `
  mutation deleteUser {
    deleteUser {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`

export const blockUser = `
  mutation BlockUser($userId: ID!) {
    blockUser (userId: $userId) {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`

export const unblockUser = `
  mutation UnblockUser($userId: ID!) {
    unblockUser (userId: $userId) {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`

export const user = `
  query user($userId: ID!) {
    user(userId: $userId) {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
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
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`

export const getImagePosts = `
  query GetImagePosts($userId: ID!) {
    user(userId: $userId) {
      posts(postType: IMAGE) {
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
          ...listUserFragment
        }
        nextToken
      }
    }
  }
  ${usersList.listUserFragment}
`

export const getFollowedUsers = `
  query getFollowedUsers($userId: ID!, $followStatus: FollowStatus) {
    user(userId: $userId) {
      followedUsers (followStatus: $followStatus) {
        items {
          ...listUserFragment
        }
        nextToken
      }
    }
  }
  ${usersList.listUserFragment}
`

export const getFollowerUsers = `
  query getFollowerUsers($userId: ID!, $followStatus: FollowStatus) {
    user(userId: $userId) {
      followerUsers (followStatus: $followStatus) {
        items {
          ...listUserFragment
        }
        nextToken
      }
    }
  }
  ${usersList.listUserFragment}
`

export const acceptFollowerUser = `
  mutation AcceptFollowerUser($userId: ID!) {
    acceptFollowerUser (userId: $userId) {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`

export const denyFollowerUser = `
  mutation DenyFollowerUser($userId: ID!) {
    denyFollowerUser (userId: $userId) {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`

export const self = `
  query self {
    self {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`

export const trendingUsers = `
  query trendingUsers($limit: Int) {
    trendingUsers(limit: $limit) {
      items {
        ...listUserFragment
      }
      nextToken
    }
  }
  ${usersList.listUserFragment}
`

export const getCards = `
  query getCards($limit: Int, $nextToken: String) {
    self {
      cards(limit: $limit, nextToken: $nextToken) {
        items {
          ...cardFragment
        }
        nextToken
      }
    }
  }
  ${cardFragment}
`

export const deleteCard = `
  mutation deleteCard($cardId: ID!) {
    deleteCard(cardId: $cardId) {
      ...cardFragment
    }
  }
  ${cardFragment}
`

export const setUserAPNSToken = `
  mutation setUserAPNSToken($token: String!) {
    setUserAPNSToken(token: $token) {
      userId
    }
  }
`

export const onCardNotification = `
  subscription onCardNotification ($userId: ID!) {
    onCardNotification (userId: $userId) {
      userId
      type
      card {
        cardId
      }
    }
  }
`