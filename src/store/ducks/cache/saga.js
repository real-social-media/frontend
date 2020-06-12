import { takeEvery, call, put, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as actions from 'store/ducks/cache/actions'
import * as constants from 'store/ducks/cache/constants'
import * as service from 'store/ducks/cache/service'
import path from 'ramda/src/path'
import * as Logger from 'services/Logger'
import update from 'immutability-helper'

/**
 * 
 */
const progressCallback = (signature, emitter) => (data) => emitter({
  type: 'PROGRESS',
  payload: {
    signature,
    jobId: path(['jobId'])(data),
    progress: parseInt(data.bytesWritten / data.contentLength * 100, 10),
  },
})

const requestCallback = (signature, emitter) => (data) => emitter({
  type: 'REQUEST',
  payload: {
    signature,
    jobId: path(['jobId'])(data),
    progress: 0,
  },
})

const successCallback = (signature, emitter) => (data) => emitter({
  type: 'SUCCESS',
  payload: {
    signature,
    jobId: path(['jobId'])(data),
    progress: 100,
  },
})

const failureCallback = (signature, emitter) => (data) => emitter({
  type: 'FAILURE',
  payload: {
    signature,
    jobId: path(['jobId'])(data),
    error: path(['error'])(data),
    progress: 0,
  },
})

/**
 * 
 */
function cacheFetchRequestChannel({ signature, priorityQueueInstance }) {
  return eventChannel(emitter => {
    service.priorotizedRemoteImageFetch({
      signature,
      queueInstance: priorityQueueInstance,
      progressCallback: progressCallback(signature, emitter),
      requestCallback: requestCallback(signature, emitter),
      successCallback: successCallback(signature, emitter),
      failureCallback: failureCallback(signature, emitter),
    })

    /**
     * TODO: unsubscribe and stop remote image
     */
    return () => {}
  })
}

/**
 * 
 */
function* cacheFetchRequest(req) {
  if (!path(['payload', 'signature', 'path'])(req)) {
    return
  }

  /**
   * 
   */
  if (yield service.checkLocalImage(req.payload.signature.path)) {
    yield put(actions.cacheFetchSuccess({
      signature: req.payload.signature,
      jobId: undefined,
      progress: 100,
    }))
    return
  }

  // const nextBuffer = yield select(state => state.cache.buffer[req.payload.signature.partial])
  // if (nextBuffer) {
  //   return
  // }

  /**
   * 
   */
  const channel = yield call(cacheFetchRequestChannel, {
    signature: req.payload.signature,
    priority: req.payload.priority,
    priorityQueueInstance: req.payload.priorityQueueInstance,
  })

  function* channelListener(eventData) {
    if (eventData.type === 'PROGRESS') {
      yield put(actions.cacheFetchProgress(eventData.payload))
    }
    if (eventData.type === 'REQUEST') {
      yield put(actions.cacheFetchProgress(eventData.payload))
    }
    if (eventData.type === 'SUCCESS') {
      yield put(actions.cacheFetchSuccess(eventData.payload))
    }
    if (eventData.type === 'FAILURE') {
      yield put(actions.cacheFetchFailure(eventData.payload))
    }
  }

  yield takeEvery(channel, channelListener)
}

function* cacheFetchIdle(req) {
  try {
    yield service.removeLocalFolder(req.payload.signature.pathFolder)
  } catch (error) {
    // handler
  }
}

function* cacheFetchFailure(req) {
  try {
    yield service.removeLocalFolder(req.payload.signature.pathFolder)
  } catch (error) {
    // handler
  }
}

export default () => [
  takeEvery(constants.CACHE_FETCH_REQUEST, cacheFetchRequest),
  takeEvery(constants.CACHE_FETCH_FAILURE, cacheFetchFailure),
  takeEvery(constants.CACHE_FETCH_IDLE, cacheFetchIdle),
]