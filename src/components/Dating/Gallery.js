import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native'
import { Text } from 'react-native-paper'
import Layout from 'constants/Layout'
import PostsGridThumbnailComponent from 'components/PostsGrid/Thumbnail'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Gallery = ({
  theme,
  user,
}) => {
  const styling = styles(theme)

  if (!user.posts) {
    return null
  }

  return (
    <View style={styling.root}>
      <View style={styling.slider}>
        <View style={[styling.item, styling.itemActive]}>
          <Text style={styling.text}>Posts</Text>
        </View>
      </View>

      <FlatList
        data={user.posts.items}
        numColumns={3}
        keyExtractor={item => item.postId}
        renderItem={({ item: post, index: priorityIndex }) => (
          <TouchableWithoutFeedback>
            <PostsGridThumbnailComponent
              post={post}
              priorityIndex={priorityIndex}
              thread="dating/profile"
            />
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  )
}

const POST_WIDTH = (Layout.window.width - 24) / 3

const styles = theme => StyleSheet.create({
  root: {
    height: '100%',
  },
  gallery: {
    height: '100%',
  },
  post: {
    height: POST_WIDTH,
    width: POST_WIDTH,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  slider: {
    flexDirection: 'row',
    height: 44,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  itemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
})

Gallery.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
}

export default withTranslation()(withTheme(Gallery))
