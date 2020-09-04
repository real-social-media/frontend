import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import last from 'ramda/src/last'

/**
 *
 */
const postUploadDefaultValues = (post) => ({
  postId: uuid(),
  mediaId: uuid(),
  createdAt: dayjs().toJSON(),
  attempt: 0,

  albumId: post.albumId || null,
  postType: post.postType || 'IMAGE',
  text: post.text || '',
  images: post.images || [],
  preview: post.preview || [],
  lifetime: post.lifetime || '',
  commentsDisabled: post.commentsDisabled || false,
  likesDisabled: post.likesDisabled || false,
  sharingDisabled: post.sharingDisabled || false,
  verificationHidden: post.verificationHidden || false,
  takenInReal: post.takenInReal || false,
  originalFormat: post.originalFormat || 'jpg',
  originalMetadata: post.originalMetadata || '',
  imageFormat: post.imageFormat || 'JPEG',
  crop: post.crop || null,
})

/**
 *
 */
const profilePhotoUploadDefaultValues = (post) => ({
  postId: uuid(),
  mediaId: uuid(),
  createdAt: dayjs().toJSON(),
  attempt: 0,

  albumId: post.albumId || null,
  postType: post.postType || 'IMAGE',
  text: post.text || '',
  images: post.images || [],
  preview: post.preview || [],
  lifetime: post.lifetime || '',
  commentsDisabled: post.commentsDisabled || false,
  likesDisabled: post.likesDisabled || false,
  sharingDisabled: post.sharingDisabled || false,
  verificationHidden: post.verificationHidden || false,
  takenInReal: post.takenInReal || false,
  originalFormat: post.originalFormat || 'jpg',
  originalMetadata: post.originalMetadata || '',
  imageFormat: post.imageFormat || 'JPEG',
  crop: post.crop || null,
})

/**
 *
 */
export const useUploadState = ({
  handleActivePhotoSelected = () => {},
  handleUploadSuccess = () => {},
  handleUploadFailure = () => {},
  handleProfilePhotoChangeSuccess = () => {},
  handleProfilePhotoChangeFailure = () => {},
}) => {
  const dispatch = useDispatch()

  const postsCreate = useSelector(state => state.posts.postsCreate)
  const postsCreateQueue = useSelector(state => state.posts.postsCreateQueue)
  const cameraCapture = useSelector(state => state.camera.cameraCapture)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)

  const activePhoto = pathOr({}, ['data', 0])(cameraCapture)
  const activeUpload = last(Object.values(postsCreateQueue))
  const activeUploadPostId = path(['payload', 'postId'])(activeUpload)

  /**
   * Cancel all pending uploads
   * This will cancel both network request and remove item from redux store 
   */
  const cancelActiveUploads = () =>
    (Object.values(postsCreateQueue) || [])
      .filter(path(['payload', 'postId']))
      .forEach(post => dispatch(postsActions.postsCreateIdle(post)))

  /**
   * Intended for profile photo upload
   * Will trigger when when camera queue has at least one photo
   */
  useEffect(() => {
    if (!activePhoto.uri) return

    handleActivePhotoSelected({
      images: [activePhoto.uri],
      preview: [activePhoto.preview],
      takenInReal: activePhoto.takenInReal,
      imageFormat: activePhoto.imageFormat,
      originalFormat: activePhoto.originalFormat,
      originalMetadata: activePhoto.originalMetadata,
      crop: activePhoto.crop,
    })
  }, [activePhoto.uri])

  /**
   * Uploaded photo event listener
   * postCreate status will be changed by upload subscription listener defined in subscription/saga
   */
  useEffect(() => {
    if (postsCreate.status === 'success') {
      handleUploadSuccess(postsCreate)
    }
    if (postsCreate.status === 'failure') {
      handleUploadFailure(postsCreate)
    }
  }, [postsCreate.status])

  /**
   * Profile photo change event listener
   * Once photo is uploaded usersEditProfile action must be dispatched with uploaded postId to set profile photo
   */
  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      handleProfilePhotoChangeSuccess(usersEditProfile)
    }
    if (usersEditProfile.status === 'failure') {
      handleProfilePhotoChangeFailure(usersEditProfile)
    }

    /**
     * Remove processed photo from queue
     */
    if (['success', 'failure'].includes(usersEditProfile.status) && activeUploadPostId) {
      dispatch(usersActions.usersEditProfileIdle({}))
      dispatch(postsActions.postsCreateIdle(activeUpload))
    }
  }, [usersEditProfile.status])

  return ({
    cancelActiveUploads,
    postsCreate,
    postsCreateQueue,
    cameraCapture,
    activePhoto,
    activeUpload,
  })
}

const useUpload = ({
  handlePostUploadStarted = () => {},
  handleProfilePhotoUploadStarted = () => {},
}) => {
  const dispatch = useDispatch()

  /**
   * Remove uploaded photo from camera queue
   */
  const uploadStartedHandler = (post) => {
    if (post.postType !== 'IMAGE' || !post.images.length) return
    dispatch(cameraActions.cameraCaptureIdle({ payload: { uri: post.images[0] } }))
  }

  /**
   * Initiate upload process for feed post
   * Generate image attributes, remove photo from cameera queue and notify passed start handler
   */
  const handlePostUpload = (post) => {
    const payload = postUploadDefaultValues(post)
    dispatch(postsActions.postsCreateRequest(payload))
    uploadStartedHandler(post)
    handlePostUploadStarted(post)
  }

  /**
   * Initiate upload process for profile photo
   * Generate image attributes, remove photo from cameera queue and notify passed start handler
   */
  const handleProfilePhotoUpload = (post) => {
    const payload = profilePhotoUploadDefaultValues(post)
    dispatch(postsActions.postsCreateRequest(payload))
    uploadStartedHandler(post)
    handleProfilePhotoUploadStarted(post)
  }

  return ({
    handlePostUpload,
    handleProfilePhotoUpload,
  })
}

export default useUpload
