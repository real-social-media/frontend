import { createSelectorCreator, defaultMemoize } from 'reselect'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'
import { initialState } from 'store/ducks/dating/reducer'

const datingGetCache = (userId) => path(['dating', 'datingGetCache', userId])

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals
)

const entities = () => path(['entities'])

export const datingGetSelector = (userId) => createDeepEqualSelector(
  [datingGetCache(userId), entities()],
  (datingGetCache, entities) => {
    const dating = path(['data'])(datingGetCache) ? datingGetCache : initialState.datingGet
    const denormalized = normalizer.denormalizeDatingGet(dating.data, entities)

    return assocPath(['data'], denormalized)(dating)
  }
)
