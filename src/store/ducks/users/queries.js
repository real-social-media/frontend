import {
  cardFragment,
  postFragment,
  userFragment,
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
    $username: String,
    $fullName: String,
    $displayName: String,
    $bio: String,
    $photoPostId: ID,
    $privacyStatus: PrivacyStatus,
    $followCountsHidden: Boolean,
    $viewCountsHidden: Boolean,
    $commentsDisabled: Boolean,
    $likesDisabled: Boolean,
    $sharingDisabled: Boolean,
    $verificationHidden: Boolean,
    $languageCode: String,
    $themeCode: String,
    $dateOfBirth: AWSDate,
    $gender: UserGender,
    $location: LocationInput,
    $height: Int,
    $matchAgeRange: AgeRangeInput,
    $matchGenders: [UserGender!],
    $matchLocationRadius: Int,
    $matchHeightRange: HeightRangeInput,
  ) {
    setUserDetails(
      username: $username,
      fullName: $fullName,
      displayName: $displayName,
      bio: $bio,
      photoPostId: $photoPostId,
      privacyStatus: $privacyStatus,
      followCountsHidden: $followCountsHidden,
      viewCountsHidden: $viewCountsHidden,
      commentsDisabled: $commentsDisabled,
      likesDisabled: $likesDisabled,
      sharingDisabled: $sharingDisabled,
      verificationHidden: $verificationHidden,
      languageCode: $languageCode,
      themeCode: $themeCode,
      dateOfBirth: $dateOfBirth,
      gender: $gender,
      location: $location,
      height: $height,
      matchAgeRange: $matchAgeRange,
      matchGenders: $matchGenders,
      matchLocationRadius: $matchLocationRadius,
      matchHeightRange: $matchHeightRange,
    ) {
      ...singleUserFragment
    }
  }
  ${usersSingle.singleUserFragment}
`

export const getImagePosts = `
  query GetImagePosts($userId: ID!, $isVerified: Boolean) {
    user(userId: $userId) {
      posts(postType: IMAGE) {
        items(isVerified: $isVerified) {
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
      ...userFragment
    }
  }
  ${userFragment}
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

export const onNotification = `
  subscription onNotification ($userId: ID!) {
    onNotification (userId: $userId) {
      userId
      postId
      followedUserId
      type
      userChatsWithUnviewedMessagesCount
    }
  }
`

export const reportScreenViews = `
  mutation reportScreenViews($screens: [String!]!) {
    reportScreenViews(screens: $screens)
  }
`

export const setUserDatingStatus = `
  mutation setUserDatingStatus($status: DatingStatus!) {
    setUserDatingStatus(status: $status) {
      ...userFragment
    }
  }
  ${userFragment}
`

export const usernameStatus = `
  query usernameStatus($username: String!) {
    usernameStatus(username: $username)
  }
`
