import { expectSaga } from 'redux-saga-test-plan'
import { testAsRootSaga } from 'tests/utils/helpers'
import albums from 'store/ducks/albums/saga'
import * as queries from 'store/ducks/albums/queries'
import * as albumsActions from 'store/ducks/albums/actions'
import * as queryService from 'services/Query'
import { entitiesMerge } from 'store/ducks/entities/saga'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

const saga = () => expectSaga(testAsRootSaga(albums))

describe('Albums sagas', () => {
  afterEach(() => {
    queryService.apiRequest.mockClear()
  })

  describe('albumsGetRequest', () => {
    it('success', async () => {
      const payload = { userId: 'id123' }
      const response = { data: { user: { albums: { items: [{ albumId: 1 }] } } } }
      const entities = { albums: { 1: { albumId: 1 } } }

      queryService.apiRequest.mockResolvedValueOnce(response)

      await saga()
        .call(entitiesMerge, { entities, result: [1] })
        .put(albumsActions.albumsGetSuccess({ data: [1], payload, meta: {} }))

        .dispatch(albumsActions.albumsGetRequest(payload))
        .silentRun()

      expect(queryService.apiRequest).toHaveBeenCalledWith(queries.getAlbums, payload)
    })
  })

  describe('albumsSingleGetRequest', () => {
    it('success', async () => {
      const payload = { userId: 'id123' }
      const response = { data: { album: { albumId: 1 } } }
      const entities = { albums: { 1: { albumId: 1 } } }

      queryService.apiRequest.mockResolvedValueOnce(response)

      await saga()
        .call(entitiesMerge, { entities, result: 1 })
        .put(albumsActions.albumsSingleGetSuccess({ data: 1, payload, meta: {} }))

        .dispatch(albumsActions.albumsSingleGetRequest(payload))
        .silentRun()

      expect(queryService.apiRequest).toHaveBeenCalledWith(queries.getAlbum, payload)
    })
  })

  describe('albumsPostsGetRequest', () => {
    it('success', async () => {
      const payload = { userId: 'id123' }
      const response = { data: { album: { posts: { items: [{ postId: 1 }] } } } }
      const entities = { posts: { 1: { postId: 1 } } }

      queryService.apiRequest.mockResolvedValueOnce(response)

      await saga()
        .call(entitiesMerge, { entities, result: [1] })
        .put(albumsActions.albumsPostsGetSuccess({ data: [1], payload, meta: {} }))

        .dispatch(albumsActions.albumsPostsGetRequest(payload))
        .silentRun()

      expect(queryService.apiRequest).toHaveBeenCalledWith(queries.getAlbumPosts, payload)
    })
  })

  describe('albumsPostsGetMoreRequest', () => {
    it('success', async () => {
      const payload = { userId: 'id123' }
      const response = { data: { album: { posts: { items: [{ postId: 1 }] } } } }
      const entities = { posts: { 1: { postId: 1 } } }

      queryService.apiRequest.mockResolvedValueOnce(response)

      await saga()
        .call(entitiesMerge, { entities, result: [1] })
        .put(albumsActions.albumsPostsGetMoreSuccess({ data: [1], payload, meta: {} }))

        .dispatch(albumsActions.albumsPostsGetMoreRequest(payload))
        .silentRun()

      expect(queryService.apiRequest).toHaveBeenCalledWith(queries.getAlbumPosts, payload)
    })
  })

  describe('albumsCreateRequest', () => {
    it('success', async () => {
      const payload = { name: 'name' }
      const response = { data: { addAlbum: { albumId: 1 } } }
      const entities = { albums: { 1: { albumId: 1 } } }

      queryService.apiRequest.mockResolvedValueOnce(response)

      await saga()
        .call(entitiesMerge, { entities, result: 1 })
        .put(albumsActions.albumsCreateSuccess({ data: 1, payload, meta: {} }))

        .dispatch(albumsActions.albumsCreateRequest(payload))
        .silentRun()

      expect(queryService.apiRequest).toHaveBeenCalledWith(queries.addAlbum, payload)
    })
  })

  describe('albumsEditRequest', () => {
    it('success', async () => {
      const payload = { name: 'name' }
      const response = { data: { editAlbum: { albumId: 1 } } }
      const entities = { albums: { 1: { albumId: 1 } } }

      queryService.apiRequest.mockResolvedValueOnce(response)

      await saga()
        .call(entitiesMerge, { entities, result: 1 })
        .put(albumsActions.albumsEditSuccess({ data: 1, payload, meta: {} }))

        .dispatch(albumsActions.albumsEditRequest(payload))
        .silentRun()

      expect(queryService.apiRequest).toHaveBeenCalledWith(queries.editAlbum, payload)
    })
  })

  describe('albumsDeleteRequest', () => {
    it('success', async () => {
      const payload = { name: 'name' }
      const response = { data: { deleteAlbum: { albumId: 1 } } }
      const entities = { albums: { 1: { albumId: 1 } } }

      queryService.apiRequest.mockResolvedValueOnce(response)

      await saga()
        .call(entitiesMerge, { entities, result: 1 })
        .put(albumsActions.albumsDeleteSuccess({ data: 1, payload, meta: {} }))

        .dispatch(albumsActions.albumsDeleteRequest(payload))
        .silentRun()

      expect(queryService.apiRequest).toHaveBeenCalledWith(queries.deleteAlbum, payload)
    })
  })
})
