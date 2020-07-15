import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
} from 'react-native'
import Layout from 'constants/Layout'
import PostsGridComponent from 'components/PostsGrid'
import ModalProfileComponent from 'templates/ModalProfile'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'
import ActionSheet from 'react-native-actionsheet'
import { useHeader } from 'components/Album/header'
import ScrollService from 'services/Scroll'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Album = ({
  t,
  theme,
  user,
  albumsSingleGet,
  albumsPostsGet,
  albumsPostsGetRequest,
  albumsPostsGetMoreRequest,
  albumsDeleteRequest,
  themeFetch,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const actionSheetRef = useRef(null)

  useHeader({
    user,
    album: albumsSingleGet.data,
    title: 'Edit',
    onPress: () => actionSheetRef.current && actionSheetRef.current.show(),
  })

  const scroll = ScrollService({
    resource: albumsPostsGet,
    loadInit: albumsPostsGetRequest,
    loadMore: albumsPostsGetMoreRequest,
    extra: { albumId: path(['data', 'albumId'])(albumsSingleGet) },
  })

  return (
    <View style={styling.root}>
      <ScrollView
        onScroll={scroll.handleScrollChange}
        scrollEventThrottle={400}
        refreshControl={(
          <RefreshControl
            tintColor={theme.colors.border}
            onRefresh={scroll.handleRefresh}
            refreshing={scroll.refreshing}
          />
        )}
      >
        <View style={styling.content}>
          <ModalProfileComponent
            thumbnailSource={{ uri: path(['ownedBy', 'photo', 'url64p'])(albumsSingleGet.data) }}
            imageSource={{ uri: path(['ownedBy', 'photo', 'url480p'])(albumsSingleGet.data) }}
            title={path(['ownedBy', 'username'])(albumsSingleGet.data)}
            subtitle={path(['ownedBy', 'fullName'])(albumsSingleGet.data)}
          />
        </View>

        <View>
          <PostsGridComponent
            postsGet={albumsPostsGet}
            themeFetch={themeFetch}
            themeCode={path(['ownedBy', 'themeCode'])(albumsSingleGet.data)}
            thread="albums"
          />
        </View>
        
        <ActionSheet
          ref={actionSheetRef}
          options={[t('Edit'), t('Remove'), t('Cancel')]}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => {
            if (index === 0) {
              navigationActions.navigateAlbumEdit(navigation, { album: albumsSingleGet.data })()
            }
            if (index === 1) {
              albumsDeleteRequest({ albumId: albumsSingleGet.data.albumId })
            }
          }}
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
  albumsDeleteRequest: PropTypes.any,
  postsSingleGet: PropTypes.any,
  albumsSingleGet: PropTypes.any,
  t: PropTypes.any,
  theme: PropTypes.any,
  themeFetch: PropTypes.any,
  user: PropTypes.any,
}

export default withTranslation()(
  withTheme(Album)
)
