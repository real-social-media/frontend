import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import equals from 'ramda/src/equals'

const UploadingItemPreview = React.memo(
  ({ style, uri }) => (
    <Image
      style={style}
      accessibilityLabel="preview"
      resizeMode="cover"
      source={{ uri }}
    />
  ),
  equals,
)

UploadingItemPreview.propTypes = {
  style: PropTypes.any,
  uri: PropTypes.string,
}

export default UploadingItemPreview