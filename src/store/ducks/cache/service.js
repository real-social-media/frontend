import RNFS from 'react-native-fs'
import priorityQueue from 'async/priorityQueue'

/**
 * 
 */
export const checkLocalImage = async (path) => {
  return await RNFS.exists(path)
}

export const stopRemoteImage = async (jobId) => {
  return await RNFS.exists(jobId)
}

/**
 * 
 */
export const fetchRemoteImage = async ({
  signature,
  progressCallback,
  requestCallback,
  failureCallback,
  successCallback,
}, callback) => {
  await RNFS.mkdir(signature.pathFolder)

  const { promise, jobId } = RNFS.downloadFile({
    fromUrl: signature.source,
    toFile: signature.path,
    background: true,
    discretionary: false,
    cacheable: false,
    readTimeout: 20000,
    backgroundTimeout: 20000,
    progressDivider: 10,
    resumable: () =>
      RNFS.isResumable(jobId).then(() => RNFS.resumeDownload(jobId)),
    begin: requestCallback,
    progress: progressCallback,
  })

  try {
    const response = await promise
    await RNFS.completeHandlerIOS(jobId)

    if (response.statusCode !== 200) {
      throw new Error(`http error ${response.statusCode}`)
    }

    return successCallback({
      jobId,
      signature,
      response,
    })
  } catch (error) {
    return failureCallback({
      jobId,
      signature,
      error,
    })
  } finally {
    callback()
  }
}

export const priorityQueueInstance = priorityQueue(fetchRemoteImage, 3)

export const initializePriorityQueue = () => priorityQueue(fetchRemoteImage, 3)


/**
 * 
 */
export const removeLocalFolder = async (pathFolder) => {
  try {
    return await RNFS.unlink(pathFolder)
  } catch (error) {
  }
}

export const priorotizedRemoteImageFetch = ({
  signature,
  priority,
  queueInstance,
  progressCallback,
  requestCallback,
  successCallback,
  failureCallback,
}) => {
  const hasDuplicates = (() => {
    try {
      return priorityQueueInstance._tasks.toArray()
        .find(task => task.signature.path === signature.path)
    } catch (error) {
      return false
    }
  })()

  if (hasDuplicates) {
    return
  }

  priorityQueueInstance.push({
    signature,
    progressCallback,
    requestCallback,
    failureCallback,
    successCallback,
  }, priority)
}