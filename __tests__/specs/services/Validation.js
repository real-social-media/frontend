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

  describe('Selectors', () => {
    it('getPhone', () => {
      expect(Validation.getPhone({})).toBe('')
      expect(Validation.getPhone({ phone: ' 1232WDEWE4234 ' })).toBe('12324234')
    })

    it('getCountryCode', () => {
      expect(Validation.getCountryCode({})).toBe('+1')
      expect(Validation.getCountryCode({ countryCode: ' Wcsw2 ' })).toBe('2')
    })

    it('getEmail', () => {
      expect(Validation.getEmail({})).toBe('')
      expect(Validation.getEmail({ email: ' VAlid@mail.com ' })).toBe('valid@mail.com')
    })

    it('getUsername', () => {
      expect(Validation.getUsername({})).toBe('')
      expect(Validation.getUsername({ username: ' useRname ' })).toBe('username')
    })

    it('getPassword', () => {
      expect(Validation.getPassword({})).toBe('')
      expect(Validation.getPassword({ password: ' passWord ' })).toBe('passWord')
    })

    it('getConfirmationCode', () => {
      expect(Validation.getConfirmationCode({})).toBe('')
      expect(Validation.getConfirmationCode({ confirmationCode: ' coDe123 ' })).toBe('123')
    })
  })

  describe('Validators', () => {
    it('height', async () => {
      expect(await Validation.height.isValid(undefined)).toBeFalsy()
      expect(await Validation.height.isValid('')).toBeFalsy()
      expect(await Validation.height.isValid(-1)).toBeFalsy()
      expect(await Validation.height.isValid(0)).toBeFalsy()
      expect(await Validation.height.isValid(1)).toBeTruthy()
      expect(await Validation.height.isValid(84)).toBeTruthy()
      expect(await Validation.height.isValid(85)).toBeFalsy()
    })

    it('payment', async () => {
      expect(await Validation.payment.isValid(undefined)).toBeTruthy()
      expect(await Validation.payment.isValid('dsf')).toBeFalsy()
      expect(await Validation.payment.isValid(-1)).toBeFalsy()
      expect(await Validation.payment.isValid(0)).toBeTruthy()
      expect(await Validation.payment.isValid(1)).toBeTruthy()
      expect(await Validation.payment.isValid(1.2)).toBeTruthy()
      expect(await Validation.payment.isValid(100)).toBeTruthy()
      expect(await Validation.payment.isValid(101)).toBeFalsy()
    })

    it('email', async () => {
      expect(await Validation.email.isValid(undefined)).toBeFalsy()
      expect(await Validation.email.isValid('')).toBeFalsy()
      expect(await Validation.email.isValid('1')).toBeFalsy()
      expect(await Validation.email.isValid('12')).toBeFalsy()
      expect(await Validation.email.isValid('valid@mail.com')).toBeTruthy()
      expect(await Validation.email.cast(' trim ')).toBe('trim')
      expect(await Validation.email.isValid('with white space@mail.com')).toBeFalsy()
    })

    it('password', async () => {
      expect(await Validation.password.isValid(undefined)).toBeFalsy()
      expect(await Validation.password.isValid('')).toBeFalsy()
      expect(await Validation.password.isValid('1')).toBeFalsy()
      expect(await Validation.password.isValid('1234567')).toBeFalsy()
      expect(await Validation.password.isValid('12345678')).toBeTruthy()
      expect(await Validation.password.cast(' trim ')).toBe('trim')
    })

    it('confirmationCode', async () => {
      expect(await Validation.confirmationCode.isValid(undefined)).toBeFalsy()
      expect(await Validation.confirmationCode.isValid('')).toBeFalsy()
      expect(await Validation.confirmationCode.isValid('1')).toBeFalsy()
      expect(await Validation.confirmationCode.isValid('12345')).toBeFalsy()
      expect(await Validation.confirmationCode.isValid('1234567')).toBeFalsy()
      expect(await Validation.confirmationCode.isValid('123456')).toBeTruthy()
      expect(await Validation.confirmationCode.isValid('12a456')).toBeFalsy()
      expect(await Validation.confirmationCode.cast(' trim ')).toBe('trim')
    })

    it('phone', async () => {
      expect(await Validation.phone.isValid(undefined)).toBeTruthy()
      expect(await Validation.phone.isValid('')).toBeFalsy()
      expect(await Validation.phone.isValid('1')).toBeFalsy()
      expect(await Validation.phone.isValid('12')).toBeFalsy()
      expect(await Validation.phone.isValid('123sfsdfds')).toBeFalsy()
      expect(await Validation.phone.isValid('123')).toBeTruthy()
      expect(await Validation.phone.isValid(join('', repeat('1', 50)))).toBeTruthy()
      expect(await Validation.phone.isValid(join('', repeat('1', 51)))).toBeFalsy()
      expect(await Validation.phone.isValid('123456789')).toBeTruthy()
      expect(await Validation.phone.cast(' trim ')).toBe('trim')
    })

    it('phoneOrEmail', async () => {
      expect(await Validation.phoneOrEmail.isValid(undefined)).toBeFalsy()
      expect(await Validation.phoneOrEmail.isValid('')).toBeFalsy()
      expect(await Validation.phoneOrEmail.isValid('1')).toBeFalsy()
      expect(await Validation.phoneOrEmail.isValid('12')).toBeFalsy()
      expect(await Validation.phoneOrEmail.isValid('123')).toBeTruthy()
      expect(await Validation.phoneOrEmail.isValid(join('', repeat('1', 50)))).toBeTruthy()
      expect(await Validation.phoneOrEmail.isValid(join('', repeat('1', 51)))).toBeFalsy()
      expect(await Validation.phoneOrEmail.isValid('123456789')).toBeTruthy()
      expect(await Validation.phoneOrEmail.cast(' trim ')).toBe('trim')
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

    it('dateOfBirthMonth', async () => {
      expect(await Validation.dateOfBirthMonth.isValid(undefined)).toBeFalsy()
      expect(await Validation.dateOfBirthMonth.isValid('abc')).toBeFalsy()
      expect(await Validation.dateOfBirthMonth.isValid(-1)).toBeFalsy()
      expect(await Validation.dateOfBirthMonth.isValid(11)).toBeTruthy()
    })

    it('dateOfBirthDay', async () => {
      expect(await Validation.dateOfBirthDay.isValid(undefined)).toBeFalsy()
      expect(await Validation.dateOfBirthDay.isValid('abc')).toBeFalsy()
      expect(await Validation.dateOfBirthDay.isValid(-1)).toBeFalsy()
      expect(await Validation.dateOfBirthDay.isValid(11)).toBeTruthy()
    })

    it('dateOfBirthYear', async () => {
      expect(await Validation.dateOfBirthYear.isValid(undefined)).toBeFalsy()
      expect(await Validation.dateOfBirthYear.isValid('abc')).toBeFalsy()
      expect(await Validation.dateOfBirthYear.isValid(-1)).toBeFalsy()
      expect(await Validation.dateOfBirthYear.isValid(2020)).toBeTruthy()
    })

    it('gender', async () => {
      expect(await Validation.gender.isValid(undefined)).toBeFalsy()
      expect(await Validation.gender.isValid('Female')).toBeTruthy()
    })

    it('fullName', async () => {
      expect(await Validation.fullName.isValid(undefined)).toBeTruthy()
      expect(await Validation.fullName.isValid('Test Fullname')).toBeTruthy()
    })

    it('displayName', async () => {
      expect(await Validation.displayName.isValid(undefined)).toBeFalsy()
      expect(await Validation.displayName.isValid('Test displayName')).toBeTruthy()
    })

    it('bio', async () => {
      expect(await Validation.bio.isValid(undefined)).toBeTruthy()
      expect(await Validation.bio.isValid('Test Bio')).toBeTruthy()
    })

    it('matchAgeRangeMin', async () => {
      expect(await Validation.matchAgeRangeMin.isValid(undefined)).toBeFalsy()
      expect(await Validation.matchAgeRangeMin.isValid('abc')).toBeFalsy()
      expect(await Validation.matchAgeRangeMin.isValid(-1)).toBeFalsy()
      expect(await Validation.matchAgeRangeMin.isValid(20)).toBeTruthy()
    })

    it('matchAgeRangeMax', async () => {
      expect(await Validation.matchAgeRangeMax.isValid(undefined)).toBeFalsy()
      expect(await Validation.matchAgeRangeMax.isValid('abc')).toBeFalsy()
      expect(await Validation.matchAgeRangeMax.isValid(-1)).toBeFalsy()
      expect(await Validation.matchAgeRangeMax.isValid(30)).toBeTruthy()
    })

    it('matchLocationRadius', async () => {
      expect(await Validation.matchLocationRadius.isValid(undefined)).toBeFalsy()
      expect(await Validation.matchLocationRadius.isValid('abc')).toBeFalsy()
      expect(await Validation.matchLocationRadius.isValid(-1)).toBeFalsy()
      expect(await Validation.matchLocationRadius.isValid(15)).toBeTruthy()
    })

    it('matchGenders', async () => {
      expect(await Validation.matchGenders.isValid(undefined)).toBeFalsy()
      expect(await Validation.matchGenders.isValid('abc')).toBeTruthy()
    })
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

  describe('Input props', () => {
    it('default', () => {
      expect(Validation.getInputTypeProps(undefined)).toEqual({})
    })

    it('email', () => {
      expect(Validation.getInputTypeProps('email')).toEqual({
        accessibilityLabel: 'email',
        keyboardType: 'email-address',
        textContentType: 'emailAddress',
        autoCompleteType: 'email',
      })
    })

    it('payment', () => {
      expect(Validation.getInputTypeProps('payment')).toEqual({
        accessibilityLabel: 'payment',
        keyboardType: 'decimal-pad',
        autoCompleteType: 'off',
      })
    })

    it('confirmationCode', () => {
      expect(Validation.getInputTypeProps('confirmationCode')).toEqual({
        accessibilityLabel: 'confirmationCode',
        keyboardType: 'number-pad',
        textContentType: 'oneTimeCode',
        autoCompleteType: 'off',
        maxLength: 6,
      })
    })

    it('password', () => {
      expect(Validation.getInputTypeProps('password')).toEqual({
        accessibilityLabel: 'password',
        secureTextEntry: true,
        keyboardType: 'default',
        textContentType: 'password',
        autoCompleteType: 'password',
      })
    })

    it('username', () => {
      expect(Validation.getInputTypeProps('username')).toEqual({
        accessibilityLabel: 'username',
        keyboardType: 'ascii-capable',
        textContentType: 'username',
        autoCompleteType: 'username',
      })
    })
  })
})
