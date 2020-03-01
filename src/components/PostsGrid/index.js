import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import ImageComponent from 'templates/Image'
import TextOnlyComponent from 'templates/TextOnly/Thumbnail'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const PostsGrid = ({
  theme,
  postsGet,
  themeFetch,
  themeCode,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <View style={styling.root}>
      <GridComponent items={path(['data'])(postsGet)}>
        {(post, priorityIndex) => (
          <GridItemComponent onPress={navigationActions.navigatePostMedia(navigation, { post })}>
            {post.postType === 'IMAGE' ?
              <ImageComponent
                thumbnailSource={{ uri: path(['image', 'url64p'])(post) }}
                imageSource={{ uri: path(['image', 'url480p'])(post) }}
                priorityIndex={priorityIndex}
              />
            : null}

            {post.postType === 'TEXT_ONLY' ?
              <TextOnlyComponent
                text={post.text}
              />
            : null}
          </GridItemComponent>
        )}
      </GridComponent>
    </View>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
  },
})

PostsGrid.defaultProps = {
  postsGet: {},
}

PostsGrid.propTypes = {
  theme: PropTypes.any,
  
  postsGet: PropTypes.any,
}

export default withTheme(PostsGrid)
