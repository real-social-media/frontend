import { put, race, takeLatest, take, select } from 'redux-saga/effects'
import * as usersActions from 'store/ducks/users/actions'
import * as constants from 'store/ducks/users/constants'
import * as postsConstants from 'store/ducks/posts/constants'
import * as postsActions from 'store/ducks/posts/actions'
import * as authSelector from 'store/ducks/auth/selectors'

/**
 *
 */
function* usersCreateAvatarRequest(req) {
  try {
    yield put(postsActions.postsCreateRequest(req.payload, { avatar: true }))

    const postsCreate = yield race({
      success: take(postsConstants.POSTS_CREATE_SUCCESS),
      failure: take(postsConstants.POSTS_CREATE_FAILURE),
    })

    if (postsCreate.failure) {
      throw new Error('Failed to create post')
    }

    yield put(usersActions.usersChangeAvatarRequest({ postId: postsCreate.success.payload.payload.postId }))

    const usersChangeAvatar = yield race({
      success: take(constants.USERS_CHANGE_AVATAR_SUCCESS),
      failure: take(constants.USERS_CHANGE_AVATAR_FAILURE),
    })

    if (usersChangeAvatar.failure) {
      throw new Error('Failed to change avatar')
    }

    yield put(usersActions.usersCreateAvatarSuccess())
  } catch (error) {
    yield put(usersActions.usersCreateAvatarFailure(error))
  }
}

function* usersCreateAvatarSuccess() {
  const userId = yield select(authSelector.authUserId)

  yield put(postsActions.postsGetRequest({ userId }))
  yield put(usersActions.usersImagePostsGetRequest({ userId, isVerified: true }))
  yield put(postsActions.postsFeedGetRequest({ limit: 20 }))
}

export default () => [
  takeLatest(constants.USERS_CREATE_AVATAR_REQUEST, usersCreateAvatarRequest),
  takeLatest(constants.USERS_CREATE_AVATAR_SUCCESS, usersCreateAvatarSuccess),
]
