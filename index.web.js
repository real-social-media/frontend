import 'services/Logger'
import 'services/Translation'
import { AppRegistry } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import App from './App'

import { name as appName } from './app.json'
import { amplifyConfig } from 'services/AWS'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

amplifyConfig()
dayjs.extend(relativeTime)

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App))
AppRegistry.runApplication(appName, { rootTag: document.getElementById('react-native-app') })
