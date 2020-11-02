import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from 'services/providers/Auth'
import { AppProvider } from 'services/providers/App'
import { ThemeProvider } from 'services/providers/Theme'
import { ReduxNetworkProvider } from 'react-native-offline'
import initializeStore from 'store/index'
import codePush from 'react-native-code-push' 
import Config from 'react-native-config' 
import LoadingComponent from 'components/Loading'
import linking from 'navigation/linking'
import Router from 'navigation/Router'

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  deploymentKey: Config.CODE_PUSH_DEPLOYMENT_KEY,
}

// codePush.sync(codePushOptions)

const Application = (navigationProps) => {
  const { store, persistor } = useMemo(() => initializeStore({ navigationRef: navigationProps.navigationRef }), [])

  return (
    <Provider store={store}>
      <ReduxNetworkProvider>
        <PersistGate loading={(<LoadingComponent />)} persistor={persistor}>
          <AppProvider {...navigationProps}>
            <AuthProvider>
              <ThemeProvider>
                <Router navigationRef={navigationProps.navigationRef} />
              </ThemeProvider>
            </AuthProvider>
          </AppProvider>
        </PersistGate>
      </ReduxNetworkProvider>
    </Provider>
  )
}

const WithNavigationContainer = () => {
  const navigationRef = useRef(null)
  const onStateChangeRef = useRef(null)
  const routeNameRef = useRef(null)

  const [navigationReady, setNavigationReady] = useState(false)
  const setMounted = () => setNavigationReady(true)
  const setUnmounted = () => setNavigationReady(false)
  const onStateChange = () => onStateChangeRef.current && onStateChangeRef.current()
  useEffect(() => setUnmounted, [])

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={setMounted}
      onStateChange={onStateChange}
      linking={linking}
    >
      {navigationReady ?
        <Application
          navigationRef={navigationRef}
          onStateChangeRef={onStateChangeRef}
          routeNameRef={routeNameRef}
        />
      : null}
    </NavigationContainer>
  )
}

export default codePush(codePushOptions)(WithNavigationContainer)