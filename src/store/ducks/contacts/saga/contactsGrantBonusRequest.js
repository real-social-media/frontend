import find from 'ramda/src/find'
import pathOr from 'ramda/src/pathOr'
import { put, call, select, takeEvery } from 'redux-saga/effects'
import * as usersConstants from 'store/ducks/users/constants'
import * as authActions from 'store/ducks/auth/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as constants from 'store/ducks/contacts/constants'
import * as selectors from 'store/ducks/contacts/selectors'
import * as actions from 'store/ducks/contacts/actions'
import * as queries from 'store/ducks/contacts/queries'
import * as queryService from 'services/Query'
import * as NavigationService from 'services/Navigation'
import * as UserService from 'services/User'
import * as authSelector from 'store/ducks/auth/selectors'
import * as LinkingService from 'services/Linking'

function* contactsCheckBonusRequest() {
  try {
    const user = yield select(authSelector.authUser)
    const { invited } = yield select(selectors.contactsInvite)

    if (!UserService.isUserAuthorized(user)) return
    if (UserService.isUserSubscribed(user)) return

    if (Object.keys(invited).length === constants.CONTACTS_INVITE_LIMIT) {
      yield put(actions.contactsGrantBonusRequest({ grantCode: 'FREE_FOR_LIFE' }))
    }
  } catch (error) {
    yield put(actions.contactsCheckBonusFailure(error))
  }
}

function* contactsGrantBonusRequest(req) {
  try {
    yield call(queryService.apiRequest, queries.grantUserSubscriptionBonus, { grantCode: req.payload.grantCode })
    yield put(actions.contactsGrantBonusSuccess())
  } catch (error) {
    yield put(actions.contactsGrantBonusFailure(error))
  }
}

function* contactsGrantBonusSuccess() {
  yield put(authActions.authGetUserRequest())
}

function* handleGrantBonusCard(req) {
  try {
    const navigation = yield NavigationService.getNavigation()
    const cards = pathOr([], ['payload', 'data'], req)
    const diamondCard = find(LinkingService.isDiamondCard, cards)

    if (diamondCard) {
      LinkingService.deeplinkNavigation(navigation)(diamondCard.action)
      yield put(usersActions.usersGetCardsOptimistic({ cardId: diamondCard.cardId }))
      yield put(usersActions.usersDeleteCardRequest({ cardId: diamondCard.cardId }))
    }
  } catch (error) {
    // ignore
  }
}

export default () => [
  takeEvery(constants.CONTACTS_GRANT_BONUS_REQUEST, contactsGrantBonusRequest),
  takeEvery(constants.CONTACTS_GRANT_BONUS_SUCCESS, contactsGrantBonusSuccess),
  takeEvery(constants.CONTACTS_FOLLOW_SUCCESS, contactsCheckBonusRequest),
  takeEvery(constants.CONTACTS_INVITE_SUCCESS, contactsCheckBonusRequest),
  takeEvery(constants.CONTACTS_CHECK_BONUS_REQUEST, contactsCheckBonusRequest),
  takeEvery(usersConstants.USERS_GET_CARDS_SUCCESS, handleGrantBonusCard),
]
