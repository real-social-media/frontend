import React from 'react'
import { StatusBar, Text, TextInput } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from 'services/providers/App'
import { Provider as PaperProvider } from 'react-native-paper'
import codePush from 'react-native-code-push'
import AppNavigator from 'navigation/AppNavigator'
import store from 'store/index'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'services/Logger'
import Config from 'react-native-config'
import { enableScreens } from 'react-native-screens'

enableScreens()

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  deploymentKey: Config.CODE_PUSH_DEPLOYMENT_KEY,
  codePushStatusDidChange,
  codePushDownloadDidProgress,
}

codePush.sync(codePushOptions)

const codePushStatusDidChange = (syncStatus) => {
  if (syncStatus === codePush.SyncStatus.INSTALLING_UPDATE) {
  } else {
  }
}

const codePushDownloadDidProgress = () => {
}

dayjs.extend(relativeTime)

if (Text.defaultProps == null) {
  Text.defaultProps = Text.defaultProps || {}
  Text.defaultProps.allowFontScaling = false
  
  TextInput.defaultProps = TextInput.defaultProps || {}
  TextInput.defaultProps.allowFontScaling = false
}

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      {({ initialRouteName, theme }) => (
        <PaperProvider theme={theme}>
          <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <AppNavigator
              initialRouteName={initialRouteName}
              theme={theme}
            />
          </NavigationContainer>
        </PaperProvider>
      )}
    </AuthProvider>
  </Provider>
)

export default codePush(codePushOptions)(App)