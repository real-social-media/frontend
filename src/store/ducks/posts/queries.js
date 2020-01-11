const postUserFragment = `
  fragment postUserFragment on User {
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

const mediaObjectFragment = `
  fragment mediaObjectFragment on MediaObject {
    mediaId
    mediaType
    mediaStatus
    url
    url64p
    url480p
    url1080p
    url4k
    uploadUrl
    width
    height
    isVerified
  }
`

const postFragment = `
  fragment postFragment on Post {
    postId
    postedAt
    postedBy {
      ...postUserFragment
    }
    expiresAt
    text
    mediaObjects {
      ...mediaObjectFragment
    }
    likeStatus
    commentsDisabled
    likesDisabled
    onymousLikeCount
    anonymousLikeCount
    onymouslyLikedBy (limit: 1) {
      ...postUserFragment
    }
  }
  ${mediaObjectFragment}
  ${postUserFragment}
`

export const getPosts = `
  query GetPosts($userId: ID, $postStatus: PostStatus, $nextToken: String = null) {
    getPosts(userId: $userId, postStatus: $postStatus, nextToken: $nextToken) {
      items {
        ...postFragment
      }
      nextToken
    }
  }
  ${postFragment}
`

export const getPost = `
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const getFeed = `
  query GetFeed($limit: Int = 20, $nextToken: String = null) {
    getFeed(limit: $limit, nextToken: $nextToken) {
      items {
        ...postFragment
      }
      nextToken
    }
  }
  ${postFragment}
`

export const getStories = `
  query GetStories($userId: ID, $limit: Int, $nextToken: String = null) {
    getStories(userId: $userId, limit: $limit, nextToken: $nextToken) {
      items {
        ...postFragment
      }
      nextToken
    }
  }
  ${postFragment}
`

export const addPost = `
  mutation AddMediaPost($postId: ID!, $lifetime: String, $mediaId: ID!, $text: String, $commentsDisabled: Boolean, $likesDisabled: Boolean, $takenInReal: Boolean, $originalFormat: String) {
    addPost (postId: $postId, lifetime: $lifetime, text: $text, mediaObjectUploads: [{ mediaId: $mediaId, mediaType: IMAGE, takenInReal: $takenInReal, originalFormat: $originalFormat }], commentsDisabled: $commentsDisabled, likesDisabled: $likesDisabled) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const archivePost = `
  mutation ArchivePost($postId: ID!) {
    archivePost (postId: $postId) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const restoreArchivedPost = `
  mutation restoreArchivedPost($postId: ID!) {
    restoreArchivedPost (postId: $postId) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const flagPost = `
  mutation FlagPost($postId: ID!) {
    flagPost (postId: $postId) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const editPost = `
  mutation EditPost($postId: ID!, $text: String) {
    editPost (postId: $postId, text: $text) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const deletePost = `
  mutation DeletePost($postId: ID!) {
    deletePost (postId: $postId) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const onymouslyLikePost = `
  mutation OnymouslyLikePost($postId: ID!) {
    onymouslyLikePost (postId: $postId) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const anonymouslyLikePost = `
  mutation AnonymouslyLikePost($postId: ID!) {
    anonymouslyLikePost (postId: $postId) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const dislikePost = `
  mutation DislikePost($postId: ID!) {
    dislikePost (postId: $postId) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const reportPostViews = `
  mutation reportPostViews($postIds: [ID!]!) {
    reportPostViews (postIds: $postIds)
  }
`

export const trendingPosts = `
  query trendingPosts($limit: Int, $nextToken: String = null) {
    trendingPosts(limit: $limit, nextToken: $nextToken) {
      items {
        ...postFragment
      }
      nextToken
    }
  }
  ${postFragment}
`