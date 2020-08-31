import { graphqlOperation } from '@aws-amplify/api'
import { getContext, retry } from 'redux-saga/effects'

export function* _apiRequest({ query, payload }) {
  const AwsAPI = yield getContext('AwsAPI')
  return yield AwsAPI.graphql(graphqlOperation(query, payload))
}

export function* apiRequest(query, payload) {
  return yield retry(3, 1000, _apiRequest, { query, payload })
}
