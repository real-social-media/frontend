import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import * as AwsAPI from '@aws-amplify/api'
import * as queryService from 'services/Query'
import { sagaWithError, sleep } from 'tests/utils/helpers'
import * as authActions from 'store/ducks/auth/actions'

jest.mock('@aws-amplify/api', () => ({
  graphqlOperation: jest.fn(),
  graphql: jest.fn(),
  cancel: jest.fn(),
}))

const query = 'query'
const payload = { a: 1, b: 2 }
const response = { data: [{ id: 1 }] }

AwsAPI.graphqlOperation.mockResolvedValue(true)
AwsAPI.graphql.mockResolvedValue(response)

describe('Query service', () => {
  afterEach(() => {
    AwsAPI.graphqlOperation.mockClear()
    AwsAPI.graphql.mockClear()
  })

  it('resolve response', async () => {
    await expectSaga(queryService.apiRequest, query, payload)
      .provide([[getContext('AwsAPI'), AwsAPI]])

      .returns(response)
      .silentRun()

    expect(AwsAPI.graphqlOperation).toHaveBeenCalledWith(query, payload)
    expect(AwsAPI.graphql).toHaveBeenCalled()
    expect(AwsAPI.cancel).not.toHaveBeenCalled()
  })

  it('throw an error', async () => {
    const error = new Error('Error')
    AwsAPI.graphql.mockRejectedValueOnce(error)
    const saga = sagaWithError(queryService.apiRequest, query, payload).assertThrow(error)

    await expectSaga(saga)
      .provide([[getContext('AwsAPI'), AwsAPI]])
      .silentRun()
  })

  it('cancel request on signout', async () => {
    AwsAPI.graphql.mockReturnValueOnce(sleep())

    const saga = sagaWithError(queryService.apiRequest, query, payload).assertThrow(
      new Error('Cancel request on signout'),
    )

    await expectSaga(saga)
      .provide([[getContext('AwsAPI'), AwsAPI]])

      .dispatch(authActions.authSignoutRequest())
      .silentRun()

    expect(AwsAPI.graphqlOperation).toHaveBeenCalledWith(query, payload)
    expect(AwsAPI.graphql).toHaveBeenCalled()
    expect(AwsAPI.cancel).toHaveBeenCalled()
  })
})
