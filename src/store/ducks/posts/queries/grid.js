export const gridPostFragment = `
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

  fragment postUserFragment on User {
    userId
    username
    datingStatus
    viewCountsHidden
    commentsDisabled
    likesDisabled
    sharingDisabled
    verificationHidden
    fullName
    displayName
    themeCode
    bio
    blockedStatus
    blockerStatus
    subscriptionLevel

    photo {
      ...imageFragment
    }
  }

  fragment gridPostFragment on Post {
    postId
    isVerified
    postStatus
    postType
    postedAt
    payment
    expiresAt
    text
    likesDisabled
    commentsDisabled
    sharingDisabled
    commentsUnviewedCount: commentsCount(viewedStatus: NOT_VIEWED)

    image {
      ...imageFragment
    }

    postedBy {
      ...postUserFragment
    }
  }
`
