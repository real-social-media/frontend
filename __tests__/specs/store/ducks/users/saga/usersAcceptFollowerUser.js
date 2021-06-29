import * as normalizer from 'normalizer/schemas'
import { expectSaga } from 'redux-saga-test-plan'
import users from 'store/ducks/users/saga'
import * as usersActions from 'store/ducks/users/actions'
import * as queryService from 'services/Query'
import * as queries from 'store/ducks/users/queries'
import {  testAsRootSaga } from 'tests/utils/helpers'
import { entitiesMerge } from 'store/ducks/entities/saga'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))
const payload = { userId: 2 }
const action = usersActions.usersAcceptFollowerUserRequest(payload)

describe('usersAcceptFollowerUser', () => {
  afterEach(() => {
    queryService.apiRequest.mockClear()
  })

  it('success', async () => {
    const acceptFollowerUser = { userId: 1, b: 2 }
    const response = { data: { acceptFollowerUser } }

    queryService.apiRequest.mockResolvedValueOnce(response)

    await expectSaga(testAsRootSaga(users))
    .call(entitiesMerge, normalizer.normalizeUserGet(acceptFollowerUser))
      .put(usersActions.usersAcceptFollowerUserSuccess({ data: 1, payload, meta: {} }))

      .dispatch(action)
      .silentRun()

    expect(queryService.apiRequest).toHaveBeenCalledWith(queries.acceptFollowerUser, payload)
  })

  it('catch an error', async () => {
    const error = new Error('Fetch Error')

    queryService.apiRequest.mockRejectedValueOnce(error)

    await expectSaga(testAsRootSaga(users))
      .put(usersActions.usersAcceptFollowerUserFailure(error, payload))

      .dispatch(action)
      .silentRun()
  })
})
