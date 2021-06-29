import equals from 'ramda/src/equals'
import { eventChannel } from 'redux-saga'
import { call, put, take, select } from 'redux-saga/effects'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as NavigationService from 'services/Navigation'
import * as Logger from 'services/Logger'

function createNavigationChannel(navigation) {
  let prevRoute = navigation.getCurrentRoute()

  return eventChannel((emitter) => {
    return navigation.addListener('state', () => {
      try {
        const route = navigation.getCurrentRoute()
        const isChanged = !equals(prevRoute, route)

        if (isChanged) {
          emitter(route)
          prevRoute = route
        }
      } catch (error) {
        emitter(error)
      }
    })
  })
}

function* navigationSubscription() {
  const navigation = yield NavigationService.getNavigation()
  const channel = yield call(createNavigationChannel, navigation)

  try {
    while (true) {
      const route = yield take(channel)
      const userId = yield select(authSelector.authUserId)

      if (userId) {
        yield put(usersActions.usersReportScreenViewsRequest({ screens: [route.name] }))
      }
    }
  } catch (error) {
    Logger.captureException(error)
    channel.close()
  }
}

export default navigationSubscription
