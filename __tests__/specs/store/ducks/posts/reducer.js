import { combineReducers } from 'redux'
import { applyActions } from 'tests/utils/helpers'
import posts from 'store/ducks/posts/reducer'
import * as actions from 'store/ducks/posts/actions'
import * as selectors from 'store/ducks/posts/selectors'

const reducer = combineReducers({ posts })

describe('Posts reducer', () => {
  describe('postsGetTrendingPosts', () => {
    const data = [{ id: 1 }, { id: 2 }]
    const meta = { a: 1, b: 2 }
    const selectPostsGetTrendingPosts = selectors.postsGetTrendingPosts()

    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK_ACTION' })

      expect(selectPostsGetTrendingPosts(state)).toEqual({
        data: [],
        error: {},
        meta: {},
        payload: {},
        status: 'idle',
      })
    })

    it('success', () => {
      const state = reducer(undefined, actions.postsGetTrendingPostsSuccess({ data, meta }))

      expect(selectPostsGetTrendingPosts(state)).toEqual({
        data,
        error: {},
        meta,
        payload: {},
        status: 'success',
      })
    })

    it('clear data on request', () => {
      const state = applyActions([
        actions.postsGetTrendingPostsSuccess({ data, meta }), 
        actions.postsGetTrendingPostsRequest(),
      ], reducer)

      expect(selectPostsGetTrendingPosts(state)).toEqual({
        data: [],
        error: {},
        meta: {},
        payload: undefined,
        status: 'loading',
      })
    })
  })
})
