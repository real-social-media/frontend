import { put, takeLatest, call } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as actions from 'store/ducks/users/actions'
import * as queries from 'store/ducks/users/queries'
import * as constants from 'store/ducks/users/constants'
import * as queryService from 'services/Query'
import * as normalizer from 'normalizer/schemas'
import { entitiesMerge } from 'store/ducks/entities/saga'

/**
 *
 */
function* usersChangeAvatarData(req, api) {
  const dataSelector = path(['data', 'setUserDetails'])

  const data = dataSelector(api)
  const meta = req.meta
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)

  yield call(entitiesMerge, normalized)

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

/**
 *
 */
function* usersChangeAvatarRequest(req) {
  try {
    const photoPostId = req.payload.postId
    const data = yield call([queryService, 'apiRequest'], queries.setUserDetails, { photoPostId })

    yield usersChangeAvatarData(req, data)
    yield put(actions.usersChangeAvatarSuccess())
  } catch (error) {
    yield put(actions.usersChangeAvatarFailure(error))
  }
}

export default () => [
  takeLatest(constants.USERS_CHANGE_AVATAR_REQUEST, usersChangeAvatarRequest),
]

