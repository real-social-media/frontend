import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import { testAsRootSaga, testNavigate, makeAuthorizedState } from 'tests/utils/helpers'
import * as authActions from 'store/ducks/auth/actions'
import * as actions from 'store/ducks/themes/actions'
import * as queries from 'store/ducks/themes/queries'
import themes from 'store/ducks/themes/saga'
import * as queryService from 'services/Query'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

const navigation = { navigate: jest.fn() }

describe('Themes saga', () => {
  afterEach(() => {
    navigation.navigate.mockClear()
  })

  describe('themesCheckDefaultRequest', () => {
    it('open modal when themeCode empty', async () => {
      const user = { userId: '1', themeCode: null }

      await expectSaga(testAsRootSaga(themes))
        .provide([[getContext('ReactNavigationRef'), { current: navigation }]])
        .withState(makeAuthorizedState(user))

        .put(actions.themesCheckDefaultSuccess())

        .dispatch(actions.themesCheckDefaultRequest())
        .silentRun()

      testNavigate(navigation, 'ThemeDefault')
    })

    it('do not open modal if themeCode is not empty', async () => {
      const user = { userId: '1', themeCode: 'themeCode' }

      await expectSaga(testAsRootSaga(themes))
        .provide([[getContext('ReactNavigationRef'), { current: navigation }]])
        .withState(makeAuthorizedState(user))

        .put(actions.themesCheckDefaultSuccess())

        .dispatch(actions.themesCheckDefaultRequest())
        .silentRun()

      expect(navigation.navigate).not.toHaveBeenCalled()
    })

    it('failure', async () => {
      const user = { userId: '1', themeCode: null }
      const error = new Error('error')

      navigation.navigate.mockImplementationOnce(() => {
        throw error
      })

      await expectSaga(testAsRootSaga(themes))
        .provide([[getContext('ReactNavigationRef'), { current: navigation }]])
        .withState(makeAuthorizedState(user))

        .put(actions.themesCheckDefaultFailure(error))

        .dispatch(actions.themesCheckDefaultRequest())
        .silentRun()
    })
  })

  describe('themesEditRequest', () => {
    const themeCode = 'themeCode'

    it('success', async () => {
      await expectSaga(testAsRootSaga(themes))
        .provide([[getContext('ReactNavigationRef'), { current: navigation }]])

        .call(queryService.apiRequest, queries.setThemeCode, { themeCode })
        .put(authActions.authGetUserRequest())
        .put(actions.themesEditSuccess())

        .dispatch(actions.themesEditRequest({ themeCode }))
        .silentRun()
    })

    it('failure', async () => {
      const error = new Error('Error')

      queryService.apiRequest.mockRejectedValueOnce(error)

      await expectSaga(testAsRootSaga(themes))
        .provide([[getContext('ReactNavigationRef'), { current: navigation }]])

        .call(queryService.apiRequest, queries.setThemeCode, { themeCode })
        .put(actions.themesEditFailure(error))

        .dispatch(actions.themesEditRequest({ themeCode }))
        .silentRun()
    })
  })
})
