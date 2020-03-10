import {
  userFragment,
  postFragment,
  commentFragment,
} from 'store/fragments'

export const getPosts = `
  query GetPosts($userId: ID!, $postStatus: PostStatus, $nextToken: String = null) {
    user(userId: $userId) {
      posts(postStatus: $postStatus, nextToken: $nextToken) {
        items {
          ...postFragment
        }
        nextToken
      }
    }
  }
  ${postFragment}
`

export const getPost = `
  query GetPost($postId: ID!) {
    post(postId: $postId) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const getFeed = `
  query GetFeed($limit: Int = 20, $nextToken: String = null) {
    self {
      feed(limit: $limit, nextToken: $nextToken) {
        items {
          ...postFragment
        }
        nextToken
      }
    }
  }
  ${postFragment}
`

export const addTextOnlyPost = `
  mutation AddMediaPost(
    $postId: ID!,
    $postType: PostType,
    $albumId: ID,
    $lifetime: String,
    $text: String,
    $commentsDisabled: Boolean,
    $likesDisabled: Boolean,
    $sharingDisabled: Boolean,
    $verificationHidden: Boolean
  ) {
    addPost (
      postId: $postId,
      postType: $postType,
      albumId: $albumId,
      lifetime: $lifetime,
      text: $text,
      commentsDisabled: $commentsDisabled,
      likesDisabled: $likesDisabled,
      sharingDisabled: $sharingDisabled,
      verificationHidden: $verificationHidden,
    ) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const addPhotoPost = `
  mutation AddMediaPost(
    $postId: ID!,
    $postType: PostType,
    $albumId: ID,
    $lifetime: String,
    $mediaId: ID!,
    $text: String,
    $commentsDisabled: Boolean,
    $likesDisabled: Boolean,
    $sharingDisabled: Boolean,
    $takenInReal: Boolean,
    $originalFormat: String,
    $verificationHidden: Boolean
  ) {
    addPost (
      postId: $postId,
      postType: $postType,
      albumId: $albumId,
      lifetime: $lifetime,
      text: $text,
      commentsDisabled: $commentsDisabled,
      likesDisabled: $likesDisabled,
      sharingDisabled: $sharingDisabled,
      verificationHidden: $verificationHidden,
      mediaObjectUploads: [{
        mediaId: $mediaId,
        mediaType: IMAGE,
        takenInReal: $takenInReal,
        originalFormat: $originalFormat
      }]) {
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
  mutation editPost(
    $postId: ID!,
    $text: String,
    $commentsDisabled: Boolean,
    $likesDisabled: Boolean,
    $sharingDisabled: Boolean,
  ) {
    editPost (
      postId: $postId,
      text: $text,
      commentsDisabled: $commentsDisabled,
      likesDisabled: $likesDisabled,
      sharingDisabled: $sharingDisabled,
    ) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const editPostExpiresAt = `
  mutation editPostExpiresAt($postId: ID!, $expiresAt: AWSDateTime) {
    editPostExpiresAt (postId: $postId, expiresAt: $expiresAt) {
      ...postFragment
    }
  }
  ${postFragment}
`

export const editPostAlbum = `
  mutation editPostAlbum($postId: ID!, $albumId: ID) {
    editPostAlbum (postId: $postId, albumId: $albumId) {
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

export const viewedBy = `
  query viewedBy($postId: ID!, $limit: Int, $nextToken: String) {
    post(postId: $postId) {
      viewedBy(limit: $limit, nextToken: $nextToken) {
        items {
          ...userFragment
        }
        nextToken
      }
    }
  }
  ${userFragment}
`

export const onymouslyLikedBy = `
  query onymouslyLikedBy($postId: ID!, $limit: Int, $nextToken: String) {
    post(postId: $postId) {
      onymouslyLikedBy(limit: $limit, nextToken: $nextToken) {
        items {
          ...userFragment
        }
        nextToken
      }
    }
  }
  ${userFragment}
`

export const addComment = `
  mutation addComment(
    $postId: ID!,
    $commentId: ID!,
    $text: String!,
  ) {
    addComment (
      postId: $postId,
      commentId: $commentId,
      text: $text,
    ) {
      ...commentFragment
    }
  }
  ${commentFragment}
`

export const comments = `
  query comments($postId: ID!, $limit: Int, $nextToken: String) {
    post(postId: $postId) {
      comments(limit: $limit, nextToken: $nextToken) {
        items {
          ...commentFragment
        }
        nextToken
      }
    }
  }
  ${commentFragment}
`

export const setUserDetails = `
  mutation setUserDetails(
    $photoPostId: ID
  ) {
    setUserDetails(
      photoPostId: $photoPostId
    ) {
      ...userFragment
    }
  }
  ${userFragment}
`