import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import ImageComponent from 'templates/Image'
import CheckedIcon from 'assets/svg/other/Checked'
import UncheckedIcon from 'assets/svg/other/Unchecked'
import { RNCamera } from 'react-native-camera'
import CameraIcon from 'assets/svg/header/Camera'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const PostsGridSelect = ({
  theme,
  usersMediaObjectsGet,
  handleMediaPress,
  selectedMedia,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  return (
    <ScrollView style={styling.root}>
      <GridComponent items={[null, ...path(['data'])(usersMediaObjectsGet)]}>
        {(media, priorityIndex) => {
          if (!media) {
            return (
              <GridItemComponent
                onPress={navigationActions.navigateCamera(navigation)}
                active={false}
                activeIcon={null}
                inactiveIcon={null}
              >
                <View style={styling.wrapper}>
                  <CameraIcon fill={theme.colors.text} style={styling.icon} />
                </View>
                <RNCamera
                  key="camera"
                  captureAudio={false}
                  style={styling.camera}
                />
              </GridItemComponent>
            )
          }

          return (
            <GridItemComponent
              onPress={() => handleMediaPress(media)}
              active={(
                selectedMedia.mediaId === media.mediaId
              )}
              activeIcon={<CheckedIcon fill={theme.colors.iconPrimary} />}
              inactiveIcon={<UncheckedIcon fill={theme.colors.iconPrimary} />}
            >
              <ImageComponent
                thumbnailSource={{ uri: path(['url64p'])(media) }}
                imageSource={{ uri: path(['url480p'])(media) }}
                priorityIndex={priorityIndex}
              />
            </GridItemComponent>
          )
        }}
      </GridComponent>
    </ScrollView>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    flexWrap: 'wrap',
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  wrapper: {
    position: 'absolute',
    zIndex: 2,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

PostsGridSelect.defaultProps = {
  usersMediaObjectsGet: {},
}

PostsGridSelect.propTypes = {
  theme: PropTypes.any,
  usersMediaObjectsGet: PropTypes.any,
  handleMediaPress: PropTypes.any,
  selectedMedia: PropTypes.any,
}

export default withTheme(PostsGridSelect)
