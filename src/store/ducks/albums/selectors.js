import { createSelectorCreator, defaultMemoize } from 'reselect'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'
import { initialState } from 'store/ducks/albums/reducer'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const entities = () => path(['entities'])

/**
 *
 */
const albumsGetCache = (userId) => path(['albums', 'albumsGetCache', userId])

export const albumsGetSelector = (userId) => createDeepEqualSelector(
  [albumsGetCache(userId), entities()],
  (albumsGetCache, entities) => {
    const albums = path(['data'])(albumsGetCache) ? albumsGetCache : initialState.albumsGet
    const denormalized = normalizer.denormalizeAlbumsGet(albums.data, entities)
    return assocPath(['data'], denormalized)(albums)
  }
)

/**
 *
 */
const albumsSingleGet = () => path(['albums', 'albumsSingleGet'])

export const albumsSingleGetSelector = (albumId) => createDeepEqualSelector(
  [albumsSingleGet(), entities()],
  (albumsSingleGet, entities) => {
    const denormalized = normalizer.denormalizeAlbumGet(albumId, entities)
    return assocPath(['data'], denormalized)(albumsSingleGet)
  }
)

/**
 *
 */
const albumsPostsGetCache = (albumId) => path(['albums', 'albumsPostsGetCache', albumId])

export const albumsPostsGetSelector = (albumId) => createDeepEqualSelector(
  [albumsPostsGetCache(albumId), entities()],
  (albumsPostsGetCache, entities) => {
    const posts = path(['data'])(albumsPostsGetCache) ? albumsPostsGetCache : initialState.albumsPostsGet
    const denormalized = normalizer.denormalizePostsGet(posts.data, entities)
    return assocPath(['data'], denormalized)(posts)
  }
)