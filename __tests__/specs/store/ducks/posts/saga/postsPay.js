import { expectSaga } from 'redux-saga-test-plan'
import * as actions from 'store/ducks/posts/actions'
import postsPay from 'store/ducks/posts/saga/postsPay'
import { testAsRootSaga } from 'tests/utils/helpers'

/**
 * Mock Data
 */
const postId = '345'

describe('postsPay', () => {
  it('success', async () => {
    await expectSaga(testAsRootSaga(postsPay))
      .put(actions.postsReportPostViewsRequest({ postIds: [postId], viewType: 'FOCUS' }))
      .put(actions.postsSingleGetRequest({ postId }))
      .put(actions.postsPaySuccess())

      .dispatch(actions.postsPayRequest({ postId }))
      .dispatch(actions.postsReportPostViewsSuccess())
      .silentRun()
  })

  it('failure', async () => {
    await expectSaga(testAsRootSaga(postsPay))
      .put(actions.postsReportPostViewsRequest({ postIds: [postId], viewType: 'FOCUS' }))
      .put(actions.postsPayFailure(new Error('Pay request failure')))
      .not.put(actions.postsSingleGetRequest({ postId }))
      .not.put(actions.postsPaySuccess())

      .dispatch(actions.postsPayRequest({ postId }))
      .dispatch(actions.postsReportPostViewsFailure())
      .silentRun()
  })
})
