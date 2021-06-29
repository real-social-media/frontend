import * as Sentry from '@sentry/react-native'
import Config from 'react-native-config'
import pick from 'ramda/src/pick'
import { Platform } from 'react-native'
import { getReadableVersion } from 'services/OTA'

Sentry.init({
  environment: Config.ENVIRONMENT,
  dsn: Config.SENTRY_DSN,
  release: `real:${Platform.OS}@${getReadableVersion()}`,
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
export const captureMessage = (message) => {
  try {
    Sentry.captureMessage(message)
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

export const clearScope = () => {
  Sentry.configureScope((scope) => scope.clear())
}

export const withScope = Sentry.withScope
