import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import { makeAuthorizedState } from 'tests/utils/helpers'
import navigationSubscription from 'store/ducks/subscriptions/saga/navigation'
import * as usersActions from 'store/ducks/users/actions'
import * as Logger from 'services/Logger'

const unsubscribe = jest.fn()
const navigation = { addListener: jest.fn().mockReturnValue(unsubscribe), getCurrentRoute: jest.fn() }

const provideNavigation = [getContext('ReactNavigationRef'), { current: navigation }]
const applyOnChange = (navigation) => navigation.addListener.mock.calls[0][1]()
const route = { name: 'ROUTE' }
const user = { userId: 'us-east-1:f554ea33-7315-4e60-8e85-c86ad0ee6f0e' }
const authorizedState = makeAuthorizedState(user)

describe('navigationSubscription', () => {
  afterEach(() => {
    unsubscribe.mockClear()
    Logger.captureException.mockClear()
    navigation.getCurrentRoute.mockClear()
    navigation.addListener.mockClear()
  })

  it('emmit change event when route changed', () => {
    navigation.getCurrentRoute.mockReturnValueOnce(undefined).mockReturnValueOnce(route)

    const promise = expectSaga(navigationSubscription)
      .withState(authorizedState)
      .provide([provideNavigation])

      .put(usersActions.usersReportScreenViewsRequest({ screens: [route.name] }))
      .silentRun()

    applyOnChange(navigation)

    return promise
  })

  it('prevent event when user is not authorized', () => {
    navigation.getCurrentRoute.mockReturnValueOnce(undefined).mockReturnValueOnce(route)

    const promise = expectSaga(navigationSubscription)
      .provide([provideNavigation])

      .not.put(usersActions.usersReportScreenViewsRequest({ screens: [route.name] }))
      .silentRun()

    applyOnChange(navigation)

    return promise
  })

  it('prevent event when route is equal with prev route', () => {
    navigation.getCurrentRoute.mockReturnValueOnce(route).mockReturnValueOnce(route)

    const promise = expectSaga(navigationSubscription)
      .withState(authorizedState)
      .provide([provideNavigation])

      .not.put(usersActions.usersReportScreenViewsRequest({ screens: [route.name] }))
      .silentRun()

    applyOnChange(navigation)

    return promise
  })

  it('catch an error', () => {
    const error = new Error('Error')
    const throwError = () => {
      throw error
    }
    navigation.getCurrentRoute.mockReturnValueOnce(route).mockImplementationOnce(throwError)

    const promise = expectSaga(navigationSubscription)
      .withState(authorizedState)
      .provide([provideNavigation])

      .not.put(usersActions.usersReportScreenViewsRequest({ screens: [route.name] }))
      .silentRun()

    applyOnChange(navigation)
    expect(Logger.captureException).toHaveBeenCalledWith(error)
    expect(unsubscribe).toHaveBeenCalled()

    return promise
  })
})
