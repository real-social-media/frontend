import * as auth from 'store/ducks/auth/reducer'
import * as signup from 'store/ducks/signup/reducer'
import * as camera from 'store/ducks/camera/reducer'
import * as posts from 'store/ducks/posts/reducer'
import * as albums from 'store/ducks/albums/reducer'
import * as purchases from 'store/ducks/purchases/reducer'
import * as chat from 'store/ducks/chat/reducer'
import * as users from 'store/ducks/users/reducer'
import * as app from 'store/ducks/app/reducer'
import * as cache from 'store/ducks/cache/reducer'
import * as entities from 'store/ducks/entities/reducer'
import * as subscriptions from 'store/ducks/subscriptions/reducer'
import * as contacts from 'store/ducks/contacts/reducer'
import * as dating from 'store/ducks/dating/reducer'
import rootReducer from 'store/reducers'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as appActions from 'store/ducks/app/actions'
import { applyActions } from 'tests/utils/helpers'
import Storage  from 'services/Storage'

jest.spyOn(Storage, 'clearAll')

const initialState = {
  app: app.initialState,
  network: { isConnected: true, actionQueue: [], isQueuePaused: false },
  auth: auth.initialState,
  signup: signup.initialState,
  camera: camera.initialState,
  albums: albums.initialState,
  purchases: purchases.initialState,
  chat: chat.initialState,
  posts: posts.initialState,
  users: users.initialState,
  contacts: contacts.initialState,
  dating: dating.initialState,
  cache: cache.initialState,
  entities: entities.initialState,
  subscriptions: subscriptions.initialState,
}

const data = { 1: { id: 1 }, 2: { id: 2 } }
const entitiesMergeActions = [
  entitiesActions.entitiesAlbumsMerge({ data }),
  entitiesActions.entitiesPostsMerge({ data }),
  entitiesActions.entitiesCommentsMerge({ data }),
  entitiesActions.entitiesUsersMerge({ data }),
  entitiesActions.entitiesImagesMerge({ data }),
  entitiesActions.entitiesChatsMerge({ data }),
  entitiesActions.entitiesMessagesMerge({ data }),
]

describe('rootReducer', () => {
  afterEach(() => {
    Storage.clearAll.mockClear()
  })

  it('initial state', () => {
    expect(rootReducer(undefined, { type: 'MOCK_ACTION' })).toEqual(initialState)
  })

  it('applyActions', () => {
    const state = applyActions(entitiesMergeActions, rootReducer)

    expect(state.entities).toEqual({
      albums: data,
      posts: data,
      comments: data,
      users: data,
      images: data,
      chats: data,
      messages: data,
    })
  })

  it('reset state on signout', () => {
    const state = applyActions([...entitiesMergeActions, authActions.authSignoutSuccess()], rootReducer)

    expect(state.entities).toEqual(initialState.entities)
    expect(state).toEqual(initialState)
    expect(Storage.clearAll).toHaveBeenCalled()
  })

  it('save app state on signout', () => {
    const state = applyActions([
      appActions.appReadyRequest(),
      appActions.appThemePreviewRequest(),
    ], rootReducer)

    expect(state.app).not.toEqual(initialState.app)
    expect(rootReducer(state, authActions.authSignoutSuccess()).app).toEqual(state.app)
    expect(Storage.clearAll).toHaveBeenCalled()
  })
})
