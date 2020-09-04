import * as Sentry from '@sentry/react-native'
import Config from 'react-native-config'
import pick from 'ramda/src/pick'

/**
 * By including and configuring Sentry, the SDK will automatically attach global handlers
 * to capture uncaught exceptions and unhandled rejections.
 */
Sentry.init({
  environment: Config.ENVIRONMENT,
  dsn: Config.SENTRY_DSN,
})

/**
 * Used for Error object 
 */
export const captureException = (error) => {
  try {
    Sentry.captureException(error)
  } catch (error) {
    // ignore
  }
}

/**
 * Used for strings
 */
export const captureMessage = (error) => {
  try {
    Sentry.captureMessage(error)
  } catch (error) {
    // ignore
  }
}

/**
 * Attach user to error log
 */
export const setUser = (payload) => {
  const user = pick(['id', 'username', 'email'], payload)
  Sentry.setUser(user)
}

export const withScope = Sentry.withScope