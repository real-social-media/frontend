import { expectSaga } from 'redux-saga-test-plan'
import { testAsRootSaga } from 'tests/utils/helpers'
import datingMatchedUsers from 'store/ducks/dating/saga/datingMatchedUsers'
import * as queries from 'store/ducks/dating/queries'
import * as datingActions from 'store/ducks/dating/actions'
import * as queryService from 'services/Query'
import { entitiesMerge } from 'store/ducks/entities/saga'
import * as normalizer from 'normalizer/schemas'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

const saga = () => expectSaga(testAsRootSaga(datingMatchedUsers))

describe('datingMatchedUsers', () => {
  afterEach(() => {
    queryService.apiRequest.mockClear()
  })

  it('success', async () => {
    const payload = { userId: 'id123' }
    const response = { data: { self: { matchedUsers: { items: [{ userId: 1 }] } } } }

    queryService.apiRequest.mockResolvedValueOnce(response)

    await saga()
      .call(entitiesMerge, normalizer.normalizeUsersGet(response.data.self.matchedUsers.items))
      .put(datingActions.datingMatchedUsersSuccess({ data: [1], payload, meta: {} }))

      .dispatch(datingActions.datingMatchedUsersRequest(payload))
      .silentRun()

    expect(queryService.apiRequest).toHaveBeenCalledWith(queries.matchedUsers, payload)
  })
})
