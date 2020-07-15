export const singleUserFragment = `
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

  fragment singleUserFragment on User {
    userId
    username
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
    chatsWithUnviewedMessagesCount

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
