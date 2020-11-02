import { expectSaga } from 'redux-saga-test-plan'
import * as usersActions from 'store/ducks/users/actions'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as queries from 'store/ducks/users/queries'
import users from 'store/ducks/users/saga'
import { testAsRootSaga } from 'tests/utils/helpers'
import * as queryService from 'services/Query'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

describe('Users saga', () => {
  describe('usersChangeAvatarRequest', () => {
    const postId = 1

    it('success', async () => {
      queryService.apiRequest.mockResolvedValueOnce({ data: { setUserDetails: { userId: 1 } } })

      await expectSaga(testAsRootSaga(users))
        .call([queryService, 'apiRequest'], queries.setUserDetails, { photoPostId: postId })
        .put(usersActions.usersChangeAvatarSuccess())
        .put(entitiesActions.entitiesUsersMerge({ data: { 1: { userId: 1 } } }))

        .dispatch(usersActions.usersChangeAvatarRequest({ postId }))
        .silentRun()
    })

    it('fail', async () => {
      const error = new Error('Error')
      queryService.apiRequest.mockRejectedValueOnce(error)

      await expectSaga(testAsRootSaga(users))
        .call([queryService, 'apiRequest'], queries.setUserDetails, { photoPostId: postId })
        .put(usersActions.usersChangeAvatarFailure(error))

        .dispatch(usersActions.usersChangeAvatarRequest({ postId: 1 }))
        .silentRun()
    })
  })
})
