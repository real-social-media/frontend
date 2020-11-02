import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import UploadingItem from 'components/Uploading/Item'

const Uploading = ({ postsCreateQueue, postsCreateRequest, postsCreateIdle }) => (
  <View style={styles.uploading}>
    {Object.values(postsCreateQueue).map((post, key) => (
      <UploadingItem
        key={key}
        post={post}
        postsCreateRequest={postsCreateRequest}
        postsCreateIdle={postsCreateIdle}
      />
    ))}
  </View>
)

Uploading.propTypes = {
  postsCreateQueue: PropTypes.any,
  postsCreateRequest: PropTypes.func,
  postsCreateIdle: PropTypes.func,
}

const styles = StyleSheet.create({
  uploading: {
    flexWrap: 'wrap',
  },
})

export default Uploading
