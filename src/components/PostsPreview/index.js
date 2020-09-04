import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ActivityIndicator,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import CloseIcon from 'assets/svg/camera/Close'
import SwipeIcon from 'assets/svg/camera/Swipe'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import * as Animatable from 'react-native-animatable'

import { Caption } from 'react-native-paper'

const PostsPreview = ({
  selectedPost,
  handlePostClose,
}) => {
  const styling = styles

  return (
    <Modal visible={selectedPost.length > 0} transparent>
      <ImageViewer
        imageUrls={selectedPost}
        saveToLocalByLongPress={false}
        renderIndicator={() => null}
        enableSwipeDown
        backgroundColor="#000000"
        onSwipeDown={handlePostClose}
        onCancel={handlePostClose}
        loadingRender={() => <ActivityIndicator size="small" color="#ffffff" />}
        swipeDownThreshold={120}
        renderHeader={() => (
          <View style={styling.header}>
            <TouchableOpacity onPress={handlePostClose}>
              <CloseIcon
                fill="#ffffff"
              />
            </TouchableOpacity>
          </View>
        )}
        renderFooter={() => (
          <Animatable.View animation="bounce" easing="ease-out" iterationCount={2}>
            <TouchableOpacity onPress={handlePostClose} style={styling.footer}>
              <SwipeIcon
                fill="#ffffff"
              />

              <Caption style={styling.helper}>Swipe to close</Caption>
            </TouchableOpacity>
          </Animatable.View>
        )}
      />
    </Modal>
  )
}

PostsPreview.propTypes = {
  selectedPost: PropTypes.any,
  handlePostClose: PropTypes.any,
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    padding: 24,
    flexDirection: 'row-reverse',
    zIndex: 11,
    left: 0,
    right: 0,
    ...ifIphoneX({
      top: 40,
    }, {
      top: 0,
    }),
  },
  footer: {
    position: 'absolute',
    padding: 24,
    flexDirection: 'row',
    zIndex: 11,
    left: 0,
    right: 0,
    ...ifIphoneX({
      bottom: 40,
    }, {
      bottom: 0,
    }),
    width: 180,
  },
  helper: {
    color: '#ffffff',
    marginLeft: 8,
  },
})

export default PostsPreview