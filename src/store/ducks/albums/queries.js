import * as albumsGrid from 'store/ducks/albums/queries/grid'
import * as albumsSingle from 'store/ducks/albums/queries/single'

export const addAlbum = `
  mutation addAlbum(
    $albumId: ID!,
    $name: String!
  ) {
    addAlbum(
      albumId: $albumId,
      name: $name
    ) {
      ...singleAlbumFragment
    }
  }
  ${albumsSingle.singleAlbumFragment}
`

export const getAlbum = `
  query getAlbum($albumId: ID!, $limit: Int, $nextToken: String = null) {
    album(albumId: $albumId) {
      ...singleAlbumFragment
    }
  }
  ${albumsSingle.singleAlbumFragment}
`

export const getAlbumPosts = `
  query getAlbumPosts($albumId: ID!, $limit: Int, $nextToken: String = null) {
    album(albumId: $albumId) {
      posts(limit: $limit, nextToken: $nextToken) {
        items {
          ...singleAlbumPostFragment
        }
        nextToken
      }
    }
  }
  ${albumsSingle.singleAlbumPostFragment}
`

export const getAlbums = `
  query getAlbums($userId: ID!) {
    user(userId: $userId) {
      albums(limit) {
        items {
          ...gridAlbumFragment
        }
        nextToken
      }
    }
  }
  ${albumsGrid.gridAlbumFragment}
`

export const editAlbum = `
  mutation editAlbum(
    $albumId: ID!,
    $name: String,
  ) {
    editAlbum(
      albumId: $albumId,
      name: $name,
    ) {
      ...singleAlbumFragment
    }
  }
  ${albumsSingle.singleAlbumFragment}
`

export const deleteAlbum = `
  mutation deleteAlbum($albumId: ID!) {
    deleteAlbum (albumId: $albumId) {
      ...singleAlbumFragment
    }
  }
  ${albumsSingle.singleAlbumFragment}
`
