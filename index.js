import './wdyr';
import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import { enableScreens } from 'react-native-screens'
import App from './App'
import { name as appName } from './app.json'
import { amplifyConfig } from 'services/AWS'

enableScreens()
amplifyConfig()

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App))
