import path from 'ramda/src/path'
import { createDeepEqualSelector } from 'store/helpers'

/**
 *
 */
const isRecording = path(['camera', 'isRecording'])
export const cameraRecordingSelector = () => createDeepEqualSelector([isRecording], (isRecording) => isRecording)
