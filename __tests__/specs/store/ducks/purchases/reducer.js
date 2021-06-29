import { combineReducers } from 'redux'
import { applyActions } from 'tests/utils/helpers'
import purchases from 'store/ducks/purchases/reducer'
import * as actions from 'store/ducks/purchases/actions'
import * as selectors from 'store/ducks/purchases/selectors'

const reducer = combineReducers({ purchases })
const error = new Error('Error')

describe('Purchases reducer', () => {
  describe('purchasesRequest', () => {
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK_ACTION' })

      expect(selectors.purchasesRequest(state)).toEqual({
        status: 'idle',
      })
    })

    it('loading state', () => {
      const state = reducer(undefined, actions.purchaseRequest())

      expect(selectors.purchasesRequest(state)).toEqual({
        status: 'loading',
      })
    })

    it('success state', () => {
      const state = reducer(undefined, actions.purchaseSuccess())

      expect(selectors.purchasesRequest(state)).toEqual({
        status: 'success',
      })
    })

    it('error state', () => {
      const state = reducer(undefined, actions.purchaseFailure(error))

      expect(selectors.purchasesRequest(state)).toEqual({
        status: 'failure',
      })
    })

    it('clear error on request', () => {
      const state = applyActions([actions.purchaseFailure(error), actions.purchaseRequest()], reducer)

      expect(selectors.purchasesRequest(state)).toEqual({
        status: 'loading',
      })
    })
  })

  describe('retryPurchase', () => {
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK_ACTION' })

      expect(selectors.retryPurchase(state)).toEqual({
        status: 'idle',
      })
    })

    it('loading state', () => {
      const state = reducer(undefined, actions.retryPurchaseRequest())

      expect(selectors.retryPurchase(state)).toEqual({
        status: 'loading',
      })
    })

    it('error state', () => {
      const state = reducer(undefined, actions.retryPurchaseFailure(error))

      expect(selectors.retryPurchase(state)).toEqual({
        status: 'failure',
      })
    })

    it('clear error on request', () => {
      const state = applyActions(
        [actions.purchaseFailure(error), actions.retryPurchaseFailure(error), actions.retryPurchaseRequest()],
        reducer,
      )

      expect(selectors.retryPurchase(state)).toEqual({
        status: 'loading',
      })

      expect(selectors.purchasesRequest(state)).toEqual({
        status: 'idle',
      })
    })
  })

  describe('subscriptionGet', () => {
    it('initial state', () => {
      const state = reducer(undefined, { type: 'MOCK_ACTION' })

      expect(selectors.subscriptionGet(state)).toEqual({
        status: 'idle',
        data: {},
      })
    })

    it('request', () => {
      const state = reducer(undefined, actions.subscriptionGetRequest())

      expect(selectors.subscriptionGet(state)).toEqual({
        status: 'loading',
        data: {},
      })
    })

    it('success', () => {
      const data = { a: 1, b: 2 }
      const state = reducer(undefined, actions.subscriptionGetSuccess(data))

      expect(selectors.subscriptionGet(state)).toEqual({
        status: 'success',
        data,
      })
    })

    it('failure', () => {
      const state = reducer(undefined, actions.subscriptionGetFailure(error))

      expect(selectors.subscriptionGet(state)).toEqual({
        status: 'failure',
        data: {},
      })
    })
  })
})
