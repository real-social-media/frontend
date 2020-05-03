import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import AsyncStorage from '@react-native-community/async-storage'

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

import 'store/ducks/posts/updates'
import 'store/ducks/users/updates'

const postsPersistConfig = {
  key: 'posts',
  storage: AsyncStorage,
  whitelist: [
    'postsFeedGet',
    'postsGet',
    'postsGetCache',
    'postsGetTrendingPosts',
    // 'postsCreateQueue',
    // 'postsRecreateQueue',
  ],
}

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: [
    'user',
  ],
}

const chatPersistConfig = {
  key: 'chat',
  storage: AsyncStorage,
  whitelist: [
    'chatGetChats',
  ],
}

export default combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  signup,
  theme,
  camera,
  albums,
  chat: persistReducer(chatPersistConfig, chat),
  posts: persistReducer(postsPersistConfig, posts),
  users,
  layout,
  translation,
  ui,
  cache,
})
