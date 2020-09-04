import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AlbumEditForm from 'components/AlbumEdit/Form'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'

const AlbumEditComponent = ({
  theme,
  user,
  albumsEdit,
  albumsEditRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const route = useRoute()
  const album = path(['params', 'album'])(route)

  return (
    <View style={styling.root}>
      <KeyboardAwareScrollView>
        <View style={styling.form}>
          <AlbumEditForm
            navigation={navigation}
            user={user}
            albumsEdit={albumsEdit}
            albumsEditRequest={albumsEditRequest}
            album={album}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

AlbumEditComponent.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
  albumsEdit: PropTypes.any,
  albumsEditRequest: PropTypes.any,
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

export default withTheme(AlbumEditComponent)
