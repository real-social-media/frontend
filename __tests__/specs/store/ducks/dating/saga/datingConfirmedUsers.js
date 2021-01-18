import { expectSaga } from 'redux-saga-test-plan'
import { testEntitiesMerge, testAsRootSaga } from 'tests/utils/helpers'
import datingConfirmedUsers from 'store/ducks/dating/saga/datingConfirmedUsers'
import * as queries from 'store/ducks/dating/queries'
import * as datingActions from 'store/ducks/dating/actions'
import * as queryService from 'services/Query'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

const saga = () => expectSaga(testAsRootSaga(datingConfirmedUsers))

describe('datingConfirmedUsersRequest', () => {
  afterEach(() => {
    queryService.apiRequest.mockClear()
  })

  it('success', async () => {
    const payload = { userId: 'id123' }
    const response = { data: { self: { matchedUsers: { items: [{ userId: 1 }] } } } }
    const entities = { users: { 1: { userId: 1 } } }

    queryService.apiRequest.mockResolvedValueOnce(response)

    await testEntitiesMerge(saga(), entities)
      .put(datingActions.datingConfirmedUsersSuccess({ data: [1], payload, meta: {} }))

      .dispatch(datingActions.datingConfirmedUsersRequest(payload))
      .silentRun()

    expect(queryService.apiRequest).toHaveBeenCalledWith(queries.matchedUsers, payload)
  })
})
