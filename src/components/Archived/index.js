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
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Archived = ({
  theme,
  postsGetArchived,
  postsGetArchivedRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <ScrollView style={styling.root}>
      <GridComponent items={path(['data'])(postsGetArchived)}>
        {(post, priorityIndex) => (
          <GridItemComponent
            onPress={navigationActions.navigatePostMedia(navigation, { post, theme, })}
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

Archived.defaultProps = {
  usersMediaObjectsGet: {},
}

Archived.propTypes = {
  theme: PropTypes.any,
  postsGetArchived: PropTypes.any,
  postsGetArchivedRequest: PropTypes.any,
}

export default withTheme(Archived)
