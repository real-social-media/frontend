import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/cache/constants'
import uniq from 'ramda/src/uniq'

update.extend('$cacheUnique', (value, original = []) =>
  uniq([...original, value])
  .sort((a, b) => {
    if (a.includes('64p')) {
      return -1
    }
    if (a.includes('480p') && !b.includes('64p')) {
      return -1
    }
    if (a.includes('4k') && !b.includes('64p') && !b.includes('480p')) {
      return -1
    }
    return 0
  })
)

update.extend('$cacheProgress', (value, original = {}) => {
  if (!value || !Number.isInteger(original.progress)) {
    return { progress: 0 }
  }
  if (value < original.progress) {
    return original
  }
  return update(original, {
    progress: { $set: value },
  })
})

const initialState = {
  cached: {},
  buffer: {},
  progress: {},
  failed: {},
}

/**
 *
 */
export const cacheFetchProgress = (state, action) => update(state, {
  buffer: {
    [action.payload.signature.partial]: {
      $set: {
        progress: action.payload.progress,
        jobId: action.payload.jobId,
        path: action.payload.signature.path,
      },
    },
  },
  progress: {
    [action.payload.signature.pathFolder]: {
      $cacheProgress: action.payload.progress,
    },
  },
})

export const cacheFetchSuccess = (state, action) => update(state, {
  cached: {
    [action.payload.signature.pathFolder]: {
      $cacheUnique: action.payload.signature.path,
    },
  },
  buffer: {
    $unset: [action.payload.signature.partial],
  },
  progress: {
    $unset: [action.payload.signature.pathFolder],
  },
})

const cacheFetchFailure = (state, action) => update(state, {
  buffer: {
    $unset: [action.payload.signature.partial],
  },
  progress: {
    $unset: [action.payload.signature.pathFolder],
  },
  failed: {
    [action.payload.signature.pathFolder]: {
      $cacheUnique: action.payload.signature.path,
    },
  },
})

const cacheFetchIdle = (state, action) => update(state, {
  cached: {
    $unset: [action.payload.signature.pathFolder],
  },
  progress: {
    $unset: [action.payload.signature.pathFolder],
  },
})

export default handleActions({
  [constants.CACHE_FETCH_SUCCESS]: cacheFetchSuccess,
  [constants.CACHE_FETCH_FAILURE]: cacheFetchFailure,
  [constants.CACHE_FETCH_PROGRESS]: cacheFetchProgress,
  [constants.CACHE_FETCH_IDLE]: cacheFetchIdle,
}, initialState)
