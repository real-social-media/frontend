import React from 'react'
import PropTypes from 'prop-types'
import ActionSheet from 'components/ActionSheet'
import { withTranslation } from 'react-i18next'
import { confirm } from 'components/Alert'

const UploadAvatar = ({
  t,
  handleLibrarySnap,
  navigateProfilePhotoGrid,
  usersDeleteAvatarRequest,
  handleCameraSnap,
  isAvatarEmpty,
  actionSheetRef,
}) => {
  const confirmProfilePhotoUpload = (onConfirm) => () => {
    confirm({
      title: t('Profile Picture Upload'),
      desc: t('Your photo will be uploaded as post'),
      onConfirm,
    })
  }

  const handleProfilePhotoDelete = () => {
    confirm({
      title: t('Delete Profile Picture'),
      desc: t('Are you sure you want to delete the profile photo?'),
      onConfirm: usersDeleteAvatarRequest,
    })
  }

  return (
    <ActionSheet
      actionSheetRef={actionSheetRef}
      options={[
        {
          name: t('Take a Photo'),
          onPress: confirmProfilePhotoUpload(handleCameraSnap),
        },
        {
          name: t('Choose From Gallery'),
          onPress: confirmProfilePhotoUpload(handleLibrarySnap),
        },
        {
          name: t('Choose From Existing'),
          onPress: navigateProfilePhotoGrid,
        },
        {
          name: t('Delete Profile Picture'),
          onPress: () => handleProfilePhotoDelete(),
          isDestructive: true,
          isVisible: !isAvatarEmpty,
        },
        {
          name: t('Cancel'),
          onPress: () => {},
          isCancel: true,
        },
      ]}
    />
  )
}

UploadAvatar.propTypes = {
  t: PropTypes.any,
  handleLibrarySnap: PropTypes.func,
  navigateProfilePhotoGrid: PropTypes.func,
  usersDeleteAvatarRequest: PropTypes.func,
  handleCameraSnap: PropTypes.func,
  isAvatarEmpty: PropTypes.bool,
  actionSheetRef: PropTypes.any,
}

UploadAvatar.defaultProps = {
  isAvatarEmpty: true,
}

export default withTranslation()(UploadAvatar)
