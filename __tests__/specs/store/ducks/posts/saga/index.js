import * as postsSagas from 'store/ducks/posts/saga'
import * as postsActions from 'store/ducks/posts/actions'
import { testSaga } from 'redux-saga-test-plan'

const errorWrapper = (err) => err.message

describe('Posts sagas', () => {
  describe('Get trending posts', () => {
    const action = postsActions.postsGetTrendingPostsRequest({ limit: 100 })
    const data = { data: { trendingPosts: { items: [], nextToken: null } } }
    const next = { data: data.data.trendingPosts.items, payload: action.payload, meta: {} }

    it('successfully fetch trending posts', () => {
      testSaga(postsSagas.postsGetTrendingPostsRequest, action)
        .next()
        .getContext('errorWrapper')

        .next(errorWrapper)
        .call(postsSagas.handlePostsGetTrendingPostsRequest, action.payload)

        .next(data)
        .call(postsSagas.postsGetTrendingPostsRequestData, action, data)

        .next(next)
        .put(postsActions.postsGetTrendingPostsSuccess(next))

        .next()
        .isDone()
    })

    it('catch an error', () => {
      const message = 'Error Message'

      testSaga(postsSagas.postsGetTrendingPostsRequest, action)
        .next()
        .getContext('errorWrapper')

        .next(errorWrapper)
        .throw(new Error(message))
        .put(postsActions.postsGetTrendingPostsFailure({ message, payload: action.payload }))

        .next()
        .isDone()
    })
  })
})
