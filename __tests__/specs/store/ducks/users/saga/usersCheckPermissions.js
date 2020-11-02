import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import { sagaWithError } from 'tests/utils/helpers'
import * as authSelector from 'store/ducks/auth/selectors'
import usersCheckPermissions from 'store/ducks/users/saga/usersCheckPermissions'
import { testNavigate } from 'tests/utils/helpers'

jest.spyOn(authSelector, 'authUserSelector').mockReturnValue({ userStatus: 'ACTIVE' })
const navigation = { current: { navigate: jest.fn() } }
const provideNavigation = [getContext('ReactNavigationRef'), navigation]

describe('usersCheckPermissions', () => {
  afterEach(() => {
    navigation.current.navigate.mockClear()
  })

  it('not throw an error for active user', async () => {
    await expectSaga(usersCheckPermissions).silentRun()
  })

  it('throw an error for anonymous user', async () => {
    authSelector.authUserSelector.mockReturnValueOnce({ userStatus: 'ANONYMOUS' })
    const saga = sagaWithError(usersCheckPermissions).assertThrow(new Error('User is not ACTIVE'))

    await expectSaga(saga).provide([provideNavigation]).run()
    testNavigate(navigation.current, 'App.Root.ProfileUpgrade')
  })
})
