import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AlbumCreateForm from 'components/AlbumCreate/Form'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const AlbumCreateComponent = ({
  theme,
  authUser,
  albumsCreate,
  albumsCreateRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <KeyboardAwareScrollView>
        <View style={styling.form}>
          <AlbumCreateForm
            navigation={navigation}
            authUser={authUser}
            albumsCreate={albumsCreate}
            albumsCreateRequest={albumsCreateRequest}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

AlbumCreateComponent.propTypes = {
  theme: PropTypes.any,
  authUser: PropTypes.any,
  albumsCreate: PropTypes.any,
  albumsCreateRequest: PropTypes.any,
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

export default withTheme(AlbumCreateComponent)
