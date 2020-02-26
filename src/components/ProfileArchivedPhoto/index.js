import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
} from 'react-native'
import path from 'ramda/src/path'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import ImageComponent from 'templates/Image'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const ProfileArchivedPhoto = ({
  theme,
  navigation,
  postsGetArchived,
  postsGetArchivedRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <ScrollView style={styling.root}>
      <GridComponent items={path(['data'])(postsGetArchived)}>
        {(post, priorityIndex) => (
          <GridItemComponent
            onPress={() => navigation.navigate({
              routeName: 'PostMedia',
              params: {
                post,
                theme,
                routeName: navigation.state.routeName,
              },
              key: `PostMedia-postid${post.postId}`,
            })}
            active={false}
            activeIcon={null}
            inactiveIcon={null}
          >
            <ImageComponent
              thumbnailSource={{ uri: path(['mediaObjects', '0', 'url64p'])(post) }}
              imageSource={{ uri: path(['mediaObjects', '0', 'url480p'])(post) }}
              priorityIndex={priorityIndex}
            />
          </GridItemComponent>
        )}
      </GridComponent>
    </ScrollView>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
})

ProfileArchivedPhoto.defaultProps = {
  usersImagePostsGet: {},
}

ProfileArchivedPhoto.propTypes = {
  theme: PropTypes.any,
  postsGetArchived: PropTypes.any,
  postsGetArchivedRequest: PropTypes.any,
}

export default withNavigation(
  withTheme(ProfileArchivedPhoto)
)
