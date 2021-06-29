import { createAction } from 'redux-actions'
import { createSelectorCreator, defaultMemoize } from 'reselect'
import equals from 'ramda/src/equals'
import identity from 'ramda/src/identity'

export const createDeepEqualSelector = createSelectorCreator(defaultMemoize, equals)
export const createActionWithMeta = type => createAction(type, identity, (payload, meta) => meta)
