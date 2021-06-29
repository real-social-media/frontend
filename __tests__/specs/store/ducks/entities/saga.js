import { expectSaga } from 'redux-saga-test-plan'
import { entitiesMerge } from 'store/ducks/entities/saga'
import * as entitiesActions from 'store/ducks/entities/actions'

describe('Entities saga', () => {
  it('prevent merge with empty data by default', async () => {
    const entities = {}

    await expectSaga(entitiesMerge, { entities })
      .not.put(entitiesActions.entitiesAlbumsMerge({ data: {} }))
      .not.put(entitiesActions.entitiesPostsMerge({ data: {} }))
      .not.put(entitiesActions.entitiesUsersMerge({ data: {} }))
      .not.put(entitiesActions.entitiesCommentsMerge({ data: {} }))
      .not.put(entitiesActions.entitiesImagesMerge({ data: {} }))
      .not.put(entitiesActions.entitiesMessagesMerge({ data: {} }))
      .not.put(entitiesActions.entitiesChatsMerge({ data: {} }))

      .silentRun()
  })

  it('merge entities', async () => {
    const entities = {
      albums: { a: 1 },
      posts: { b: 2 },
      users: { c: 3 },
      comments: { f: 4 },
      images: { g: 5 },
      messages: { k: 6 },
      chats: { p: 7 },
    }

    await expectSaga(entitiesMerge, { entities })
      .put(entitiesActions.entitiesAlbumsMerge({ data: entities.albums }))
      .put(entitiesActions.entitiesPostsMerge({ data: entities.posts }))
      .put(entitiesActions.entitiesUsersMerge({ data: entities.users }))
      .put(entitiesActions.entitiesCommentsMerge({ data: entities.comments }))
      .put(entitiesActions.entitiesImagesMerge({ data: entities.images }))
      .put(entitiesActions.entitiesMessagesMerge({ data: entities.messages }))
      .put(entitiesActions.entitiesChatsMerge({ data: entities.chats }))

      .silentRun()
  })
})
