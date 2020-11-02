import * as Validation from 'services/Validation'
import { repeat, join, times } from 'ramda'
import API from '@aws-amplify/api'
import * as usersQueries from 'store/ducks/users/queries'

jest.mock('@aws-amplify/api', () => ({
  graphql: jest.fn().mockResolvedValue({ data: { usernameStatus: 'AVAILABLE' } }),
  graphqlOperation: jest.fn().mockResolvedValue(true),
}))

describe('Validation service', () => {
  afterEach(() => {
    API.graphql.mockClear()
    API.graphqlOperation.mockClear()
  })

  it('username', async () => {
    expect(await Validation.username.isValid(undefined)).toBeFalsy()
    expect(await Validation.username.isValid('')).toBeFalsy()
    expect(await Validation.username.isValid('1')).toBeFalsy()
    expect(await Validation.username.isValid('12')).toBeFalsy()
    expect(await Validation.username.isValid('123')).toBeTruthy()
    expect(await Validation.username.isValid(join('', repeat('a', 50)))).toBeTruthy()
    expect(await Validation.username.isValid(join('', repeat('a', 51)))).toBeFalsy()
    expect(await Validation.username.isValid('abc123')).toBeTruthy()
    expect(await Validation.username.isValid('abc123!@#$%')).toBeFalsy()
    expect(await Validation.username.cast(' trim ')).toBe('trim')
  })

  it('usernameStatusRequest', async () => {
    const username = 'username'
    await Validation.usernameStatusRequest(username)
    expect(API.graphql).toHaveBeenCalled()
    expect(API.graphqlOperation).toHaveBeenCalledWith(usersQueries.usernameStatus, { username })
  })

  describe('remoteUsernameValidation', () => {
    it('success', async () => {
      API.graphql.mockResolvedValue({ data: { usernameStatus: 'AVAILABLE' } })

      const value = 'value'
      const validate = Validation.remoteUsernameValidation()
      const results = await Promise.all(times(() => validate(value), 10))

      expect(results).toEqual([
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
      ])
      expect(API.graphql).toHaveBeenCalledTimes(2)
    })

    it('not available', async () => {
      API.graphql.mockResolvedValue({ data: { usernameStatus: 'NOT_AVAILABLE' } })

      const value = 'value'
      const validate = Validation.remoteUsernameValidation()
      const results = await Promise.all(times(() => validate(value), 10))

      expect(results).toEqual([
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        false,
      ])
      expect(API.graphql).toHaveBeenCalledTimes(2)
    })

    it('not reject an error on failure request', async () => {
      API.graphql.mockRejectedValue(false)

      const value = 'value'
      const validate = Validation.remoteUsernameValidation()
      const results = await Promise.all(times(() => validate(value), 10))

      expect(results).toEqual([
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
      ])
      expect(API.graphql).toHaveBeenCalledTimes(2)
    })
  })
})
