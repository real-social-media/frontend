import {  createSelector } from 'reselect'
import path from 'ramda/src/path'
// import assocPath from 'ramda/src/assocPath'
// import * as normalizer from 'normalizer/schemas'

// import { initialState } from './reducer'



/**
 *
 */
const datingGetPartners = () => path(['dating', 'datingGetPartners', 'data', 'payload', 'results'])
const datingGetPartnersInfo = () => path(['dating', 'datingGetPartners', 'data', 'payload', 'info'])

export const datingGetPartnersSelector =  createSelector(
  [datingGetPartners()],
  (partners) => {
    return partners || []
  }
)

export const datingGetPartnersInfoSelector =  createSelector(
  [datingGetPartnersInfo()],
  (info) => {
    return info || {}
  }
)

