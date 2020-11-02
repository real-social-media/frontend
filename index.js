import './wdyr'
import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import 'services/Logger'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { AppRegistry, Text, TextInput } from 'react-native'
import { enableScreens } from 'react-native-screens'
import App from './App'
import { name as appName } from './app.json'
import { amplifyConfig } from 'services/AWS'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

console.disableYellowBox = true

enableScreens()
amplifyConfig()
dayjs.extend(relativeTime)

if (Text.defaultProps == null) {
  Text.defaultProps = Text.defaultProps || {}
  Text.defaultProps.allowFontScaling = false
  
  TextInput.defaultProps = TextInput.defaultProps || {}
  TextInput.defaultProps.allowFontScaling = false
}

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App))