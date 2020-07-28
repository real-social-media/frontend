import { createAction } from 'redux-actions'
import * as constants from './constants'

//
// ──────────────────────────────────────────────────────────────────── I ──────────
//   :::::: D A T I N G   A C T I O N S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────
//
export const datingGetPartners = createAction(constants.DATING_GET_PARTNERS)
export const datingGetPartnersRequest = createAction(constants.DATING_GET_PARTNERS_REQUEST)
export const datingGetPartnersSuccess = createAction(constants.DATING_GET_PARTNERS_SUCCESS)
export const datingGetPartnersFailure = createAction(constants.DATING_GET_PARTNERS_FAILURE)

