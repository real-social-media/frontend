import { graphqlOperation } from '@aws-amplify/api'
import { call, put, takeEvery, takeLatest, getContext, delay, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import omit from 'ramda/src/omit'
import RNFetchBlob from 'rn-fetch-blob'
import * as actions from 'store/ducks/posts/actions'
import * as queries from 'store/ducks/posts/queries'
import * as constants from 'store/ducks/posts/constants'
import CameraRoll from '@react-native-community/cameraroll'
import Share from 'react-native-share'
import Marker from 'react-native-image-marker'
import promiseRetry from 'promise-retry'
import Icon from 'assets/images/icon.png'
import dayjs from 'dayjs'
import uuid from 'uuid/v4'

/**
 *
 */
function* postsStoriesGetRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getStories, req.payload))
    const selector = path(['data', 'getStories', 'items'])

    yield put(actions.postsStoriesGetSuccess({ data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.postsStoriesGetFailure({ message: error.message }))
  }
}

function* handlePostsShareRequest(payload) {
  function* handeImageWatermark(url, hasWatermark) {
    if (!hasWatermark) {
      return url
    }

    return yield Marker.markImage({
      src: url,
      markerSrc: Icon,
      position: 'bottomRight',
      scale: 1,
      markerScale: 0.5,
      quality: 100,
      saveFormat: 'jpg',
    })
  }
  
  function* handleInstagramShare(url, title) {
    const shareOptions = {
      url,
      type: 'image/jpeg',
      social: Share.Social.INSTAGRAM,
      title,
    }

    yield Share.shareSingle(shareOptions)
  }

  function* handleGlobalShare(url, title) {
    const shareOptions = {
      url,
      type: 'image/jpeg',
      title,
    }

    yield Share.open(shareOptions)
  }

  function* handleCameraRollSave(path) {
    yield CameraRoll.saveToCameraRoll(path)
    return yield CameraRoll.getPhotos({
      first: 1,
      assetType: 'All',
    })
  }

  const fetchConfig = { fileCache: true, appendExt: 'iga' }
  const res = yield RNFetchBlob.config(fetchConfig).fetch('GET', payload.photoUrl)
  const status = res.info().status

  if(status === 200) {
    const watermarked = yield handeImageWatermark(res.path(), payload.watermark)
    const photo = yield handleCameraRollSave(watermarked)

    if (payload.type === 'instagram') {
      const url = path(['edges', '0', 'node', 'image', 'uri'])(photo)
      yield handleInstagramShare(url, payload.title)
      res.flush()
    }

    if (payload.type === 'global') {
      const url = path(['edges', '0', 'node', 'image', 'uri'])(photo)
      yield handleGlobalShare(url, payload.title)
      res.flush()
    }
  } else {
    throw new Error('Can not proceed')
  }
}

/**
 *
 */
function* postsShareRequest(req) {
  try {
    yield handlePostsShareRequest(req.payload)
    yield put(actions.postsShareSuccess({ data: {}, meta: {} }))
  } catch (error) {
    yield put(actions.postsShareFailure({ message: error.message }))
  }
}

/**
 *
 */
function* postsGetRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getPosts, { ...req.payload, postStatus: 'COMPLETED' }))
    const dataSelector = path(['data', 'getPosts', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'getPosts']))

    yield put(actions.postsGetSuccess({ payload: req.payload, data: dataSelector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.postsGetFailure({ payload: req.payload, message: error.message }))
  }
}

function* postsGetMoreRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getPosts, { ...req.payload, postStatus: 'COMPLETED' }))
    const dataSelector = path(['data', 'getPosts', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'getPosts']))

    yield put(actions.postsGetMoreSuccess({ payload: req.payload, data: dataSelector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.postsGetMoreFailure({ payload: req.payload, message: error.message }))
  }
}

/**
 *
 */
function* postsFeedGetRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getFeed, req.payload))
    const dataSelector = path(['data', 'getFeed', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'getFeed']))

    yield put(actions.postsFeedGetSuccess({ data: dataSelector(data), payload: req.payload, meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.postsFeedGetFailure({ message: error.message, payload: req.payload, }))
  }
}

function* postsFeedGetMoreRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getFeed, req.payload))
    const dataSelector = path(['data', 'getFeed', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'getFeed']))

    yield put(actions.postsFeedGetMoreSuccess({ data: dataSelector(data), payload: req.payload, meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.postsFeedGetMoreFailure({ message: error.message, payload: req.payload, }))
  }
}

/**
 *
 */
function* postsGetArchivedRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getPosts, { ...req.payload, postStatus: 'ARCHIVED' }))
    const selector = path(['data', 'getPosts', 'items'])

    yield put(actions.postsGetArchivedSuccess({ data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.postsGetArchivedFailure({ message: error.message }))
  }
}

/**
 *
 */
function* postsEditRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.editPost, req.payload))
    const selector = path(['data', 'editPost'])

    yield put(actions.postsEditSuccess({ data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.postsEditFailure({ message: error.message }))
  }
}

/**
 *
 */
function* postsDeleteRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.deletePost, req.payload))
    const selector = path(['data', 'deletePost'])

    yield put(actions.postsDeleteSuccess({ data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.postsDeleteFailure({ message: error.message }))
  }
}

/**
 *
 */
function* postsArchiveRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.archivePost, req.payload))
    const selector = path(['data', 'archivePost'])

    yield put(actions.postsArchiveSuccess({ data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.postsArchiveFailure({ message: error.message }))
  }
}

/**
 *
 */
function* postsRestoreArchivedRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.restoreArchivedPost, req.payload))
    const selector = path(['data', 'restoreArchivedPost'])

    yield put(actions.postsRestoreArchivedSuccess({ data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.postsRestoreArchivedFailure({ message: error.message }))
  }
}

/**
 *
 */
function* postsFlagRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.flagPost, req.payload))
    const selector = path(['data', 'flagPost'])

    yield put(actions.postsFlagSuccess({ data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.postsFlagFailure({ message: error.message }))
  }
}

/**
 *
 */
function* postsSingleGetRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.getPost, req.payload))
    const selector = path(['data', 'getPost'])

    yield put(actions.postsSingleGetSuccess({ data: selector(data), meta: data }))
  } catch (error) {
    yield put(actions.postsSingleGetFailure({ message: error.message }))
  }
}

/**
 * 
 */
function initPostsCreateUploadChannel({ image, imageUrl }) {
  const imagePath = RNFetchBlob.wrap(image.replace('file://', ''))

  return eventChannel(emitter => {
    promiseRetry((retry, attempt) => {
      emitter({ status: 'retry', progress: 0, attempt })

      return RNFetchBlob
        .fetch('PUT', imageUrl, { 'Content-Type' : 'application/octet-stream' }, imagePath)
        .uploadProgress((written, total) => {
          emitter({ status: 'progress', progress: parseInt(written / total * 100, 10), attempt })
        })
        .catch(retry)
    }, { retries: 10 })
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
  
  const data = yield promiseRetry((retry, number) =>
    AwsAPI.graphql(graphqlOperation(queries.addPost, payload))
      .catch(retry)
  )

  const currentIndex = 0
  const selector = path(['data', 'addPost', 'mediaObjects', currentIndex, 'uploadUrl'])
  const imageSelector = path(['images', currentIndex])

  return {
    imageUrl: selector(data),
    image: imageSelector(payload),
  }
}

/**
 *
 */
function* postsCreateRequest(req) {
  try {
    const data = yield handlePostsCreateRequest(req.payload)

    const channel = yield call(initPostsCreateUploadChannel, {
      imageUrl: data.imageUrl,
      image: data.image,
    })

    try {
      yield takeEvery(channel, function *(upload) {
        const meta = {
          attempt: upload.attempt || req.payload.attempt,
          progress: parseInt(upload.progress, 10),
        }

        if (upload.status === 'progress') {
          yield put(actions.postsCreateProgress({ data: {}, payload: req.payload, meta }))
        }

        if (upload.status === 'success') {
          yield delay(3000)
          yield put(actions.postsCreateSuccess({ data: {}, payload: req.payload, meta }))
          yield delay(5000)
          yield put(actions.postsCreateIdle({ data: {}, payload: req.payload, meta }))
        }

        if (upload.status === 'failure') {
          yield put(actions.postsCreateFailure({ data: {}, payload: req.payload, meta }))
        }
      })
    } catch (error) {
    }
  } catch (error) {
    yield put(actions.postsCreateFailure({
      message: error.message,
      payload: req.payload,
    }))
  }
}

/**
 *
 */
function* postsCreateSchedulerRequest() {
  const data = yield select(state => state.posts.postsCreateQueue)
  
  const allFailedPosts = Object.values(data)
    .filter(post => path(['status'])(post) !== 'idle')
    .filter(post => dayjs(path(['payload', 'createdAt'])(post)).diff(dayjs(), 'minute') > 10)

  function* createPost(post) {
    const postId = uuid()
    const mediaId = uuid()
    yield put(actions.postsCreateRequest({
      ...post,
      postId,
      mediaId,
    }))
  }

  function* storePost(post) {
    const postId = uuid()
    const mediaId = uuid()
  }

  allFailedPosts
    .filter(post => path(['payload', 'attempt'])(post) < 10)
    .forEach(createPost)

  allFailedPosts
    .filter(post => path(['payload', 'attempt'])(post) >= 10)
    .forEach(storePost)
}

/**
 *
 */
function* postsOnymouslyLikeRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.onymouslyLikePost, req.payload))
    const selector = path(['data', 'onymouslyLikePost'])

    yield put(actions.postsOnymouslyLikeSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsOnymouslyLikeFailure({ message: error.message, payload: req.payload }))
  }
}

/**
 *
 */
function* postsAnonymouslyLikeRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.anonymouslyLikePost, req.payload))
    const selector = path(['data', 'anonymouslyLikePost'])

    yield put(actions.postsAnonymouslyLikeSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsAnonymouslyLikeFailure({ message: error.message, payload: req.payload }))
  }
}

/**
 *
 */
function* postsDislikeRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.dislikePost, req.payload))
    const selector = path(['data', 'dislikePost'])

    yield put(actions.postsDislikeSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsDislikeFailure({ message: error.message, payload: req.payload, }))
  }
}

/**
 *
 */
function* postsReportPostViewsRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.reportPostViews, req.payload))
    const selector = path(['data', 'reportPostViews'])

    yield put(actions.postsReportPostViewsSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsReportPostViewsFailure({ message: error.message, payload: req.payload }))
  }
}

/**
 *
 */
function* postsGetTrendingPostsRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.trendingPosts, req.payload))
    const selector = path(['data', 'trendingPosts', 'items'])

    yield put(actions.postsGetTrendingPostsSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsGetTrendingPostsFailure({ message: error.message, payload: req.payload }))
  }
}

function* postsGetTrendingPostsMoreRequest(req) {
  const AwsAPI = yield getContext('AwsAPI')

  try {
    const data = yield AwsAPI.graphql(graphqlOperation(queries.trendingPosts, req.payload))
    const selector = path(['data', 'trendingPosts', 'items'])

    yield put(actions.postsGetTrendingPostsMoreSuccess({ data: selector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.postsGetTrendingPostsMoreFailure({ message: error.message, payload: req.payload }))
  }
}

export default () => [
  takeLatest(constants.POSTS_GET_REQUEST, postsGetRequest),
  takeLatest(constants.POSTS_GET_MORE_REQUEST, postsGetMoreRequest),

  takeLatest(constants.POSTS_FEED_GET_REQUEST, postsFeedGetRequest),
  takeLatest(constants.POSTS_FEED_GET_MORE_REQUEST, postsFeedGetMoreRequest),

  takeLatest(constants.POSTS_GET_ARCHIVED_REQUEST, postsGetArchivedRequest),
  takeLatest(constants.POSTS_EDIT_REQUEST, postsEditRequest),
  takeLatest(constants.POSTS_DELETE_REQUEST, postsDeleteRequest),
  
  takeLatest(constants.POSTS_ARCHIVE_REQUEST, postsArchiveRequest),
  takeLatest(constants.POSTS_RESTORE_ARCHIVED_REQUEST, postsRestoreArchivedRequest),

  takeLatest(constants.POSTS_FLAG_REQUEST, postsFlagRequest),
  takeLatest(constants.POSTS_SINGLE_GET_REQUEST, postsSingleGetRequest),
  takeLatest(constants.POSTS_SHARE_REQUEST, postsShareRequest),
  takeLatest(constants.POSTS_STORIES_GET_REQUEST, postsStoriesGetRequest),

  takeEvery(constants.POSTS_CREATE_REQUEST, postsCreateRequest),
  takeEvery(constants.POSTS_CREATE_SCHEDULER_REQUEST, postsCreateSchedulerRequest),

  takeLatest(constants.POSTS_ONYMOUSLY_LIKE_REQUEST, postsOnymouslyLikeRequest),
  takeLatest(constants.POSTS_ANONYMOUSLY_LIKE_REQUEST, postsAnonymouslyLikeRequest),
  takeLatest(constants.POSTS_DISLIKE_REQUEST, postsDislikeRequest),
  takeLatest(constants.POSTS_REPORT_POST_VIEWS_REQUEST, postsReportPostViewsRequest),

  takeLatest(constants.POSTS_GET_TRENDING_POSTS_REQUEST, postsGetTrendingPostsRequest),
  takeLatest(constants.POSTS_GET_TRENDING_POSTS_MORE_REQUEST, postsGetTrendingPostsMoreRequest),
]