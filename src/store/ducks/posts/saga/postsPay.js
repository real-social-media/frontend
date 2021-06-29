import { put, race, takeEvery, take } from 'redux-saga/effects'
import * as actions from 'store/ducks/posts/actions'
import * as constants from 'store/ducks/posts/constants'

function* postsPayRequest(req) {
  try {
    const { postId } = req.payload
    yield put(actions.postsReportPostViewsRequest({ postIds: [postId], viewType: 'FOCUS' }))

    const { postsReportPostViewsFailure } = yield race({
      postsReportPostViewsSuccess: take(constants.POSTS_REPORT_POST_VIEWS_SUCCESS),
      postsReportPostViewsFailure: take(constants.POSTS_REPORT_POST_VIEWS_FAILURE),
    })

    if (postsReportPostViewsFailure) {
      throw new Error('Pay request failure')
    }

    yield put(actions.postsSingleGetRequest({ postId }))
    yield put(actions.postsPaySuccess())
  } catch (error) {
    yield put(actions.postsPayFailure(error))
  }
}

export default () => [takeEvery(constants.POSTS_PAY_REQUEST, postsPayRequest)]
