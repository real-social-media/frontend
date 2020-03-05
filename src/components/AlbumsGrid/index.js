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

const AlbumsGrid = ({
  theme,
  albumsGet,
  themeFetch,
  themeCode,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <View style={styling.root}>
      <GridComponent items={path(['data'])(albumsGet)}>
        {(album, priorityIndex) => (
          <GridItemComponent onPress={navigationActions.navigateAlbum(navigation, { album: album })}>
            <ImageComponent
              thumbnailSource={{ uri: path(['art', 'url64p'])(album) }}
              imageSource={{ uri: path(['art', 'url480p'])(album) }}
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

AlbumsGrid.defaultProps = {
  albumsGet: {},
}

AlbumsGrid.propTypes = {
  theme: PropTypes.any,
  
  albumsGet: PropTypes.any,
}

export default withTheme(AlbumsGrid)
