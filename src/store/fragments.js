export const imageFragment = `
  fragment imageFragment on Image {
    url
    url64p
    url480p
    url1080p
    url4k
    width
    height
    colors {
      r
      g
      b
    }
  }
`

export const userFragment = `
  fragment rootUser on User {
    userId
    username
    photo {
      ...imageFragment
    }
    privacyStatus
    followedStatus
    followerStatus
    followedCount
    followerCount
    followCountsHidden
    viewCountsHidden
    commentsDisabled
    likesDisabled
    sharingDisabled
    verificationHidden
    postCount
    fullName
    themeCode
    bio
    email
    phoneNumber
    languageCode
    signedUpAt
    postViewedByCount
    blockedStatus
    blockerStatus
  }

  fragment userFragment on User {
    ...rootUser

    stories (limit: 12) {
      items {
        postId
        postStatus
        postType
        postedAt
        postedBy {
          ...rootUser
        }
        expiresAt
        text
        textTaggedUsers {
          tag
          user {
            ...rootUser
          }
        }
        image {
          ...imageFragment
        }
        isVerified
        likeStatus
        onymousLikeCount
        anonymousLikeCount
        viewedByCount
      }
      nextToken 
    }
  }

  ${imageFragment}
`

export const commentFragment = `
  fragment commentFragment on Comment {
    commentId
    commentedAt
    commentedBy {
      ...userFragment
    }
    text
    textTaggedUsers {
      tag
      user {
        ...userFragment
      }
    }
  }
  ${userFragment}
`

export const postFragment = `
  fragment rootPost on Post {
    postId
    postStatus
    postType
    postedAt
    postedBy {
      ...userFragment
    }
    expiresAt
    text
    textTaggedUsers {
      tag
      user {
        ...userFragment
      }
    }
    image {
      ...imageFragment
    }
    imageUploadUrl
    isVerified
    likeStatus
    commentCount
    commentsDisabled
    likesDisabled
    sharingDisabled
    verificationHidden
    onymousLikeCount
    anonymousLikeCount
    viewedByCount
  }

  fragment postFragment on Post {
    ...rootPost
    onymouslyLikedBy (limit: 1) {
      items {
        ...userFragment
      }
      nextToken
    }
    comments (limit: 3) {
      items {
        ...commentFragment
      }
    }
    album {
      albumId
      createdAt
      ownedBy {
        ...userFragment
      }
      name
      description
      art {
        ...imageFragment
      }
      postCount
      postsLastUpdatedAt
      posts(limit: 10) {
        items {
          ...rootPost
        }
        nextToken
      }
    }
  }
  ${commentFragment}
`

export const albumFragment = `
  fragment albumFragment on Album {
    albumId
    createdAt
    ownedBy {
      ...userFragment
    }
    name
    description
    posts(limit: 10) {
      items {
        ...postFragment
      }
      nextToken
    }
    art {
      ...imageFragment
    }
    postCount
    postsLastUpdatedAt
  }
  ${postFragment}
`