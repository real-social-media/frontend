import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import ImageComponent from 'templates/Image'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const PostsGrid = ({
  theme,
  navigation,
  postsGet,
  themeFetch,
  themeCode,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const themeSelector = (themeCode, themeFetch) =>
    (themeFetch.data.find(theme => theme.key === themeCode) || {}).theme

  return (
    <View style={styling.root}>
      <GridComponent items={path(['data'])(postsGet)}>
        {(post, priorityIndex) => (
          <GridItemComponent onPress={() => navigation.navigate({
            routeName: 'PostMedia',
            params: {
              post,
              theme: themeSelector(themeCode, themeFetch),
              routeName: navigation.state.routeName,
            },
            key: `PostMedia-postid${post.postId}`,
          })}>
            <ImageComponent
              thumbnailSource={{ uri: path(['image', 'url64p'])(post) }}
              imageSource={{ uri: path(['image', 'url480p'])(post) }}
              priorityIndex={priorityIndex}
            />
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
  navigation: PropTypes.any,
  postsGet: PropTypes.any,
}

export default withNavigation(
  withTheme(PostsGrid)
)
