import { expectSaga } from 'redux-saga-test-plan'
import * as authActions from 'store/ducks/auth/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import authPrefetch from 'store/ducks/auth/saga/authPrefetch'
import { testAsRootSaga } from 'tests/utils/helpers'

describe('Auth prefetch', () => {
  describe('guest', () => {
    it('success', async () => {
      await expectSaga(testAsRootSaga(authPrefetch))
        .withState({
          auth: { authToken: { meta: { type: 'COGNITO_GUEST' } } },
        })

        .put(postsActions.postsFeedGetRequest({ limit: 20 }))
        .put(usersActions.usersGetCardsRequest({}))
        .put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))
        .put(
          authActions.authPrefetchSuccess({
            message: { code: 'GENERIC', text: 'Auth prefetch is completed', nativeError: '' },
          }),
        )

        .dispatch(authActions.authPrefetchRequest())
        .dispatch(postsActions.postsFeedGetSuccess())
        .dispatch(usersActions.usersGetCardsSuccess())
        .silentRun()
    })
  })
})
