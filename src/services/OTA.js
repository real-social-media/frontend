import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import codePush from 'react-native-code-push'
import DeviceInfo from 'react-native-device-info'
import * as Logger from 'services/Logger'

export function getReadableVersion() {
  return Platform.OS === 'web' ? process.env.version : DeviceInfo.getReadableVersion()
}

async function getOTAVersion() {
  try {
    const update = await codePush.getUpdateMetadata()

    return update ? update.label : null
  } catch (error) {
    Logger.captureException(error)
    return null
  }
}

export function useOTAVersion() {
  const [appVersion, setAppVersion] = useState(getReadableVersion())

  useEffect(() => {
    getOTAVersion().then((OTAVersion) => {
      if (OTAVersion) {
        setAppVersion(`${appVersion}/${OTAVersion}`)
      }
    })
  }, [])

  return { appVersion }
}
