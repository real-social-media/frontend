import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'
import PostCreateForm from 'components/PostCreate/Form'
import FormLifetime from 'components/PostCreate/FormLifetime'
import FormAlbums from 'components/PostCreate/FormAlbums'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PostCreateComponent = ({
  t,
  theme,
  user,
  cameraCapture,
  cameraCaptureLength,
  postsCreateRequest,
  postsCreate,
  handlePostPress,
  albumsGet,
  type,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <ScrollView keyboardShouldPersistTaps="never">
        {type === 'TEXT_ONLY' ? (
          <View style={styling.form}>
            <PostCreateForm
              user={user}
              postsCreate={postsCreate}
              postsCreateRequest={postsCreateRequest}
              cameraCapture={{ data: {} }}
              cameraCaptureLength={cameraCaptureLength}
              handlePostPress={handlePostPress}
              formLifetime={FormLifetime}
              formAlbums={FormAlbums}
              albumsGet={albumsGet}
              postType={type}
            />
          </View>
        ) : null}

        {type === 'IMAGE' && cameraCapture ? (
          <View style={styling.form}>
            <PostCreateForm
              user={user}
              postsCreate={postsCreate}
              postsCreateRequest={postsCreateRequest}
              cameraCapture={cameraCapture}
              cameraCaptureLength={cameraCaptureLength}
              handlePostPress={handlePostPress}
              formLifetime={FormLifetime}
              formAlbums={FormAlbums}
              albumsGet={albumsGet}
              postType={type}
            />
          </View>
        ) : null}
      </ScrollView>
    </View>
  )
}

PostCreateComponent.propTypes = {
  theme: PropTypes.any,
  cameraCapture: PropTypes.any,
  postsCreateRequest: PropTypes.any,
  postsCreate: PropTypes.any,
  t: PropTypes.any,
  user: PropTypes.any,
  cameraCaptureLength: PropTypes.any,
  handlePostPress: PropTypes.any,
  albumsGet: PropTypes.any,
  type: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  form: {
    padding: theme.spacing.base,
  },
})

export default withTranslation()(withTheme(PostCreateComponent))
