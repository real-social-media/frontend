import { graphqlOperation } from '@aws-amplify/api'
import { getContext } from 'redux-saga/effects'

export function* apiRequest(query, payload) {
  const AwsAPI = yield getContext('AwsAPI')
  return yield AwsAPI.graphql(graphqlOperation(query, payload))
}
