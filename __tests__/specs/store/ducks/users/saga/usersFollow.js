import * as normalizer from 'normalizer/schemas'
import { expectSaga } from 'redux-saga-test-plan'
import users from 'store/ducks/users/saga'
import * as usersActions from 'store/ducks/users/actions'
import * as queryService from 'services/Query'
import * as queries from 'store/ducks/users/queries'
import { testAsRootSaga, makeAuthorizedState } from 'tests/utils/helpers'
import { entitiesMerge } from 'store/ducks/entities/saga'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))
const payload = { userId: 2 }
const action = usersActions.usersFollowRequest(payload)
const authUser = { userId: 1, userStatus: 'ACTIVE' }

describe('usersFollow', () => {
  afterEach(() => {
    queryService.apiRequest.mockClear()
  })

  it('success', async () => {
    const followUser = { userId: 1, b: 2 }
    const response = { data: { followUser } }

    queryService.apiRequest.mockResolvedValueOnce(response)

    await expectSaga(testAsRootSaga(users))
      .withState(makeAuthorizedState(authUser))
      .call(entitiesMerge, normalizer.normalizeUserGet(followUser))
      .put(usersActions.usersFollowSuccess({ data: 1, payload, meta: {} }))

      .dispatch(action)
      .silentRun()

    expect(queryService.apiRequest).toHaveBeenCalledWith(queries.followUser, payload)
  })

  it('catch an error', async () => {
    const error = new Error('Fetch Error')

    queryService.apiRequest.mockRejectedValueOnce(error)

    await expectSaga(testAsRootSaga(users))
      .withState(makeAuthorizedState(authUser))
      .put(usersActions.usersFollowFailure(error, payload))

      .dispatch(action)
      .silentRun()
  })
})
