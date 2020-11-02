import { range } from 'ramda'
import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import {
  groupActionsByType,
  packActions,
  postsReportPostViewsRequest,
} from 'store/ducks/posts/saga/postsReportPostViews'
import * as actions from 'store/ducks/posts/actions'
import * as queries from 'store/ducks/posts/queries'
import * as entitiesActions from 'store/ducks/entities/actions'
import { errorWrapper } from 'store/helpers'
import * as queryService from 'services/Query'

jest.mock('services/Query', () => ({ apiRequest: jest.fn() }))

const reportPostViews = [1, 2, 3]
const payload = { postIds: [1, 5], viewType: 'THUMBNAIL' }

queryService.apiRequest.mockResolvedValue({ data: { reportPostViews } })

describe('Post report post views', () => {
  describe('postsReportPostViewsRequest', () => {
    it('success', () => {
      return expectSaga(postsReportPostViewsRequest, actions.postsReportPostViewsRequest(payload))
        .provide([[getContext('errorWrapper'), errorWrapper]])

        .call([queryService, 'apiRequest'], queries.reportPostViews, payload)
        .not.put(
          entitiesActions.entitiesPostsMerge({
            data: {
              1: { commentsUnviewedCount: 0 },
              5: { commentsUnviewedCount: 0 },
            },
          }),
        )
        .put(actions.postsReportPostViewsSuccess({ data: reportPostViews, payload, meta: {} }))

        .silentRun()
    })

    it('optimistic unviewed count update', () => {
      const payload = { postIds: [1, 5], viewType: 'FOCUS' }
      
      return expectSaga(postsReportPostViewsRequest, actions.postsReportPostViewsRequest(payload))
        .provide([[getContext('errorWrapper'), errorWrapper]])

        .call([queryService, 'apiRequest'], queries.reportPostViews, payload)
        .put(
          entitiesActions.entitiesPostsMerge({
            data: {
              1: { commentsUnviewedCount: 0 },
              5: { commentsUnviewedCount: 0 },
            },
          }),
        )
        .put(actions.postsReportPostViewsSuccess({ data: reportPostViews, payload, meta: {} }))

        .silentRun()
    })

    it('error', () => {
      const error = new Error('Error')
      queryService.apiRequest.mockRejectedValueOnce(error)

      return expectSaga(postsReportPostViewsRequest, actions.postsReportPostViewsRequest(payload))
        .provide([[getContext('errorWrapper'), errorWrapper]])

        .call([queryService, 'apiRequest'], queries.reportPostViews, payload)
        .put(actions.postsReportPostViewsFailure({ message: error.message, payload }))

        .silentRun()
    })
  })

  describe('groupActionsByType', () => {
    it('empty array by default', () => {
      expect(groupActionsByType([])).toEqual([[], []])
    })

    it('no duplicates', () => {
      expect(
        groupActionsByType([
          actions.postsReportPostViewsRequest({ postIds: [1], viewType: 'THUMBNAIL' }),
          actions.postsReportPostViewsRequest({ postIds: [1], viewType: 'THUMBNAIL' }),
          actions.postsReportPostViewsRequest({ postIds: [2], viewType: 'FOCUS' }),
          actions.postsReportPostViewsRequest({ postIds: [2], viewType: 'FOCUS' }),
        ]),
      ).toEqual([[2], [1]])
    })

    it('grouped by type', () => {
      expect(
        groupActionsByType([
          actions.postsReportPostViewsRequest({ postIds: [1, 2, 3], viewType: 'THUMBNAIL' }),
          actions.postsReportPostViewsRequest({ postIds: [1, 4, 6], viewType: 'THUMBNAIL' }),
          actions.postsReportPostViewsRequest({ postIds: [1, 6, 5], viewType: 'FOCUS' }),
          actions.postsReportPostViewsRequest({ postIds: [2, 9, 2], viewType: 'FOCUS' }),
        ]),
      ).toEqual([
        [1, 6, 5, 2, 9],
        [1, 2, 3, 4, 6],
      ])
    })
  })

  it('packActions', () => {
    const postIds = range(0, 100)

    expect(packActions([postIds, postIds])).toEqual([
      { postIds: range(0, 50), viewType: 'FOCUS' },
      { postIds: range(50, 100), viewType: 'FOCUS' },
      { postIds: range(0, 50), viewType: 'THUMBNAIL' },
      { postIds: range(50, 100), viewType: 'THUMBNAIL' },
    ])
  })
})
