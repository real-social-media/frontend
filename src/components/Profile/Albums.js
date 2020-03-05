import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native'
import AlbumsGridComponent from 'components/AlbumsGrid'
import path from 'ramda/src/path'
import PostsLoadingComponent from 'components/PostsList/PostsLoading'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Profile = ({
  theme,
  albumsGet,
  themeFetch,
  usersGetProfile,
  scroll,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <View style={styling.root}>
      <AlbumsGridComponent
        albumsGet={albumsGet}
        themeFetch={themeFetch}
        themeCode={path(['data', 'themeCode'])(usersGetProfile)}
      />

      {(path(['status'])(albumsGet) === 'loading' && !path(['data', 'length'])(albumsGet)) ?
        <PostsLoadingComponent />
      : null}

      {scroll.loadingmore ?
        <View style={styling.loading}>
          <ActivityIndicator />
        </View>
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  loading: {
    padding: 16,
  },
})

Profile.propTypes = {
  theme: PropTypes.any,
  usersGetProfile: PropTypes.any,
  authUser: PropTypes.any,
  usersBlock: PropTypes.any,
  usersBlockRequest: PropTypes.any,
  usersUnblock: PropTypes.any,
  usersUnblockRequest: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  albumsGet: PropTypes.any,
}

export default withTheme(Profile)
