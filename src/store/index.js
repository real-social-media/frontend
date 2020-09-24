import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { createNetworkMiddleware } from 'react-native-offline'
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'store/reducers'
import rootSaga from 'store/sagas'
import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'
import * as Logger from 'services/Logger'
import { STORAGE_PROVIDER } from 'services/Storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { errorWrapper } from 'store/helpers'
import 'store/updates'
import StorageHelper from 'services/MemoryStorage'

const persistConfig = {
  key: '/v2/root',
  storage: STORAGE_PROVIDER,
  whitelist: ['theme', 'translation'],
  stateReconciler: autoMergeLevel2,
}

const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200,
})

const sagaMiddleware = createSagaMiddleware({
  context: {
    AwsStorage: (new StorageHelper()).getStorage(),
    AwsAuth: Auth,
    AwsAPI: API,
    errorWrapper,
  },
  onError: Logger.captureException,
})

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
  actionsBlacklist: [
    'persist/REHYDRATE',

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

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(networkMiddleware, sagaMiddleware)),
)

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga, persistor)

export default store