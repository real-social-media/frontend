import { createSelectorCreator, defaultMemoize } from 'reselect'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'
import * as entitiesSelector from 'store/ducks/entities/selectors'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals,
)

/**
 *
 */
const datingMatchedUsers = () => path(['dating', 'datingMatchedUsers'])

export const datingMatchedUsersSelector = () => createDeepEqualSelector(
  [datingMatchedUsers(), entitiesSelector.entities],
  (datingMatchedUsers, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(datingMatchedUsers.data, entities)
    return assocPath(['data'], denormalized)(datingMatchedUsers)
  },
)

/**
 *
 */
const datingConfirmedUsers = () => path(['dating', 'datingConfirmedUsers'])

export const datingConfirmedUsersSelector = () => createDeepEqualSelector(
  [datingConfirmedUsers(), entitiesSelector.entities],
  (datingConfirmedUsers, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(datingConfirmedUsers.data, entities)
    return assocPath(['data'], denormalized)(datingConfirmedUsers)
  },
)
