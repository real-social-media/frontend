import { Linking, Alert } from 'react-native'
import { getReadableVersion } from 'react-native-device-info'
import Config from 'react-native-config'

export const versionCheck = (async () => {
  try {
    if (Config.ENVIRONMENT !== 'production') { return }

    const isNeeded = !getReadableVersion().includes('1.1.0')

    if (isNeeded) {
      Alert.alert(
        'App Update Available',
        'Please update REAL to continue proceeding',
        [{
          text: 'Done',
          onPress: () => Linking.openURL('https://apps.apple.com/us/app/real-social-media/id1485194570?ls=1').catch(console.log),
          style: 'cancel',
        }],
        { cancelable: false },
      )
    }
  } catch (error) {
  }
})