import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PostEditForm from 'components/PostEdit/Form'
import FormLifetime from 'components/PostEdit/FormLifetime'
import FormAlbums from 'components/PostEdit/FormAlbums'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PostEditComponent = ({
  t,
  theme,
  postsEditRequest,
  postsEdit,
  handlePostPress,
  postsSingleGet,
  albumsGet,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <KeyboardAwareScrollView>
        <View style={styling.form}>
          <PostEditForm
            navigation={navigation}
            postsEdit={postsEdit}
            postsEditRequest={postsEditRequest}
            postsSingleGet={postsSingleGet}
            formLifetime={FormLifetime}
            formAlbums={FormAlbums}
            albumsGet={albumsGet}
            handlePostPress={handlePostPress}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

PostEditComponent.propTypes = {
  theme: PropTypes.any,
  postsEditRequest: PropTypes.any,
  postsEdit: PropTypes.any,
  postsSingleGet: PropTypes.any,
  t: PropTypes.any,
  handlePostPress: PropTypes.any,
  albumsGet: PropTypes.any,
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

export default withTranslation()(withTheme(PostEditComponent))
