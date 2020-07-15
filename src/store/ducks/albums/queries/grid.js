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
  }

  fragment albumUserFragment on User {
    userId
    username
    fullName
    themeCode
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
