import { expectSaga } from 'redux-saga-test-plan'
import { call, getContext } from 'redux-saga/effects'
import * as sagas from 'store/ducks/posts/saga/postsCreate'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as queries from 'store/ducks/posts/queries'
import * as actions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import { errorWrapper } from 'store/helpers'
import * as queryService from 'services/Query'

const TIMEOUT_DELAY = 5000
const processingPost = { postId: 1 }
const userId = 2
const getPost = call([queryService, 'apiRequest'], queries.getPost, processingPost)
const post = { postId: processingPost.postId, postStatus: 'COMPLETED', postedBy: { userId } }
const postWithError = { postId: processingPost.postId, postStatus: 'ERROR', postedBy: { userId } }

const failureCases = ['ERROR', 'ARCHIVED', 'DELETING'].map((postStatus) => {
  const post = { ...postWithError, postStatus }

  return {
    post,
    failureAction: actions.postsCreateFailure({
      message: 'Post shouldn`t have ERROR, ARCHIVED or DELETING status',
      payload: post,
      meta: {},
    }),
  }
})

describe('Create post saga', () => {
  describe('checkPostsCreateProcessing', () => {
    describe('Completed post', () => {
      const checkSuccess = (saga) => {
        return saga
          .put(actions.postsCreateSuccess({ data: {}, payload: post, meta: {} }))
          .put(actions.postsGetRequest({ userId }))
          .put(usersActions.usersImagePostsGetRequest({ userId }))
          .put(actions.postsFeedGetRequest({ limit: 20 }))
      }

      it('handle POST_COMPLETED event', async () => {
        const saga = expectSaga(sagas.checkPostsCreateProcessing, processingPost)
          .provide([[getPost, { data: { post } }]])
          .dispatch(subscriptionsActions.subscriptionsPostCompleted(post))

        await checkSuccess(saga).run()
      })

      it('handle timeout and check post status manually', async () => {
        const saga = expectSaga(sagas.checkPostsCreateProcessing, processingPost)
          .provide([[getPost, { data: { post } }]])
          .delay(TIMEOUT_DELAY + 100)

        await checkSuccess(saga).run(false)
      }, 6000)
    })

    describe('Post with an error', () => {
      it('handle POST_ERROR event', async () => {
        const tests = failureCases.map(({ post, failureAction }) => {
          return expectSaga(sagas.checkPostsCreateProcessing, processingPost)
            .provide([
              [getPost, { data: { post } }],
              [getContext('errorWrapper'), errorWrapper],
            ])
            .dispatch(subscriptionsActions.subscriptionsPostError(postWithError))
            .put(failureAction)
            .run()
        })

        await Promise.all(tests)
      })

      it('handle timeout and check post status manually', async () => {
        const tests = failureCases.map(({ post, failureAction }) => {
          return expectSaga(sagas.checkPostsCreateProcessing, processingPost)
            .provide([
              [getPost, { data: { post } }],
              [getContext('errorWrapper'), errorWrapper],
            ])
            .delay(TIMEOUT_DELAY + 1)
            .put(failureAction)
            .run(false)
        })

        await Promise.all(tests)
      }, 6000)
    })

    describe('Retry check post status 3 times', () => {
      it('throw an error after 3 times retry', async () => {
        const posts = ['PENDING', 'PROCESSING'].map((postStatus) => ({ ...post, postStatus }))
        const failureAction = actions.postsCreateFailure({
          message: 'Post has not been processed',
          payload: processingPost,
          meta: {},
        })

        const tests = posts.map((post) => {
          return expectSaga(sagas.checkPostsCreateProcessing, processingPost)
            .provide([
              [getPost, { data: { post } }],
              [getContext('errorWrapper'), errorWrapper],
            ])

            .delay(TIMEOUT_DELAY + 1)

            .put(failureAction)
            .run(false)
        })

        await Promise.all(tests)
      }, 20000)
    })

    describe('Keep handle socket events when received post is not equal processingPost', () => {
      it('handle POST_COMPLETED event', async () => {
        await expectSaga(sagas.checkPostsCreateProcessing, processingPost)
          .dispatch(subscriptionsActions.subscriptionsPostCompleted({ postId: 2 }))
          .spawn(sagas.checkPostsCreateProcessing, processingPost)
          .silentRun()
      })

      it('handle POST_ERROR event', async () => {
        await expectSaga(sagas.checkPostsCreateProcessing, processingPost)
          .dispatch(subscriptionsActions.subscriptionsPostError({ postId: 2 }))
          .spawn(sagas.checkPostsCreateProcessing, processingPost)
          .silentRun()
      })
    })
  })
})
