import { graphqlOperation } from '@aws-amplify/api'
import { getContext, race, take } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as authConstants from 'store/ducks/auth/constants'

export function* apiRequest(query, payload) {
  const AwsAPI = yield getContext('AwsAPI')
  const request = AwsAPI.graphql(graphqlOperation(query, payload))

  const { response, signout } = yield race({
    response: request,
    signout: take(authConstants.AUTH_SIGNOUT_REQUEST),
  })

  if (signout) {
    const message = 'Cancel request on signout'
    AwsAPI.cancel(request, message)
    throw new Error(message)
  } else {
    return response
  }
}

export function getPrimaryGraphqlError(error) {
  const firstError = path(['errors', '0'])(error)

  if (!firstError || firstError.name !== 'GraphQLError') {
    return false
  }

  return firstError
}

export function getPrimaryClientError(error) {
  const firstError = path(['errors', '0'])(error)

  if (!firstError || firstError.errorType !== 'ClientError') {
    return false
  }

  return firstError
}
