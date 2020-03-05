import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Text, Caption } from 'react-native-paper'
import pathOr from 'ramda/src/pathOr'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const FormAlbums = ({
  theme,
  values,
  setFieldValue,
  albumsGet,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  const handleAlbumPress = (albumId) => () => {
    setFieldValue('albumId', albumId)
  }

  return (
    <View style={styling.root}>
      <View style={styling.albums} horizontal>
        {pathOr([], ['data'])(albumsGet).map((album, key) => {
          const style = (values.albumId === album.albumId) ?
            [styling.album, styling.albumSelected] :
            [styling.album, styling.albumDefault]

          return (
            <TouchableOpacity style={style} onPress={handleAlbumPress(album.albumId)} key={key}>
              <Text>{album.name}</Text>
            </TouchableOpacity>
          )
        })}

        <TouchableOpacity style={[styling.album, styling.albumCreate]} onPress={navigationActions.navigateAlbums(navigation)}>
          <Text>{t('All albums')}</Text>
        </TouchableOpacity>
      </View>

      <Caption>{t('Choose an album from the list to group your posts')}</Caption>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  text: {
  },
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
  values: PropTypes.any,
  setFieldValue: PropTypes.any,
}

export default withTheme(FormAlbums)
