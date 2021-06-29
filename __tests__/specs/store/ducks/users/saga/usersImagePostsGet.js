import { expectSaga } from 'redux-saga-test-plan'
import users from 'store/ducks/users/saga'
import * as usersActions from 'store/ducks/users/actions'
import * as queryService from 'services/Query'
import * as queries from 'store/ducks/users/queries'
import { entitiesMerge } from 'store/ducks/entities/saga'
import {  testAsRootSaga } from 'tests/utils/helpers'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

const payload = { userId: '1' }
const action = usersActions.usersImagePostsGetRequest(payload)

describe('usersImagePostsGetRequest', () => {
  afterEach(() => {
    queryService.apiRequest.mockClear()
  })

  it('success', async () => {
    const response = { data: { user: { posts: { items: [{ postId: 1 }, { postId: 2 }] } } } }
    const entities = { posts: { 1: { postId: 1 }, 2: { postId: 2 } } }

    queryService.apiRequest.mockResolvedValueOnce(response)

    await expectSaga(testAsRootSaga(users))
      .call(entitiesMerge, { entities, result: [1, 2] })
      .put(usersActions.usersImagePostsGetSuccess({ data: [1, 2] }))

      .dispatch(action)
      .silentRun()

    expect(queryService.apiRequest).toHaveBeenCalledWith(queries.getImagePosts, payload)
  })

  it('catch an error', async () => {
    const error = new Error('Fetch Error')

    queryService.apiRequest.mockRejectedValueOnce(error)

    await expectSaga(testAsRootSaga(users))
      .put(usersActions.usersImagePostsGetFailure(error))

      .dispatch(action)
      .silentRun()
  })
})
