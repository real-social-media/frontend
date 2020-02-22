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
import { useTranslation } from 'react-i18next'

const PostEditComponent = ({
  theme,
  postsEditRequest,
  postsEdit,
  postsSingleGet,
  albumsGet,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
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

export default withTheme(PostEditComponent)
