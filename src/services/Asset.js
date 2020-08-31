import RNFS from 'react-native-fs'

const generateAssetSource = (assetSource) => {
  if (assetSource && assetSource.includes('ph://')) {
    return assetSource
  }
  return `ph://${assetSource}`
}

const generateAssetFormat = (extension) => {
  if (extension && extension.includes('HEIC')) {
    return 'HEIC'
  }
  return 'JPEG'
}

const generateAssetDestination = (assetSource, assetFilename) => {
  const filename = Math.random().toString(36).substring(7)
  const extension = assetFilename.split('?')[0].split('#')[0].split('.').pop()
  return {
    filename,
    extension,
    path: `${RNFS.TemporaryDirectoryPath}${filename}.${extension}`,
  }
}

export const getAssetFileAbsolutePath = async (assetSource, assetFilename) => {
  const source = generateAssetSource(assetSource)
  const asset = generateAssetDestination(assetSource, assetFilename)
  const format = generateAssetFormat(asset.extension)
  const path = await RNFS.copyAssetsFileIOS(source, asset.path, 0, 0)

  return {
    path,
    format,
    filename: asset.filename,
    extension: asset.extension,
  }
}

export const generateCroppedCoordinates = (cropRect) => ({
  lowerRight: { x: cropRect.x + cropRect.width, y: cropRect.y + cropRect.height },
  upperLeft: { x: cropRect.x, y: cropRect.y },
})
