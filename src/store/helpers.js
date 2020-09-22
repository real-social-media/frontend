import path from 'ramda/src/path'

export const errorWrapper = (error) => {
  /**
   * basic error object handling
   */
  const errorMessage = path(['message'])(error)
  if (typeof errorMessage === 'string' && errorMessage.length) {
    return errorMessage
  }

  /**
   * graphql api errors
   */
  const errorGraphql = path(['errors'])(error)
  if (Array.isArray(errorGraphql) && errorGraphql.length) {
    return errorGraphql
  }
}
