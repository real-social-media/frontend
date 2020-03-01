import { graphqlOperation } from '@aws-amplify/api'
import { call, put, takeEvery, takeLatest, getContext, delay, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import path from 'ramda/src/path'
import RNFetchBlob from 'rn-fetch-blob'
import * as actions from 'store/ducks/posts/actions'
import * as queries from 'store/ducks/posts/queries'
import * as constants from 'store/ducks/posts/constants'
import promiseRetry from 'promise-retry'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'
import RNFS from 'react-native-fs'

/**
 * 
 */
function initPostsCreateUploadChannel({ image, imageUrl }) {
  if (!image || !imageUrl) {
    return eventChannel(emitter => {
      emitter({ status: 'success', progress: 100 })

      return () => {
      }
    })
  }

  const imagePath = RNFetchBlob.wrap((image || '').replace('file://', ''))

  return eventChannel(emitter => {
    promiseRetry((retry, attempt) => {
      emitter({ status: 'retry', progress: 0, attempt })

      return RNFetchBlob
        .fetch('PUT', imageUrl, { 'Content-Type' : 'application/octet-stream' }, imagePath)
        .uploadProgress((written, total) => {
          emitter({ status: 'progress', progress: parseInt(written / total * 100, 10), attempt })
        })
        .catch((error) => {
          emitter({ status: 'progress', progress: 0, attempt })
          retry(error)
        })
    }, { retries: 5 })
    .then((resp) => {
      emitter({ status: 'success', progress: 100 })
    })
    .catch((error) => {
      emitter({ status: 'failure', progress: 0 })
    })

    return () => {
    }
  })
}

function* handlePostsCreateRequest(payload) {
  const AwsAPI = yield getContext('AwsAPI')

  const data = yield AwsAPI.graphql(graphqlOperation(queries.addPhotoPost, payload))

  const currentIndex = 0
  const selector = path(['data', 'addPost', 'imageUploadUrl'])
  const imageSelector = path(['images', currentIndex])

  return {
    imageUrl: selector(data),
    image: imageSelector(payload),
  }
}

/**
 *
 */
function* handleTextOnlyPost(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.addTextOnlyPost, req.payload))
    const meta = { attempt: 1, progress: 100 }

    yield put(actions.postsCreateSuccess({ data: {}, payload: req.payload, meta }))
    yield put(actions.postsFeedGetRequest({  }))
  } catch (error) {
    yield put(actions.postsCreateFailure({
      message: errorWrapper(error),
      payload: req.payload,
      meta: { attempt: 0, progress: 0 },
    }))
  }
}

/**
 *
 */
function* handleImagePost(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield handlePostsCreateRequest(req.payload)

    const channel = yield call(initPostsCreateUploadChannel, {
      imageUrl: data.imageUrl,
      image: data.image,
    })

    yield takeEvery(channel, function *(upload) {
      const meta = {
        attempt: upload.attempt || req.payload.attempt,
        progress: parseInt(upload.progress, 10),
      }

      if (upload.status === 'progress') {
        yield put(actions.postsCreateProgress({ data: {}, payload: req.payload, meta }))
      }

      if (upload.status === 'success') {
        yield delay(7000)
        yield put(actions.postsCreateSuccess({ data: {}, payload: req.payload, meta }))
        yield delay(10000)
        yield put(actions.postsFeedGetRequest({  }))
      }

      if (upload.status === 'failure') {
        yield put(actions.postsCreateFailure({ data: {}, payload: req.payload, meta }))
      }
    })
  } catch (error) {
    yield put(actions.postsCreateFailure({
      message: errorWrapper(error),
      payload: req.payload,
      meta: { attempt: 0, progress: 0 },
    }))
  }
}

/**
 * 
 */
function* postsCreateRequest(req) {
  if (req.payload.postType === 'TEXT_ONLY') {
    return yield handleTextOnlyPost(req)
  }

  if (req.payload.postType === 'IMAGE') {
    return yield handleImagePost(req)
  }
}


/**
 *
 */
function* postsCreateSchedulerRequest() {
  const data = yield select(state => state.posts.postsCreateQueue)
    
  const failedPosts = Object.values(data)
    .filter(post => path(['status'])(post) === 'failure')

  const idlePosts = Object.values(data)
    .filter(post => path(['status'])(post) === 'idle')

  const successPosts = Object.values(data)
    .filter(post => path(['status'])(post) === 'success')

  function createPost(post) {
    const postId = uuid()
    const mediaId = uuid()
    return put(actions.postsCreateRequest({
      ...path(['payload'])(post),
      postId,
      mediaId,
    }))
  }

  function removePost(post) {
    return put(actions.postsCreateIdle({
      payload: path(['payload'])(post),
    }))
  }

  function storePost(post) {
    return RNFS.copyFile(
      path(['payload', 'images', '0'])(post),
      `${RNFS.DocumentDirectory}/REAL/${path(['payload', 'mediaId'])(post)}.jpg`
    )
  }

  yield successPosts
    .map(removePost)

  yield idlePosts
    .map(removePost)

  yield failedPosts
    .filter(post => dayjs(dayjs()).diff(path(['payload', 'createdAt'])(post), 'minute') > 10)
    .filter(post => path(['payload', 'attempt'])(post) < 5)
    .map(createPost)

  yield failedPosts
    .filter(post => dayjs(dayjs()).diff(path(['payload', 'createdAt'])(post), 'minute') > 10)
    .filter(post => path(['payload', 'attempt'])(post) >= 5)
    .map(storePost)
}

export default () => [
  takeEvery(constants.POSTS_CREATE_REQUEST, postsCreateRequest),
  takeEvery(constants.POSTS_CREATE_SCHEDULER_REQUEST, postsCreateSchedulerRequest),
]