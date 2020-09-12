import { graphqlOperation } from '@aws-amplify/api'
import { call, put, takeEvery, all, getContext, select, take, spawn, delay, race, retry } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import replace from 'ramda/src/replace'
import * as actions from 'store/ducks/posts/actions'
import * as queries from 'store/ducks/posts/queries'
import * as constants from 'store/ducks/posts/constants'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as subscriptionsConstants from 'store/ducks/subscriptions/constants'
import * as usersActions from 'store/ducks/users/actions'
import * as queryService from 'services/Query'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'
import RNFS from 'react-native-fs' 
import * as Logger from 'services/Logger'
import filePath from 'path'

function initPostsCreateUploadChannel({ image, uploadUrl, payload }) {
  const getName = (image) => {
    return compose(
      replace('.heic', ''),
      replace('.jpg', ''),
      toLower,
      filePath.basename,
    )(image)
  }

  const getFilename = (image) => {
    return compose(
      toLower,
      filePath.basename,
    )(image)
  }

  const getFilepath = (image) => {
    return image
  }

  const getFiletype = () => {
    if (toLower(payload.imageFormat) === 'heic') {
      return 'image/heic'
    }
    return 'image/jpeg'
  }

  const files = [{
    name: getName(image),
    filename: getFilename(image),
    filepath: getFilepath(image),
    filetype: getFiletype(image),
  }]

  const handleRequest = (emitter) => (response) => {
    const jobId = response.jobId
    emitter({ status: 'retry', progress: 0, jobId })
  }

  const handleProgress = (emitter) => (response) => {
    const jobId = response.jobId
    const progress = parseInt(response.totalBytesSent / response.totalBytesExpectedToSend * 100, 10)

    if (progress % 10 === 0) {
      const nextProgress = progress === 100 ? 99 : progress
      emitter({ status: 'progress', progress: nextProgress, jobId })
    }
  }

  const handleSuccess = (emitter) => (response) => {
    const jobId = response.jobId
    emitter({ status: 'success', progress: 99, jobId })
    emitter(END)
  }

  const handleFailure = (emitter) => () => {
    emitter({ status: 'failure', progress: 0 })
    emitter(END)
  }

  const initUpload = () => (begin, progress) =>
    RNFS.uploadFiles({
      binaryStreamOnly: true,
      toUrl: uploadUrl,
      files: files,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      begin,
      progress,
    })

  /**
   *
   */
  return eventChannel((emitter) => {
    const uploader = initUpload(emitter)(
      handleRequest(emitter),
      handleProgress(emitter),
    )

    const next = (response) => {
      if (response.statusCode === 200) {
        handleSuccess(emitter)(response)
      } else {
        handleFailure(emitter)(response)
      }
    }

    const fail = (error) => {
      handleFailure(emitter)(error)
    }

    uploader.promise
      .then(next)
      .catch(fail)

    return () => {
      RNFS.stopUpload(uploader.jobId)
    }
  })
}

function* handlePostsCreateRequest(payload) {
  const AwsAPI = yield getContext('AwsAPI')

  const data = yield (function* getPost() {
    try {
      const post = yield AwsAPI.graphql(graphqlOperation(queries.getPost, payload))
      if (!post.data.post) {
        throw new Error('Post must be created')
      }
      return post.data.post
    } catch (error) {
      const post = yield AwsAPI.graphql(graphqlOperation(queries.addPhotoPost, payload))
      return post.data.addPost
    }
  })()

  return {
    userId: data.postedBy.userId,
    imageUrl: data.imageUploadUrl,
    image: path(['images', 0])(payload),
  }
}

/**
 *
 */
function* handleTextOnlyPost(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const errorWrapper = yield getContext('errorWrapper')

  try {
    yield AwsAPI.graphql(graphqlOperation(queries.addTextOnlyPost, req.payload))
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
function* handlePostsCreateSuccess(post) {
  const userId = path(['postedBy', 'userId'], post)

  yield put(actions.postsCreateSuccess({ data: {}, payload: post, meta: {} }))
  yield put(actions.postsGetRequest({ userId }))
  yield put(actions.postsFeedGetRequest({ limit: 20 }))
  yield put(usersActions.usersImagePostsGetRequest({ userId }))
}

function* checkPostsCreateProcessing(processingPost) {
  const TIMEOUT_DELAY = 5000
  const errorWrapper = yield getContext('errorWrapper')

  function* checkRequest() {    
    const response = yield queryService.apiRequest(queries.getPost, processingPost)
    const post = path(['data', 'post'], response)
    const postStatus = path(['postStatus'], post)

    if (['PENDING', 'PROCESSING'].includes(postStatus)) {
      throw new Error('Post has not been processed')
    }

    if (['ERROR'].includes(postStatus)) {
      throw new Error('Post processed with an error')
    }

    return post
  }
 
  try {
    const { idle } = yield race({
      idle: take(constants.POSTS_CREATE_IDLE),
      finished: take([
        subscriptionsConstants.SUBSCRIPTIONS_POST_COMPLETED,
        subscriptionsConstants.SUBSCRIPTIONS_POST_ERROR,
      ]),
      timeout: delay(TIMEOUT_DELAY),
    })
  
    if (!idle) {
      const { post } = yield race({
        post: retry(3, TIMEOUT_DELAY, checkRequest),
        idle: take(constants.POSTS_CREATE_IDLE),
      })

      if (post) {
        yield call(handlePostsCreateSuccess, post)
      }
    } 
  } catch(error) {
    yield put(actions.postsCreateFailure({
      message: errorWrapper(error), 
      payload: processingPost, 
      meta: {},
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
      uploadUrl: data.imageUrl,
      image: data.image,
      payload: req.payload,
    })

    yield takeEvery(channel, function *(upload) {
      const meta = (nextProgress) => ({
        attempt: upload.attempt || req.payload.attempt,
        progress: nextProgress || parseInt(upload.progress, 10),
        error: upload.error,
        jobId: upload.jobId,
      })

      if (upload.status === 'progress') {
        yield put(actions.postsCreateProgress({ data: {}, payload: req.payload, meta: meta() }))
      }

      if (upload.status === 'success') {
        yield put(actions.postsCreateProgress({ data: {}, payload: req.payload, meta: meta(99) }))
        yield spawn(checkPostsCreateProcessing, req.payload)
      }

      if (upload.status === 'failure') {
        yield put(actions.postsCreateFailure({ data: {}, payload: req.payload, meta: meta(0) }))
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
  yield put(subscriptionsActions.subscriptionsMainRequest())
  yield put(subscriptionsActions.subscriptionsPollRequest())

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
function* postsCreateIdle(req) {
  const jobId = path(['payload', 'meta', 'jobId'])(req)

  if (jobId) {
    yield RNFS.stopUpload(jobId)
  }
}

/**
 * 
 */
function* postsCreateSchedulerRequest() {
  try {
    const data = yield select(state => state.posts.postsCreateQueue)
    
    const failedPosts = Object.values(data)
      .filter(post => path(['status'])(post) === 'failure')

    const loadingPosts = Object.values(data)
      .filter(post => path(['status'])(post) === 'loading')
      .filter(post => dayjs(dayjs()).diff(path(['payload', 'createdAt'])(post), 'minute') > 5)

    const idlePosts = Object.values(data)
      .filter(post => path(['status'])(post) === 'idle')

    const successPosts = Object.values(data)
      .filter(post => path(['status'])(post) === 'success')

    function* removePost(post) {
      yield put(actions.postsCreateIdle({
        payload: path(['payload'])(post),
      }))
      return post
    }

    function* createPost(post) {
      const postId = uuid()
      const mediaId = uuid()
      yield put(actions.postsCreateRequest({
        ...path(['payload'])(post),
        createdAt: dayjs().toJSON(),
        postId,
        mediaId,
      }))
      return post
    }

    function* recreatePost(post) {
      yield removePost(post)
      yield createPost(post)
    }

    /**
     * Cleanup
     */
    yield all(
      successPosts.map((post) => call(removePost, post)),
    )

    yield all(
      idlePosts.map((post) => call(removePost, post)),
    )

    /**
     * Retry
     */
    yield all(
      loadingPosts
      .map((post) => call(recreatePost, post)),
    )

    yield all(
      failedPosts
      .map((post) => call(recreatePost, post)),
    )
  } catch (error) {
    Logger.withScope(scope => {
      scope.setExtra('message', error.message)
      Logger.captureMessage('POSTS_CREATE_SCHEDULER_REQUEST')
    })
  }
}

export default () => [
  takeEvery(constants.POSTS_CREATE_REQUEST, postsCreateRequest),
  takeEvery(constants.POSTS_CREATE_IDLE, postsCreateIdle),
  takeEvery(constants.POSTS_CREATE_SCHEDULER_REQUEST, postsCreateSchedulerRequest),
]