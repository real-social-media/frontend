import path from 'ramda/src/path'
import assocPath from 'ramda/src/assocPath'
import * as normalizer from 'normalizer/schemas'
import { entitiesSelector } from 'store/ducks/entities/selectors'
import { createDeepEqualSelector } from 'store/helpers'

/**
 *
 */
const datingMatchedUsers = () => path(['dating', 'datingMatchedUsers'])

export const datingMatchedUsersSelector = () => createDeepEqualSelector(
  [datingMatchedUsers(), entitiesSelector],
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
  [datingConfirmedUsers(), entitiesSelector],
  (datingConfirmedUsers, entities) => {
    const denormalized = normalizer.denormalizeUsersGet(datingConfirmedUsers.data, entities)
    return assocPath(['data'], denormalized)(datingConfirmedUsers)
  },
)
