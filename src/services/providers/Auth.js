import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as themeActions from 'store/ducks/theme/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as translationActions from 'store/ducks/translation/actions'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import path from 'ramda/src/path'
import * as Updates from 'services/Updates'
import useAppState from 'services/AppState'
import LoadingComponent from 'components/Loading'

/**
 * 
 */
export const AuthProvider = ({
  children,
}) => {
  const dispatch = useDispatch()
  const userId = useSelector(authSelector.authUserIdSelector)
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const nextRoute = useSelector(state => state.auth.authCheck.nextRoute)
  const status = useSelector(state => state.auth.authCheck.status)
  const translationFetch = useSelector(state => state.translation.translationFetch)
  const languageCode = useSelector(authSelector.languageCodeSelector)
  const theme = useSelector(authSelector.themeSelector)
  const authGoogle = useSelector(state => state.auth.authGoogle)
  const authApple = useSelector(state => state.auth.authApple)

  const errorsPool = [{
    appErrorMessage: authGoogle.error.text,
    handleErrorClose: () => dispatch(authActions.authGoogleIdle()),
  }, {
    appErrorMessage: authApple.error.text,
    handleErrorClose: () => dispatch(authActions.authAppleIdle()),
  }]
  const { appErrorMessage, handleErrorClose } = errorsPool
    .filter(error => error.appErrorMessage && !error.appErrorMessage.length)
    .pop() || {}
  
  /**
   * Constructor function to fetch: Translations, Themes and Auth data
   */
  useEffect(() => {
    dispatch(themeActions.themeFetchRequest())
    dispatch(translationActions.translationFetchRequest())
    dispatch(authActions.authCheckRequest({ type: 'FIRST_MOUNT' }))
  }, [])


  useEffect(() => {
    if (userId) {
      dispatch(subscriptionsActions.subscriptionsMainRequest())
      dispatch(subscriptionsActions.subscriptionsPollRequest())
    }
  }, [userId])

  /**
   * Application version check handler, which forces users to update
   * the app if new build is available
   */
  useAppState({
    onForeground: () => {
      dispatch(authActions.authCheckRequest({ type: 'STATE_CHANGE' }))
      Updates.versionCheck()

      if (userId) {
        dispatch(subscriptionsActions.subscriptionsMainRequest())
        dispatch(subscriptionsActions.subscriptionsPollRequest())
      }
    },
    onBackground: () => {
      if (userId) {
        dispatch(subscriptionsActions.subscriptionsMainIdle())
        dispatch(subscriptionsActions.subscriptionsPollIdle())
      }
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

  if (
    !path(['data', 'en'])(translationFetch) ||
    !path(['data', 'length'])(themeFetch) ||
    !nextRoute
  ) {
    return <LoadingComponent />
  }

  const authenticated = (
    userId && (
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
    appErrorMessage,
    handleErrorClose,
  })
}