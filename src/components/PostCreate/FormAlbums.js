import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Text, Caption } from 'react-native-paper'
import pathOr from 'ramda/src/pathOr'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const getAlbums = pathOr([], ['data'])

const FormAlbums = ({ t, theme, values, setFieldValue, albumsGet }) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const handleAlbumPress = (albumId) => () => {
    setFieldValue('albumId', albumId)
  }

  return (
    <View style={styling.root}>
      <ScrollView style={styling.albums} horizontal>
        <TouchableOpacity
          testID={testIDs.albums.newAlbumBtn}
          style={[styling.album, styling.albumCreate]}
          onPress={navigationActions.navigateAlbumCreate(navigation)}
        >
          <Text>{t('New Album')}</Text>
        </TouchableOpacity>

        {getAlbums(albumsGet).map((album, key) => {
          const style =
            values.albumId === album.albumId
              ? [styling.album, styling.albumSelected]
              : [styling.album, styling.albumDefault]

          return (
            <TouchableOpacity
              testID={testIDs.albums.item}
              style={style}
              onPress={handleAlbumPress(album.albumId)}
              key={key}
            >
              <Text>{album.name}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>

      <TouchableOpacity onPress={navigationActions.navigateAlbums(navigation)}>
        <Caption>
          {t('Choose an album from the list to group your posts')}, {t('or click here to browse all your albums')}
        </Caption>
      </TouchableOpacity>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {},
    text: {},
    albums: {
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    album: {
      borderRadius: 4,
      marginRight: theme.spacing.base,
      marginBottom: 6,
      padding: 6,
    },
    albumCreate: {
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    albumSelected: {
      backgroundColor: theme.colors.primary,
    },
    albumDefault: {
      backgroundColor: theme.colors.backgroundSecondary,
    },
  })

FormAlbums.propTypes = {
  theme: PropTypes.any,
  values: PropTypes.shape({ albumId: PropTypes.string }),
  setFieldValue: PropTypes.any,
  t: PropTypes.any,
  albumsGet: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        albumId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
  }),
}

FormAlbums.defaultProps = {
  values: {},
}

export default withTranslation()(withTheme(FormAlbums))
