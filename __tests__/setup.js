import 'tests/mocks/i18n.mock'
import 'tests/mocks/async-storage'
import 'tests/mocks/react-native-fs'
import 'tests/mocks/react-native-device-info'
import 'tests/mocks/react-native-permissions'
import 'tests/mocks/react-native-contacts'
import 'tests/mocks/react-native-localize'
import 'tests/mocks/react-native-offline'
import 'tests/mocks/node-forge'
import 'tests/mocks/logger'
import 'tests/mocks/Analytics'

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')
jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform')
  Platform.constants.reactNativeVersion = { major: 0, minor: 64, patch: 0 }
  return Platform
})
