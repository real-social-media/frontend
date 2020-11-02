import * as Sentry from '@sentry/react-native'
// import { Debug } from '@sentry/integrations'
import Config from 'react-native-config'
import pick from 'ramda/src/pick'
import codePush from 'react-native-code-push' 
 
/**
 * By including and configuring Sentry, the SDK will automatically attach global handlers
 * to capture uncaught exceptions and unhandled rejections.
 */
const integrations = Config.ENVIRONMENT === 'development' ? [
  // new Debug(),
] : []

Sentry.init({
  environment: Config.ENVIRONMENT,
  dsn: Config.SENTRY_DSN,
  integrations,
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


/**
 * Application version + code push version to distinguish environment
 */
codePush.getUpdateMetadata().then((update) => {
  if (update) {
    Sentry.setRelease(update.appVersion + '-codepush:' + update.label)
  }
}) 

export const withScope = Sentry.withScope