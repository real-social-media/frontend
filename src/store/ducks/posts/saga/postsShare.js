import { Image } from 'react-native'
import { put, takeLatest, getContext } from 'redux-saga/effects'
import path from 'ramda/src/path'
import RNFetchBlob from 'rn-fetch-blob'
import * as actions from 'store/ducks/posts/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import * as constants from 'store/ducks/posts/constants'
import CameraRoll from '@react-native-community/cameraroll'
import Share from 'react-native-share'
import Marker from 'react-native-image-marker'

function* handlePostsShareRequest(payload) {
  function* handeImageWatermark(url, hasWatermark, post) {
    if (!hasWatermark) {
      return url
    }

    const getSize = new Promise((resolve, reject) =>
      Image.getSize(url, (width, height) => resolve({ width, height }), reject),
    )
    const size = yield getSize

    const fontSizeFirstLine = size.height / 30
    const fontSizeSecondLine = size.height / 60

    const firstLine = yield Marker.markText({
      src: url,
      text: 'REAL',
      color: '#ffffff',
      fontName: 'AppleSDGothicNeo-Bold',
      fontSize: fontSizeFirstLine,
      X: 30,
      Y: size.height - fontSizeFirstLine * 2,
      scale: 1,
      quality: 100,
    })

    const secondLine = yield Marker.markText({
      src: firstLine,
      text: `${post.postedBy.username}`,
      color: '#ffffff',
      fontName: 'AppleSDGothicNeo-Bold',
      fontSize: fontSizeSecondLine,
      X: 35,
      Y: size.height - fontSizeFirstLine * 2 + fontSizeFirstLine,
      scale: 1,
      quality: 100,
    })

    return secondLine
  }

  function* handleInstagramPostShare({ url, title }) {
    const base64 = yield RNFetchBlob.fs.readFile(url, 'base64')
    const nextUrl = `data:image/jpg;base64,${base64}`
    const shareOptions = {
      url: nextUrl,
      type: 'image/jpeg',
      social: Share.Social.INSTAGRAM,
      title,
    }

    yield Share.shareSingle(shareOptions)
  }

  function* handleInstagramStoryShare({ url, title }) {
    const base64 = yield RNFetchBlob.fs.readFile(url, 'base64')
    const nextUrl = `data:image/jpg;base64,${base64}`
    const shareOptions = {
      url: nextUrl,
      type: 'image/jpeg',
      social: Share.Social.INSTAGRAM,
      title,
    }

    yield Share.shareSingle(shareOptions)
  }

  function* handleFacebookShare({ url, title }) {
    const shareOptions = {
      url,
      type: 'image/jpeg',
      social: Share.Social.FACEBOOK,
      title,
    }

    yield Share.shareSingle(shareOptions)
  }

  function* handleNativeShare({ url, title }) {
    const shareOptions = {
      url,
      type: 'image/jpeg',
      title,
    }

    yield Share.open(shareOptions)
  }

  function* handleRepost({ url }) {
    return yield put(
      cameraActions.cameraCaptureRequest([
        {
          uri: url,
          takenInReal: false,
          originalFormat: url.split('.').pop(),
        },
      ]),
    )
  }

  function* handleCameraRollSave(photoUri) {
    yield CameraRoll.saveToCameraRoll(photoUri)
    const photo = yield CameraRoll.getPhotos({
      first: 1,
      assetType: 'All',
    })
    return path(['edges', '0', 'node', 'image', 'uri'])(photo)
  }

  const res = yield (function* () {
    if (!payload.photoUrl.includes('http')) {
      return payload.photoUrl
    }

    const fetchConfig = { fileCache: true, appendExt: 'iga' }
    const response = yield RNFetchBlob.config(fetchConfig).fetch('GET', payload.photoUrl)
    const status = response.info().status
    if (status !== 200) {
      throw new Error('error occured')
    }
    return response.path()
  })()

  if (payload.type === 'cameraroll') {
    const watermarked = yield handeImageWatermark(res, payload.watermark, payload.post)
    yield handleCameraRollSave(watermarked)
  }

  if (payload.type === 'instagramPost') {
    const watermarked = yield handeImageWatermark(res, payload.watermark, payload.post)
    yield handleInstagramPostShare({ url: watermarked, title: payload.title })
  }

  if (payload.type === 'instagramStory') {
    const watermarked = yield handeImageWatermark(res, payload.watermark, payload.post)
    yield handleInstagramStoryShare({ url: watermarked, title: payload.title })
  }

  if (payload.type === 'facebook') {
    const watermarked = yield handeImageWatermark(res, payload.watermark, payload.post)
    yield handleFacebookShare({ url: watermarked, title: payload.title })
  }

  if (payload.type === 'global') {
    const watermarked = yield handeImageWatermark(res, payload.watermark, payload.post)
    yield handleNativeShare({ url: watermarked, title: payload.title })
  }

  if (payload.type === 'repost') {
    yield handleRepost({ url: res, title: payload.title, post: payload.post })
  }
}

/**
 *
 */
function* postsShareRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    yield handlePostsShareRequest(req.payload)
    yield put(actions.postsShareSuccess({ data: {}, meta: {} }))
  } catch (error) {
    yield put(actions.postsShareFailure({ message: errorWrapper(error) }))
  }
}

export default () => [takeLatest(constants.POSTS_SHARE_REQUEST, postsShareRequest)]
