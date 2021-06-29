import path from 'ramda/src/path'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'
import { initialState } from 'store/ducks/albums/reducer'
import { createDeepEqualSelector } from 'store/helpers'
import { entitiesSelector } from 'store/ducks/entities/selectors'

/**
 *
 */
const albumsGetCache = (userId) => path(['albums', 'albumsGetCache', userId])

export const albumsGetSelector = (userId) => createDeepEqualSelector(
  [albumsGetCache(userId), entitiesSelector],
  (albumsGetCache, entities) => {
    const albums = path(['data'])(albumsGetCache) ? albumsGetCache : initialState.albumsGet
    const denormalized = normalizer.denormalizeAlbumsGet(albums.data, entities)
    return assocPath(['data'], denormalized)(albums)
  },
)

/**
 *
 */
const albumsSingleGet = () => path(['albums', 'albumsSingleGet'])

export const albumsSingleGetSelector = (albumId) => createDeepEqualSelector(
  [albumsSingleGet(), entitiesSelector],
  (albumsSingleGet, entities) => {
    const denormalized = normalizer.denormalizeAlbumGet(albumId, entities)
    return assocPath(['data'], denormalized)(albumsSingleGet)
  },
)

/**
 *
 */
const albumsPostsGetCache = (albumId) => path(['albums', 'albumsPostsGetCache', albumId])

export const albumsPostsGetSelector = (albumId) => createDeepEqualSelector(
  [albumsPostsGetCache(albumId), entitiesSelector],
  (albumsPostsGetCache, entities) => {
    const posts = path(['data'])(albumsPostsGetCache) ? albumsPostsGetCache : initialState.albumsPostsGet
    const denormalized = normalizer.denormalizePostsGet(posts.data, entities)
    return assocPath(['data'], denormalized)(posts)
  },
)
