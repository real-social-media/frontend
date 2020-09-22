import { errorWrapper } from 'store/helpers'

describe('Store helpers', () => {
  describe('errorWrapper', () => {
    it('handle native error', () => {
      const error = new Error('Error')
      expect(errorWrapper(error)).toBe(error.message)
      expect(errorWrapper(new Error(''))).toBeUndefined()
    })

    it('handle graphql api errors', () => {
      const errors = ['1', '2']
      const graphqlError = { errors }

      expect(errorWrapper(graphqlError)).toBe(errors)
    })
  })
})
