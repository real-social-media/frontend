import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { StatusBar, Text, TextInput } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from 'services/providers/Auth'
import { Provider as PaperProvider } from 'react-native-paper'
import { ThemesContext } from 'navigation/context'
import AuthNavigator from 'navigation/AuthNavigator'
import AppNavigator from 'navigation/AppNavigator'
import store, { persistor } from 'store/index'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'services/Logger'
import { enableScreens } from 'react-native-screens'
import PinchZoomComponent from 'components/Feed/PinchZoom'
import FeedContextComponent from 'components/Feed/Context'
import ErrorTemplate from 'templates/Error'

const linking = {
  prefixes: ['real.app://', 'https://real.app/'],
  config: {
    AuthEmailConfirm: 'confirm/email/:userId/:confirmationCode',
    AuthForgotConfirm: 'confirm/forgot/:userId/:confirmationCode',
    Chat: {
      screens: {
        Chat: 'chat',
        ChatDirect: 'chat/:chatId',
      },
    },
    Root: {
      screens: {
        Profile: 'user/:userId',
        PostMedia: 'user/:userId/post/:postId',
        Comments: 'user/:userId/post/:postId/comments',
      },
    },
  },
}

enableScreens()

dayjs.extend(relativeTime)

if (Text.defaultProps == null) {
  Text.defaultProps = Text.defaultProps || {}
  Text.defaultProps.allowFontScaling = false
  
  TextInput.defaultProps = TextInput.defaultProps || {}
  TextInput.defaultProps.allowFontScaling = false
}

const Routes = ({
  authenticated,
  appErrorMessage,
  handleErrorClose,
}) => {
  const { theme, themes } = useContext(ThemesContext)

  return (
    <NavigationContainer theme={theme} linking={linking}>
      {!authenticated ?
        <PaperProvider theme={themes[0].theme}>
          {appErrorMessage ?
            <ErrorTemplate text={appErrorMessage} onClose={handleErrorClose} />
          : null}
          <AuthNavigator />
        </PaperProvider>
      : null}

      {authenticated ?
        <PaperProvider theme={theme}>
          {appErrorMessage ?
            <ErrorTemplate text={appErrorMessage} onClose={handleErrorClose} />
          : null}

          <AppNavigator themes={themes} />
        </PaperProvider>
      : null}
    </NavigationContainer>
  )
}

Routes.propTypes = {
  authenticated: PropTypes.any,
  appErrorMessage: PropTypes.any,
  handleErrorClose: PropTypes.any,
}

const App = () => {
  const [draggedImage, setDraggedImage] = useState({})

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          {({
            theme,
            themes,
            authenticated,
            appErrorMessage,
            handleErrorClose,
          }) => (
            <ThemesContext.Provider value={{ theme, themes }}>
              <FeedContextComponent.Provider value={{ draggedImage, setDraggedImage }}>
                <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
                <PinchZoomComponent />
                <Routes
                  authenticated={authenticated}
                  appErrorMessage={appErrorMessage}
                  handleErrorClose={handleErrorClose}
                />
              </FeedContextComponent.Provider>
            </ThemesContext.Provider>
          )}
        </AuthProvider>
      </PersistGate>
    </Provider>
  )
}

export default App