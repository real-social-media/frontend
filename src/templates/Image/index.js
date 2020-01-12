import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import ProgressiveImage from 'components/ProgressiveImage'

const ImageTemplate = ({
  thumbnailSource,
  imageSource,
  resizeMode,
  shouldLoadImage,
  priorityIndex,
  children,
  ...props
}) => {
  const styling = styles()

  return (
    <View style={styling.root}>
      <ProgressiveImage
        style={styling.photo}
        imageSource={imageSource}
        thumbnailSource={thumbnailSource}
        resizeMode={resizeMode}
        shouldLoadImage={shouldLoadImage}
        priorityIndex={priorityIndex}
        {...props}
      />
    </View>
  )
}

const styles = () => StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
})

ImageTemplate.defaultProps = {
  children: () => {},
}

ImageTemplate.propTypes = {
  theme: PropTypes.any,
  uri: PropTypes.any,
  resizeMode: PropTypes.any,
}

export default ImageTemplate
