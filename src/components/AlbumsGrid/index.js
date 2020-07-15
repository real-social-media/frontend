import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import CacheComponent from 'components/Cache'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const AlbumsGrid = ({
  t,
  theme,
  albumsGet,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <GridComponent items={path(['data'])(albumsGet)}>
        {(album, priorityIndex) => (
          <GridItemComponent onPress={navigationActions.navigateAlbum(navigation, { album: album })}>
            <CacheComponent
              thread="albums"
              images={[
                [path(['art', 'url64p'])(album), true],
                [path(['art', 'url480p'])(album), true],
              ]}
              fallback={path(['art', 'url480p'])(album)}
              priorityIndex={priorityIndex}
              resizeMode="cover"
              hideProgress={true}
            />

            <View style={styling.title}>
              <Text numberOfLines={1} style={styling.text}>{album.name}</Text>
            </View>
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
  title: {
    position: 'absolute',
    padding: 4,
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

AlbumsGrid.defaultProps = {
  albumsGet: {},
}

AlbumsGrid.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  albumsGet: PropTypes.any,
}

export default withTranslation()(withTheme(AlbumsGrid))
