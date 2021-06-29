import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import UploadAvatarComponent from 'components/UploadAvatar/component'
import useProfilePhoto from 'components/UploadAvatar/index.service'
import * as navigationActions from 'navigation/actions'

const UploadAvatar = ({ children, backRoute }) => {
  const navigation = useNavigation()
  const props = useProfilePhoto({ backRoute })
  const actionSheetRef = useRef(null)
  const openUploadAvatarMenu = navigationActions.mockForWeb(
    () => actionSheetRef.current && actionSheetRef.current.show(),
    navigation,
  )

  return (
    <React.Fragment>
      {children({ openUploadAvatarMenu, ...props })}
      <UploadAvatarComponent {...props} actionSheetRef={actionSheetRef} />
    </React.Fragment>
  )
}

UploadAvatar.propTypes = {
  children: PropTypes.any.isRequired,
  backRoute: PropTypes.string,
}

UploadAvatar.defaultProps = {
  backRoute: null,
}

export default UploadAvatar
