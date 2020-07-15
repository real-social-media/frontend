export const feedPostFragment = `
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
    viewCountsHidden
    commentsDisabled
    likesDisabled
    sharingDisabled
    verificationHidden
    fullName
    themeCode
    bio
    blockedStatus
    blockerStatus

    photo {
      ...imageFragment
    }
  }

  fragment originalPostUserFragment on User {
    userId
    username
    fullName
    themeCode
  }

  fragment commentUserFragment on User {
    userId
    username
    fullName
    themeCode
  }

  fragment taggedUserFragment on User {
    userId
    username
    fullName
    themeCode
  }

  fragment albumUserFragment on User {
    userId
    username
    fullName
    themeCode
  }

  fragment likedUserFragment on User {
    userId
    username
    fullName
    themeCode

    photo {
      ...imageFragment
    }
  }

  fragment originalPostFragment on Post {
    postId
    isVerified
    postedBy {
      ...originalPostUserFragment
    }
  }

  fragment postAlbumFragment on Post {
    postId
    isVerified
    image {
      ...imageFragment
    }
    postedBy {
      ...originalPostUserFragment
    }
  }

  fragment commentFragment on Comment {
    commentId
    commentedAt
    commentedBy {
      ...commentUserFragment
    }
    text
    textTaggedUsers {
      tag
      user {
        ...taggedUserFragment
      }
    }
  }

  fragment albumFragment on Album {
    albumId
    createdAt
    name
    description
    postCount
    postsLastUpdatedAt
    art {
      ...imageFragment
    }
    ownedBy {
      ...albumUserFragment
    }
    posts(limit: 10) {
      items {
        ...postAlbumFragment
      }
      nextToken
    }
  }

  fragment feedPostFragment on Post {
    postId
    postStatus
    postType
    postedAt
    expiresAt
    text
    imageUploadUrl
    isVerified
    likeStatus
    commentsCount
    commentsUnviewedCount: commentsCount(viewedStatus: NOT_VIEWED)
    commentsDisabled
    likesDisabled
    sharingDisabled
    verificationHidden
    onymousLikeCount
    anonymousLikeCount
    viewedByCount
    viewedStatus

    textTaggedUsers {
      tag
      user {
        ...taggedUserFragment
      }
    }

    image {
      ...imageFragment
    }

    postedBy {
      ...postUserFragment
    }

    originalPost {
      ...originalPostFragment
    }

    onymouslyLikedBy (limit: 1) {
      items {
        ...likedUserFragment
      }
      nextToken
    }

    comments (limit: 3) {
      items {
        ...commentFragment
      }
      nextToken
    }

    album {
      ...albumFragment
    }
  }
`
