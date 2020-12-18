export const gridAlbumFragment = `
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

  fragment originalPostUserFragment on User {
    userId
    username
    fullName
    themeCode
    subscriptionLevel
  }

  fragment albumUserFragment on User {
    userId
    username
    fullName
    themeCode
    subscriptionLevel
  }

  fragment postAlbumFragment on Post {
    postId
    isVerified
    likesDisabled
    commentsDisabled
    sharingDisabled
    image {
      ...imageFragment
    }
    postedBy {
      ...originalPostUserFragment
    }
  }

  fragment gridAlbumFragment on Album {
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
`
