import { all, put, fork, take, flush, getContext, actionChannel, delay } from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import path from 'ramda/src/path'
import uniq from 'ramda/src/uniq'
import splitEvery from 'ramda/src/splitEvery'
import * as actions from 'store/ducks/posts/actions'
import * as queries from 'store/ducks/posts/queries'
import * as constants from 'store/ducks/posts/constants'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as queryService from 'services/Query'

function* handlePostsReportPostViewsRequest(payload) {
  const data = payload.postIds.reduce((acc, item) => {
    acc[item] = { commentsUnviewedCount: 0 }
    return acc
  }, {})

  yield put(entitiesActions.entitiesPostsMerge({ data }))
}

function* postsReportPostViewsRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.reportPostViews, req.payload)
    const selector = path(['data', 'reportPostViews'])
    const meta = {}

    yield handlePostsReportPostViewsRequest(req.payload)
    yield put(actions.postsReportPostViewsSuccess({ data: selector(data), payload: req.payload, meta }))
  } catch (error) {
    yield put(actions.postsReportPostViewsFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 * handle throttling and caching for postsReportPostViews
 * used to minimize network requests and send them as batch instead
 */
function* watchPostsReportPostViewsRequest() {
  const channel = yield actionChannel(constants.POSTS_REPORT_POST_VIEWS_REQUEST, buffers.expanding(20))

  while (true) {
    /**
     * get first received action, wait for 10secs while accumulating other actions
     */
    const firstAction = yield take(channel)
    yield delay(10000)
    const accumedActions = yield flush(channel)

    /**
     * concat actions array to pass into postsReportPostViewsRequest as a batch
     */
    const list = accumedActions.reduce((acc, item) => {
      acc.payload.postIds = uniq(acc.payload.postIds.concat(item.payload.postIds))
      return acc
    }, firstAction)

    const split = splitEvery(50, list.payload.postIds).map(postIds => ({
      ...firstAction,
      payload: {
        postIds,
      },
    }))

    /**
     * report views in parallel without blocking the thread
     */
    yield all(split.map(payload => fork(postsReportPostViewsRequest, payload)))
  }
}

export default () => [
  fork(watchPostsReportPostViewsRequest),
]