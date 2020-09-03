import { combineReducers } from 'redux'
import { omit } from 'ramda'
import { applyActions, generateValues } from 'tests/utils/helpers'
import entities, { initialState, now } from 'store/ducks/entities/reducer'
import * as selectors from 'store/ducks/entities/selectors'
import * as entitiesActions from 'store/ducks/entities/actions'

const reducer = combineReducers({ entities })

const entitiesKeys = ['albums', 'posts', 'comments', 'users', 'images', 'chats', 'messages']
const values = generateValues(entitiesKeys)

const actions = [
  entitiesActions.entitiesAlbumsMerge({ data: values.albums }),
  entitiesActions.entitiesPostsMerge({ data: values.posts }),
  entitiesActions.entitiesCommentsMerge({ data: values.comments }),
  entitiesActions.entitiesUsersMerge({ data: values.users }),
  entitiesActions.entitiesImagesMerge({ data: values.images }),
  entitiesActions.entitiesChatsMerge({ data: values.chats }),
  entitiesActions.entitiesMessagesMerge({ data: values.messages }),
]

describe('Entities reducer', () => {
  it('initialState should represent all entities keys', () => {
    expect(Object.keys(initialState)).toEqual(entitiesKeys)
  })

  it('entities should have updateAt field for correct work redux-persist', () => {
    expect(now).toBeTruthy()

    Object.keys(initialState).forEach((key) => {
      expect(initialState[key].updatedAt).toBe(now)
    })

    const state = applyActions(actions, reducer)
    const updatedEntites = selectors.selectEntities(state)

    expect(Object.keys(updatedEntites)).toEqual(entitiesKeys)

    Object.keys(updatedEntites).forEach((key) => {
      expect(updatedEntites[key].updatedAt).toBeGreaterThan(now)
    })
  })

  it('represent initial state by default', () => {
    const state = reducer(undefined, { type: 'MOCK_ACTION' })

    expect(selectors.selectEntities(state)).toEqual(initialState)
  })

  it('merge entities on update actions', () => {
    const state = applyActions(actions, reducer)
    const updatedEntites = selectors.selectEntities(state)

    expect(Object.keys(updatedEntites)).toEqual(entitiesKeys)

    Object.keys(updatedEntites).forEach((key) => {
      expect(omit(['updatedAt'], updatedEntites[key])).toEqual(values[key])
    })
  })
})
