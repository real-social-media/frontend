import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native'
import UsersList from 'components/UsersList'
import { Caption } from 'react-native-paper'

import PreviewServiceComponent from 'components/Preview/index.service'
import PreviewPostComponent from 'components/Preview/Post'
import PreviewUserComponent from 'components/Preview/User'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const PostLikes = ({
  t,
  theme,
  postsLikesGet,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <View style={styling.info}>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.border}
            refreshing={postsLikesGet.status === 'loading'}
          />
        }
      >
        <PreviewServiceComponent>
          {({ postPreviewProps, postUserProps }) => (
            <React.Fragment>
              <PreviewPostComponent {...postPreviewProps} />
              <PreviewUserComponent {...postUserProps} />
            </React.Fragment>
          )}
        </PreviewServiceComponent>

        <UsersList usersSearch={postsLikesGet} />

        <View style={styling.info}>
          <Caption>{t('Only you can see who liked your post')}</Caption>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  info: {
    paddingHorizontal: theme.spacing.base,
    alignItems: 'center',
  },
  content: {
    padding: theme.spacing.base,
  },
})

PostLikes.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  postsLikesGet: PropTypes.any,
}

export default withTranslation()(withTheme(PostLikes))
