export const listUserFragment = `
  fragment userImageFragment on Image {
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

  fragment userStoryUserFragment on User {
    userId
    username
    fullName
    themeCode
  }

  fragment userStoryFragment on Post {
    postId
    postStatus
    postType
    postedAt
    expiresAt
    text
    isVerified
    likeStatus
    onymousLikeCount
    anonymousLikeCount
    viewedByCount
    image {
      ...userImageFragment
    }
    postedBy {
      ...userStoryUserFragment
    }
  }

  fragment listUserFragment on User {
    userId
    username
    privacyStatus
    followedStatus
    followerStatus
    followedCount
    followerCount
    postCount
    fullName
    themeCode
    signedUpAt
    blockedStatus
    blockerStatus

    photo {
      ...userImageFragment
    }

    stories (limit: 12) {
      items {
        ...userStoryFragment
      }
      nextToken 
    }

    directChat {
      chatId
    }
  }
`
