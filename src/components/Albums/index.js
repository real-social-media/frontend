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
import HeaderRight from 'navigation/HeaderRight'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Albums = ({
  t,
  theme,
  themeFetch,
  albumsGet,
  user,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  navigation.setOptions({
    headerRight: () => <HeaderRight onPress={navigationActions.navigateAlbumCreate(navigation)} title="Create" />,
  })

  return (
    <View style={styling.root}>
      <ScrollView bounces={false}>
        <AlbumsGridComponent
          albumsGet={albumsGet}
          themeFetch={themeFetch}
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
  themeFetch:PropTypes.any,
  albumsGet:PropTypes.any,
  user:PropTypes.any,
  t:PropTypes.any,
}

export default withTranslation()(withTheme(Albums))
