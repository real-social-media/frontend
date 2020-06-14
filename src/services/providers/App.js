import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as uiActions from 'store/ducks/ui/actions'
import * as themeActions from 'store/ducks/theme/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as translationActions from 'store/ducks/translation/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import path from 'ramda/src/path'
import * as Logger from 'services/Logger'
import * as Updates from 'services/Updates'
import useAppState from 'services/AppState'
import LoadingComponent from 'components/Loading'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

/**
 * 
 */
export const AuthProvider = ({
  children,
}) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const nextRoute = useSelector(state => state.auth.authCheck.nextRoute)
  const status = useSelector(state => state.auth.authCheck.status)
  const translationFetch = useSelector(state => state.translation.translationFetch)
  const languageCode = useSelector(authSelector.languageCodeSelector)
  const theme = useSelector(authSelector.themeSelector)
  const uiNotifications = useSelector(state => state.ui.notifications)
  const authGoogle = useSelector(state => state.auth.authGoogle)
  const authCheck = useSelector(state => state.auth.authCheck)

  const postsDelete = useSelector(state => state.posts.postsDelete)
  const postsArchive = useSelector(state => state.posts.postsArchive)
  const postsRestoreArchived = useSelector(state => state.posts.postsRestoreArchived)
  const postsFlag = useSelector(state => state.posts.postsFlag)

  const errorsPool = [{
    appErrorMessage: authGoogle.error.text,
    handleErrorClose: () => dispatch(authActions.authGoogleIdle()),
  }, {
    appErrorMessage: authCheck.error.text,
    handleErrorClose: () => dispatch(authActions.authCheckIdle()),
  }]
  const { appErrorMessage, handleErrorClose } = errorsPool
    .filter(error => error.appErrorMessage && !error.appErrorMessage.includes('Failed to authorize'))
    .pop() || {}

  const uiNotificationIdle = (payload) =>
    dispatch(uiActions.uiNotificationIdle(payload))
  
  /**
   * Constructor function to fetch: Translations, Themes and Auth data
   */
  useEffect(() => {
    PushNotificationIOS.addEventListener('register', (token) => {
      dispatch(usersActions.usersSetApnsTokenRequest({ token }))
    })
    PushNotificationIOS.requestPermissions()

    dispatch(themeActions.themeFetchRequest())
    dispatch(translationActions.translationFetchRequest())
    dispatch(authActions.authCheckRequest())
    dispatch(usersActions.usersGetCardsRequest({}))
    dispatch(postsActions.postsGetUnreadCommentsRequest({ limit: 20 }))
  }, [])

  /**
   * Application version check handler, which forces users to update
   * the app if new build is available
   */
  useAppState({
    onForeground: () => {
      dispatch(authActions.authCheckRequest())
      dispatch(postsActions.postsCreateSchedulerRequest())
      dispatch(postsActions.postsFeedGetRequest({ limit: 20 }))
      Updates.versionCheck()
    },
  })

  /**
   * Translation library setup, translationFetch.data is an object of:
   * {
   *   en: { translation: { [key]: value, [key]: value } },
   *   de: { translation: { [key]: value, [key]: value } },
   * }
   */
  useEffect(() => {
    i18n
    .use(initReactI18next)
    .init({
      resources: translationFetch.data,
      lng: languageCode || 'en',
      fallbackLng: 'en',
    })
  }, [
    path(['data', 'length'])(translationFetch),
    languageCode,
  ])

  /**
   * Sentry specific logger to map partial user data to error log
   */
  useEffect(() => {
    Logger.setUser(user)
  }, [path(['userId'])(user)])

  useEffect(() => {
    if (postsDelete.status === 'success') {
      dispatch(postsActions.postsDeleteIdle())
    }

    if (postsArchive.status === 'success') {
      dispatch(postsActions.postsArchiveIdle())
    }

    if (postsRestoreArchived.status === 'success') {
      dispatch(postsActions.postsRestoreArchivedIdle())
    }

    if (postsFlag.status === 'success') {
      dispatch(postsActions.postsFlagIdle())
    }
  }, [
    postsDelete.status,
    postsArchive.status,
    postsRestoreArchived.status,
    postsFlag.status,
  ])

  if (
    !path(['data', 'en'])(translationFetch) ||
    !path(['data', 'length'])(themeFetch) ||
    !nextRoute
  ) {
    return <LoadingComponent />
  }

  const authenticated = (
    user.userId && (
      nextRoute === null ||
      nextRoute === 'Root'
    ) && (
      status !== 'failure'
    )
  )

  return children({
    theme,
    themes: themeFetch.data,
    authenticated,
    uiNotifications,
    uiNotificationIdle,
    appErrorMessage,
    handleErrorClose,
  })
}