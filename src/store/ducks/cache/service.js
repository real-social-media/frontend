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
    background: false,
    discretionary: true,
    cacheable: false,
    readTimeout: 30000,
    backgroundTimeout: 30000,
    progressDivider: 20,
    resumable: () =>
      RNFS.isResumable(jobId).then(() => RNFS.resumeDownload(jobId)),
    begin: requestCallback,
    progress: progressCallback,
  })

  try {
    const response = await promise
    // await RNFS.completeHandlerIOS(jobId)

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

export const queueInstances = {
  albums: priorityQueue(fetchRemoteImage, 6),
  archived: priorityQueue(fetchRemoteImage, 6),
  default: priorityQueue(fetchRemoteImage, 6),
  zoom: priorityQueue(fetchRemoteImage, 6),
  post: priorityQueue(fetchRemoteImage, 6),
  posts: priorityQueue(fetchRemoteImage, 6),
  story: priorityQueue(fetchRemoteImage, 6),
  avatar: priorityQueue(fetchRemoteImage, 6),
}

/**
 * 
 */
export const removeLocalFolder = async (pathFolder) => {
  try {
    return await RNFS.unlink(pathFolder)
  } catch (error) {
    // ignore
  }
}

export const priorotizedRemoteImageFetch = ({
  thread,
  signature,
  priority,
  progressCallback,
  requestCallback,
  successCallback,
  failureCallback,
}) => {
  const queueInstance = queueInstances[thread] || queueInstances['default']
  const hasDuplicates = (() => {
    try {
      const allTasks = queueInstance._tasks.toArray()
      return allTasks
        .find(task => task.signature.path === signature.path)
    } catch (error) {
      return false
    }
  })()

  if (hasDuplicates) {
    return
  }

  queueInstance.push({
    signature,
    progressCallback,
    requestCallback,
    failureCallback,
    successCallback,
  }, priority)
}