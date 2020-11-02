import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'
import AlbumsGridComponent from 'components/AlbumsGrid'
import * as navigationActions from 'navigation/actions'
import path from 'ramda/src/path'
import { useHeader } from 'components/Albums/header'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const Albums = ({
  theme,
  albumsGet,
  user,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  useHeader({
    title: 'Create',
    onPress: () => navigationActions.navigateAlbumCreate(navigation),
  })

  return (
    <View style={styling.root}>
      <ScrollView bounces={false}>
        <AlbumsGridComponent
          albumsGet={albumsGet}
          themeCode={path(['data', 'themeCode'])(user)}
        />
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

Albums.propTypes = {
  theme: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsShare: PropTypes.any,
  postsShareRequest: PropTypes.any,
  albumsGet: PropTypes.any,
  user: PropTypes.any,
}

export default withTheme(Albums)
