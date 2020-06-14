import { createSelectorCreator, defaultMemoize } from 'reselect'
import update from 'immutability-helper'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const entities = () => path(['entities'])
const albumsGetCache = (userId) => path(['albums', 'albumsGetCache', userId])

/**
 *
 */
const albumsGet = () => path(['albums', 'albumsGet'])

export const albumsGetSelector = (userId) => createDeepEqualSelector(
  [albumsGet(), albumsGetCache(userId), entities()],
  (albumsGet, albumsGetCache, entities) => {
    const posts = path(['data'])(albumsGetCache) || []
    const denormalized = normalizer.denormalizeAlbumsGet(posts, entities)
    return assocPath(['data'], denormalized)(albumsGet)
  }
)