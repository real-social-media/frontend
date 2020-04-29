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

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const AlbumsGrid = ({
  t,
  theme,
  albumsGet,
  themeFetch,
  themeCode,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <View style={styling.root}>
      <GridComponent items={path(['data'])(albumsGet)}>
        {(album, priorityIndex) => (
          <GridItemComponent onPress={navigationActions.navigateAlbum(navigation, { album: album })}>
            <CacheComponent
              images={[
                [path(['art', 'url64p'])(album), true],
                [path(['art', 'url480p'])(album), true],
              ]}
              fallback={path(['art', 'url480p'])(album)}
              priorityIndex={priorityIndex}
              resizeMode="cover"
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
  t: PropTypes.any,
  themeFetch: PropTypes.any,
  themeCode: PropTypes.any,
}

export default withTranslation()(withTheme(AlbumsGrid))
