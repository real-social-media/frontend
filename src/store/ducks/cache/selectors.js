import { createSelectorCreator, defaultMemoize } from 'reselect'
import path from 'ramda/src/path'
import equals from 'ramda/src/equals'

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, equals)

/**
 *
 */
const cached = (partial) => path(['cache', 'cached', partial])

export const cachedSelector = (partial) => createDeepEqualSelector([cached(partial)], (cached) => cached)

/**
 *
 */
const progress = (partial) => path(['cache', 'progress', partial])

export const progressSelector = (partial) => createDeepEqualSelector([progress(partial)], (progress) => progress)

/**
 *
 */
const failed = (partial) => path(['cache', 'failed', partial])

export const failedSelector = (partial) => createDeepEqualSelector([failed(partial)], (failed) => failed)
