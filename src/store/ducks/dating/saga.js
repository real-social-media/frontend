import { put, takeLatest } from 'redux-saga/effects'
import RNFetchBlob from 'rn-fetch-blob'


import * as actions from './actions'
import * as constants from './constants'

/**
 * TODO: temporary declare mock API here.
 * we will switch to AWS graphQL later
 */
async function getPartnerAPI (page, seed){
const response = await RNFetchBlob.fetch('GET', `https://randomuser.me/api/?page=${page}&results=10&seed=${seed}`)
  const data = JSON.parse(response?.data || {})
  return data
}

function* datingGetPartners(req) {
  try {
    yield put(actions.datingGetPartnersRequest({}))
    const data = yield getPartnerAPI(req?.payload?.page || 1, 'abc')
    yield put(actions.datingGetPartnersSuccess({payload: data}))
  } catch (error) {
    yield put(actions.datingGetPartnersFailure({ message: error.message, payload: req.payload }))
  }
}


export default () => [
  takeLatest(constants.DATING_GET_PARTNERS, datingGetPartners),
]
