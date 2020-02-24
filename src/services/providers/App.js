import React, { useEffect } from 'react'
import { AppState } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
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
import LoadingComponent from 'components/Loading'
import BackgroundTimer from 'react-native-background-timer'

/**
 * 
 */
export const AuthProvider = ({
  children,
}) => {
  const dispatch = useDispatch()
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const nextRoute = useSelector(state => state.auth.authCheck.nextRoute)
  const authUserId = useSelector(state => state.auth.user.userId)
  const translationFetch = useSelector(state => state.translation.translationFetch)
  const languageCode = useSelector(authSelector.languageCodeSelector)
  const theme = useSelector(authSelector.themeSelector)

  const user = useSelector(
    authSelector.authUserSelector,
    (prevProps, nextProps) => prevProps.userId === nextProps.userId
  )

  const authCheckRequest = (payload) =>
    dispatch(authActions.authCheckRequest(payload))
  const themeFetchRequest = (payload) =>
    dispatch(themeActions.themeFetchRequest(payload))
  const translationFetchRequest = (payload) =>
    dispatch(translationActions.translationFetchRequest(payload))

  /**
   * 
   */
  // useEffect(() => {
  //   BackgroundTimer.runBackgroundTimer(() => { 
  //     dispatch(postsActions.postsCreateSchedulerRequest({}))
  //   }, 60000 * 10)
  // }, [])

  /**
   * Constructor function to fetch: Translations, Themes and Auth data
   */
  useEffect(() => {
    themeFetchRequest({})
    translationFetchRequest({})
    authCheckRequest({})
  }, [])

  /**
   * Application version check handler, which forces users to update
   * the app if new build is available
   */
  useEffect(() => {
    Updates.versionCheck()
    const appStateListener = (nextAppState) => {
      if (nextAppState === 'active') {
        authCheckRequest({})
        Updates.versionCheck()
      }
    }
    AppState.addEventListener('change', appStateListener)
    return () => {
      AppState.removeEventListener('change', appStateListener)
    }
  }, [])

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

  if (
    !path(['data', 'en'])(translationFetch) ||
    !path(['data', 'length'])(themeFetch)
  ) {
    return <LoadingComponent />
  }

  return children({
    initialRouteName: nextRoute,
    theme,
    authenticated: authUserId,
  })
}