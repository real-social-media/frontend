/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "testGqlError", "expectSaga"] }] */
import { expectSaga } from 'redux-saga-test-plan'
import users from 'store/ducks/users/saga'
import * as usersActions from 'store/ducks/users/actions'
import * as queryService from 'services/Query'
import * as queries from 'store/ducks/users/queries'
import { entitiesMerge } from 'store/ducks/entities/saga'
import {  testAsRootSaga } from 'tests/utils/helpers'
import { GraphQLError } from 'store/errors'
import * as normalizer from 'normalizer/schemas'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

const payload = { userId: '1' }
const action = usersActions.usersSetUserDatingStatusRequest(payload)

describe('usersSetUserDatingStatusRequest', () => {
  afterEach(() => {
    queryService.apiRequest.mockClear()
  })

  it('success', async () => {
    const user = { userId: '1' }
    const response = { data: { setUserDatingStatus: user } }

    queryService.apiRequest.mockResolvedValueOnce(response)

    await expectSaga(testAsRootSaga(users))
      .call(entitiesMerge, normalizer.normalizeUserGet(response.data.setUserDatingStatus))
      .put(usersActions.usersSetUserDatingStatusSuccess({ data: '1', payload }))

      .dispatch(action)
      .silentRun()

    expect(queryService.apiRequest).toHaveBeenCalledWith(queries.setUserDatingStatus, payload)
  })

  it('failure', async () => {
    const error = new Error('Error')
    queryService.apiRequest.mockRejectedValueOnce(error)

    await expectSaga(testAsRootSaga(users))
      .put(usersActions.usersSetUserDatingStatusFailure(error))

      .dispatch(action)
      .silentRun()
  })

  describe('show specific error message', () => {
    const testGqlError = async ({ messageCode }) => {
      const gqlError = new GraphQLError({ errors: [{ errorInfo: [{ a: 1 }, 'sdfsd', messageCode, 'dsf'] }] })

      queryService.apiRequest.mockRejectedValueOnce(gqlError)

      await expectSaga(testAsRootSaga(users))
        .put({
          type: 'USERS_SET_USER_DATING_STATUS_FAILURE',
          payload: gqlError,
          error: true,
          meta: { messageCode },
        })

        .dispatch(action)
        .silentRun()
    }

    it('GENERIC by default', async () => {
      const gqlError = new GraphQLError({ errors: [{ errorInfo: [] }] })

      queryService.apiRequest.mockRejectedValueOnce(gqlError)

      await expectSaga(testAsRootSaga(users))
        .put({
          type: 'USERS_SET_USER_DATING_STATUS_FAILURE',
          payload: gqlError,
          error: true,
          meta: { messageCode: 'GENERIC' },
        })

        .dispatch(action)
        .silentRun()
    })

    it('MISSING_DISPLAY_NAME', async () => {
      await testGqlError({ messageCode: 'MISSING_DISPLAY_NAME' })
    })

    it('MISSING_PHOTO_POST_ID', async () => {
      await testGqlError({ messageCode: 'MISSING_PHOTO_POST_ID' })
    })

    it('MISSING_AGE', async () => {
      await testGqlError({ messageCode: 'MISSING_AGE' })
    })

    it('MISSING_GENDER', async () => {
      await testGqlError({ messageCode: 'MISSING_GENDER' })
    })

    it('MISSING_LOCATION', async () => {
      await testGqlError({ messageCode: 'MISSING_LOCATION' })
    })

    it('MISSING_HEIGHT', async () => {
      await testGqlError({ messageCode: 'MISSING_HEIGHT' })
    })

    it('MISSING_MATCH_AGE_RANGE', async () => {
      await testGqlError({ messageCode: 'MISSING_MATCH_AGE_RANGE' })
    })

    it('MISSING_MATCH_GENDERS', async () => {
      await testGqlError({ messageCode: 'MISSING_MATCH_GENDERS' })
    })

    it('MISSING_MATCH_HEIGHT_RANGE', async () => {
      await testGqlError({ messageCode: 'MISSING_MATCH_HEIGHT_RANGE' })
    })

    it('MISSING_MATCH_LOCATION_RADIUS', async () => {
      await testGqlError({ messageCode: 'MISSING_MATCH_LOCATION_RADIUS' })
    })

    it('WRONG_AGE_MIN', async () => {
      await testGqlError({ messageCode: 'WRONG_AGE_MIN' })
    })

    it('WRONG_AGE_MAX', async () => {
      await testGqlError({ messageCode: 'WRONG_AGE_MAX' })
    })

    it('WRONG_THREE_HOUR_PERIOD', async () => {
      await testGqlError({ messageCode: 'WRONG_THREE_HOUR_PERIOD' })
    })
  })
})
