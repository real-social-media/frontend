import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
} from 'react-native'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'
import { Caption } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const ProfileAlbums = ({
  theme,
  albumsGet,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  if (!path(['data', 'length'])(albumsGet)) {
    return null
  }

  return (
    <View style={styling.root}>
      <FlatList
        data={albumsGet.data}
        horizontal
        keyExtractor={item => item.albumId}
        renderItem={({ item: album }) => (
          <TouchableOpacity style={styling.column} onPress={() => navigationActions.navigateAlbum(navigation, { album: album })}>
            <Avatar
              size="medium"
              thumbnailSource={{ uri: path(['art', 'url64p'])(album) }}
              imageSource={{ uri: path(['art', 'url480p'])(album) }}
              icon={false}
            />
            <Caption numberOfLines={1} style={styling.caption}>{album.name}</Caption>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    padding: theme.spacing.base,
    paddingBottom: theme.spacing.base / 2,
  },
  column: {
    marginRight: theme.spacing.base,
    alignItems: 'center',
    width: 72,
  },
  caption: {
    padding: 0,
  },
})

ProfileAlbums.propTypes = {
  theme: PropTypes.any,
  albumsGet: PropTypes.any,
}

export default withTheme(ProfileAlbums)
