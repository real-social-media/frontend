import { expectSaga } from 'redux-saga-test-plan'
import authGetUser from 'store/ducks/auth/saga/authGetUser'
import * as authActions from 'store/ducks/auth/actions'
import * as queryService from 'services/Query'
import * as queries from 'store/ducks/users/queries'
import { testAsRootSaga } from 'tests/utils/helpers'
import * as normalizer from 'normalizer/schemas'
import { entitiesMerge } from 'store/ducks/entities/saga'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

const action = authActions.authGetUserRequest()

describe('authGetUser', () => {
  afterEach(() => {
    queryService.apiRequest.mockClear()
  })

  it('success', async () => {
    const self = { userId: '1', b: 2 }
    const response = { data: { self } }

    queryService.apiRequest.mockResolvedValueOnce(response)

    await expectSaga(testAsRootSaga(authGetUser))
      .put(authActions.authGetUserSuccess({ data: '1' }))
      .call(entitiesMerge, normalizer.normalizeUserGet(self))

      .dispatch(action)
      .silentRun()

    expect(queryService.apiRequest).toHaveBeenCalledWith(queries.self)
  })

  it('catch an error', async () => {
    const error = new Error('Fetch Error')

    queryService.apiRequest.mockRejectedValueOnce(error)

    await expectSaga(testAsRootSaga(authGetUser))
      .put(authActions.authGetUserFailure(error))

      .dispatch(action)
      .silentRun()
  })
})
