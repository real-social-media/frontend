import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import path from 'ramda/src/path'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import CacheComponent from 'components/Cache'
import CheckedIcon from 'assets/svg/other/Checked'
import UncheckedIcon from 'assets/svg/other/Unchecked'
import { Caption } from 'react-native-paper'
import HeaderRight from 'navigation/HeaderRight'
import ProfilePhotoComponent from 'components/ProfilePhoto/ProfilePhoto'
import UploadingComponent from 'components/PostsList/Uploading'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfilePhoto = ({
  t,
  theme,
  usersImagePostsGet,
  handlePostPress,
  selectedPost,
  usersEditProfileRequest,

  user,
  postsCreateRequest,
  postsCreateQueue,
  cameraCapture,
  postsCreateIdle,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  navigation.setOptions({
    headerRight: () => <HeaderRight onPress={usersEditProfileRequest} title="Update" hidden={!selectedPost.postId} />,
  })

  return (
    <View style={styling.root}>
      {!cameraCapture.data.length ?
        <View style={styling.info}>
          <Caption>{t('You can only set profile photo from your existing posts')}</Caption>
        </View>
      : null}

      {cameraCapture.data.length ?
        <ProfilePhotoComponent
          cameraCapture={cameraCapture}
          postsCreateRequest={postsCreateRequest}
        />
      : null}

      {Object.values(postsCreateQueue).map((post, key) => (
        <UploadingComponent
          key={key}
          user={user}
          post={post}
          postsCreateRequest={postsCreateRequest}
          postsCreateIdle={postsCreateIdle}
        />
      ))}

      <ScrollView>
        <GridComponent items={path(['data'])(usersImagePostsGet)}>
          {(post, priorityIndex) => (
            <GridItemComponent
              onPress={() => handlePostPress(post)}
              active={selectedPost.postId === post.postId}
              activeIcon={<CheckedIcon fill={theme.colors.iconPrimary} />}
              inactiveIcon={<UncheckedIcon fill={theme.colors.iconPrimary} />}
            >
              <CacheComponent
                images={[
                  [path(['image', 'url64p'])(post), true],
                  [path(['image', 'url480p'])(post), true],
                ]}
                fallback={path(['image', 'url480p'])(post)}
                priorityIndex={priorityIndex}
                resizeMode="cover"
              />
            </GridItemComponent>
          )}
        </GridComponent>
      </ScrollView>
    </View>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    flexWrap: 'wrap',
  },
  info: {
    padding: theme.spacing.base,
    alignItems: 'center',
  },
})

ProfilePhoto.defaultProps = {
  usersImagePostsGet: {},
}

ProfilePhoto.propTypes = {
  theme: PropTypes.any,
  usersImagePostsGet: PropTypes.any,
  handlePostPress: PropTypes.any,
  selectedPost: PropTypes.any,
  t: PropTypes.any,
  usersEditProfileRequest: PropTypes.any,
  user: PropTypes.any,
  postsCreateRequest: PropTypes.any,
  postsCreateQueue: PropTypes.any,
  cameraCapture: PropTypes.any,
  postsCreateIdle: PropTypes.any,
}

export default withTranslation()(withTheme(ProfilePhoto))
