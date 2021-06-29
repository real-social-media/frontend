import { Linking } from 'react-native'
import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { testAsRootSaga, testNavigate, makeAuthorizedState } from 'tests/utils/helpers'
import * as authActions from 'store/ducks/auth/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as actions from 'store/ducks/contacts/actions'
import * as queries from 'store/ducks/contacts/queries'
import * as queryService from 'services/Query'
import contactsGrantBonusRequest from 'store/ducks/contacts/saga/contactsGrantBonusRequest'

jest.spyOn(Linking, 'openURL')
Linking.openURL.mockResolvedValue(true)

jest.mock('react-native-contacts', () => ({ getAll: jest.fn() }))
jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

const tenInvited = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
}
const user = { userId: '1', subscriptionLevel: 'BASIC' }
const diamondUser = { userId: '1', subscriptionLevel: 'DIAMOND' }

const navigation = { navigate: jest.fn() }

const setupSaga = () =>
  expectSaga(testAsRootSaga(contactsGrantBonusRequest)).provide([
    [getContext('ReactNavigationRef'), { current: navigation }],
  ])

const state = { contacts: { contactsInvite: { invited: tenInvited } } }

describe('Contacts Grand bonus saga', () => {
  afterEach(() => {
    navigation.navigate.mockClear()
  })

  describe('contactsGrantBonusRequest', () => {
    describe('success', () => {
      it('grand bonus on contactsInviteSuccess', async () => {
        await setupSaga()
          .withState(makeAuthorizedState(user, state))

          .call(queryService.apiRequest, queries.grantUserSubscriptionBonus, { grantCode: 'FREE_FOR_LIFE' })
          .put(authActions.authGetUserRequest())

          .dispatch(actions.contactsInviteSuccess())
          .silentRun()
      })

      it('grand bonus on contactsFollowSuccess', async () => {
        await setupSaga()
          .withState(makeAuthorizedState(user, state))

          .call(queryService.apiRequest, queries.grantUserSubscriptionBonus, { grantCode: 'FREE_FOR_LIFE' })
          .put(authActions.authGetUserRequest())

          .dispatch(actions.contactsFollowSuccess())
          .silentRun()
      })

      it('grand bonus on contactsCheckBonusRequest', async () => {
        await setupSaga()
          .withState(makeAuthorizedState(user, state))

          .call(queryService.apiRequest, queries.grantUserSubscriptionBonus, { grantCode: 'FREE_FOR_LIFE' })
          .put(authActions.authGetUserRequest())

          .dispatch(actions.contactsCheckBonusRequest())
          .silentRun()
      })
    })

    describe('failure', () => {
      it('request error', async () => {
        queryService.apiRequest.mockRejectedValueOnce(false)

        await setupSaga()
          .withState(makeAuthorizedState(user, state))

          .call(queryService.apiRequest, queries.grantUserSubscriptionBonus, { grantCode: 'FREE_FOR_LIFE' })
          .not.put(authActions.authGetUserRequest())

          .dispatch(actions.contactsInviteSuccess())
          .silentRun()

        expect(navigation.navigate).not.toHaveBeenCalled()
      })

      it('not enough invited', async () => {
        await setupSaga()
          .withState(makeAuthorizedState(user, { contacts: { contactsInvite: { invited: { 1: true } } } }))

          .not.call(queryService.apiRequest, queries.grantUserSubscriptionBonus, { grantCode: 'FREE_FOR_LIFE' })
          .not.put(authActions.authGetUserRequest())

          .dispatch(actions.contactsInviteSuccess())
          .silentRun()

        expect(navigation.navigate).not.toHaveBeenCalled()
      })

      it('not authorized user', async () => {
        await setupSaga()
          .withState(state)

          .not.call(queryService.apiRequest, queries.grantUserSubscriptionBonus, { grantCode: 'FREE_FOR_LIFE' })
          .not.put(authActions.authGetUserRequest())

          .dispatch(actions.contactsCheckBonusRequest())
          .silentRun()

        expect(navigation.navigate).not.toHaveBeenCalled()
      })

      it('diamond user', async () => {
        await setupSaga()
          .withState(makeAuthorizedState(diamondUser, state))

          .not.call(queryService.apiRequest, queries.grantUserSubscriptionBonus, { grantCode: 'FREE_FOR_LIFE' })
          .not.put(authActions.authGetUserRequest())

          .dispatch(actions.contactsCheckBonusRequest())
          .silentRun()

        expect(navigation.navigate).not.toHaveBeenCalled()
      })
    })
  })

  describe('handleGrantBonusCard', () => {
    const diamondCard = { cardId: 1, action: 'https:/real.app/diamond' }
    const chatCard = { cardId: 2, action: 'https:/real.app/chat' }

    it('no bonus card in a list', async () => {
      await setupSaga()
        .not.put(usersActions.usersGetCardsOptimistic({ cardId: diamondCard.cardId }))
        .not.put(usersActions.usersDeleteCardRequest({ cardId: diamondCard.cardId }))

        .dispatch(usersActions.usersGetCardsSuccess({ data: [chatCard] }))
        .silentRun()

      expect(navigation.navigate).not.toHaveBeenCalled()
    })

    it('navigate to congratulations screen', async () => {
      await setupSaga()
        .put(usersActions.usersGetCardsOptimistic({ cardId: diamondCard.cardId }))
        .put(usersActions.usersDeleteCardRequest({ cardId: diamondCard.cardId }))

        .dispatch(usersActions.usersGetCardsSuccess({ data: [diamondCard, chatCard] }))
        .silentRun()

      testNavigate(navigation, 'InviteFriendsSuccess')
    })
  })
})
