import { all } from 'redux-saga/effects'
import camera from 'store/ducks/camera/saga'
import cache from 'store/ducks/cache/saga'
import purchases from 'store/ducks/purchases/saga'
import contacts from 'store/ducks/contacts/saga'
import updates from 'store/ducks/updates/saga'
import push from 'store/ducks/push/saga/pushStart'
import postsCreate from 'store/ducks/posts/saga/postsCreate'
import postsShare from 'store/ducks/posts/saga/postsShare'
import sagas from 'store/sagas.common'

export default function* rootSaga() {
  yield all(
    []
      .concat(push())

      .concat(camera())
      .concat(updates())
      .concat(cache())
      .concat(purchases())
      .concat(contacts())
      .concat(postsCreate())
      .concat(postsShare())
      .concat(sagas()),
  )
}
