import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'store/reducers'
import rootSaga from 'store/sagas'
import { Credentials } from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'
import Cache from '@aws-amplify/cache'
import API from '@aws-amplify/api'
import * as Logger from 'services/Logger'
import AsyncStorage from '@react-native-community/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import path from 'ramda/src/path'
import 'store/updates'

const persistConfig = {
  key: '/v2/root',
  storage: AsyncStorage,
  whitelist: ['theme', 'translation'],
  stateReconciler: autoMergeLevel2,
}

const errorWrapper = (error) => {
  /**
   * basic error object handling
   */
  const errorMessage = path(['message'])(error)
  if (typeof errorMessage === 'string' && errorMessage.length) {
    return errorMessage
  }

  /**
   * graphql api errors
   */
  const errorGraphql = path(['errors'])(error)
  if (Array.isArray(errorGraphql) && errorGraphql.length) {
    return errorGraphql
  }
}

const sagaMiddleware = createSagaMiddleware({
  context: {
    AwsAuth: Auth,
    AwsAPI: API,
    AwsCache: Cache,
    AwsCredentials: Credentials,
    errorWrapper,
  },
  onError: Logger.captureException,
})

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
  actionsBlacklist: [
    'persist/REHYDRATE',

    'LAYOUT_POSTS_LIST_ITEM_SUCCESS',
    'LAYOUT_POSTS_LIST_SCROLL_SUCCESS',
    'LAYOUT_POST_MEDIA_ITEM_SUCCESS',
    'LAYOUT_POST_MEDIA_SCROLL_SUCCESS',

    'POSTS_CREATE_PROGRESS',

    'CACHE_FETCH_REQUEST',
    'CACHE_FETCH_SUCCESS',
    'CACHE_FETCH_PROGRESS',

    'ENTITIES_ALBUMS_MERGE',
    'ENTITIES_POSTS_MERGE',
    'ENTITIES_COMMENTS_MERGE',
    'ENTITIES_USERS_MERGE',
    'ENTITIES_IMAGES_MERGE',
    'ENTITIES_CHATS_MERGE',
  ],
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga, persistor)

export default store
