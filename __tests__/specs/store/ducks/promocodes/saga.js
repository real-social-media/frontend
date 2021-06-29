import { expectSaga } from 'redux-saga-test-plan'
import { testAsRootSaga } from 'tests/utils/helpers'
import * as actions from 'store/ducks/promocodes/actions'
import * as queries from 'store/ducks/promocodes/queries'
import * as authActions from 'store/ducks/auth/actions'
import promocodes from 'store/ducks/promocodes/saga'
import * as queryService from 'services/Query'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

describe('Promocodes saga', () => {
  const code = '1234324'

  afterEach(() => {
    queryService.apiRequest.mockClear()
  })

  it('success', async () => {
    await expectSaga(testAsRootSaga(promocodes))
      .call(queryService.apiRequest, queries.redeemPromotion, { code })
      .put(actions.promoCodesRedeemSuccess())
      .put(authActions.authGetUserRequest())

      .dispatch(actions.promoCodesRedeemRequest({ code }))
      .silentRun()
  })

  it('failure', async () => {
    const error = new Error('Error')
    queryService.apiRequest.mockRejectedValueOnce(error)

    await expectSaga(testAsRootSaga(promocodes))
      .put(actions.promoCodesRedeemFailure(error))
      .not.put(actions.promoCodesRedeemSuccess())
      .not.put(authActions.authGetUserRequest())

      .dispatch(actions.promoCodesRedeemRequest({ code }))
      .silentRun()
  })
})
