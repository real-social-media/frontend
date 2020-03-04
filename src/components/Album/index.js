import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'
import Layout from 'constants/Layout'
import PostsGridComponent from 'components/PostsGrid'
import ModalProfileComponent from 'templates/ModalProfile'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Album = ({
  theme,
  albumsGet,
  themeFetch,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const album = path(['params', 'album'])(route)

  return (
    <View style={styling.root}>
      <ScrollView bounces={false}>
        <View style={styling.content}>
          <ModalProfileComponent
            thumbnailSource={{ uri: path(['ownedBy', 'photo', 'url64p'])(album) }}
            imageSource={{ uri: path(['ownedBy', 'photo', 'url480p'])(album) }}
            title={path(['ownedBy', 'username'])(album)}
            subtitle={path(['ownedBy', 'fullName'])(album)}
          />
        </View>

        <View>
          <PostsGridComponent
            postsGet={{ data: album.posts.items }}
            themeFetch={themeFetch}
            themeCode={path(['ownedBy', 'themeCode'])(album)}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  header: {
    zIndex: 2,
  },
  content: {
    padding: theme.spacing.base,
  },
  headline: {
    fontSize: 20,
    fontWeight: '600',
  },
  bottomSpacing: {
    marginBottom: theme.spacing.base,
  },

  albums: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  albumWrapper: {
    width: Layout.window.width / 2 - 12,
    height: Layout.window.width / 2 - 12,
    padding: 12,
  },
  album: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
})

Album.propTypes = {
  theme: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsShare: PropTypes.any,
  postsShareRequest: PropTypes.any,
}

export default withTheme(Album)
