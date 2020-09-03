import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import AsyncStorage from '@react-native-community/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import auth from 'store/ducks/auth/reducer'
import signup from 'store/ducks/signup/reducer'
import camera from 'store/ducks/camera/reducer'
import theme from 'store/ducks/theme/reducer'
import posts from 'store/ducks/posts/reducer'
import albums from 'store/ducks/albums/reducer'
import chat from 'store/ducks/chat/reducer'
import users from 'store/ducks/users/reducer'
import layout from 'store/ducks/layout/reducer'
import translation from 'store/ducks/translation/reducer'
import ui from 'store/ducks/ui/reducer'
import cache from 'store/ducks/cache/reducer'
import entities from 'store/ducks/entities/reducer'
import subscriptions from 'store/ducks/subscriptions/reducer'

import 'store/ducks/posts/updates'
import 'store/ducks/users/updates'
import 'store/ducks/chat/updates'

const postsPersistConfig = {
  version: 2,
  key: 'posts',
  storage: AsyncStorage,
  whitelist: [
    'postsFeedGet',
  ],
}

const entitiesPersistConfig = {
  version: 2,
  key: 'entities',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: [
    'posts',
    'images',
    'comments',
  ],
}

export default combineReducers({
  auth,
  signup,
  theme,
  camera,
  albums,
  chat,
  posts: persistReducer(postsPersistConfig, posts),
  users,
  layout,
  translation,
  ui,
  cache,
  entities: persistReducer(entitiesPersistConfig, entities),
  subscriptions,
})
