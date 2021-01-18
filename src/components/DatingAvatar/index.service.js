import React from 'react'
import PropTypes from 'prop-types'
import UploadAvatar from 'components/UploadAvatar'

const DatingAvatarService = ({ children }) => {
  return <UploadAvatar backRoute="DatingWizard">{children}</UploadAvatar>
}

DatingAvatarService.propTypes = {
  children: PropTypes.any,
}

export default DatingAvatarService
