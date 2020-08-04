import { createSelectorCreator, defaultMemoize } from 'reselect'
import path from 'ramda/src/path'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize
)

/**
 *
 */
const datingGet = () => path(['entities', 'dating', 'datingGet'])

export const usersGetProfileSelector = () => createDeepEqualSelector(
  [datingGet()]
)
