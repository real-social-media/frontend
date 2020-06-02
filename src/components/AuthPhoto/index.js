import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import ActionsComponent from 'components/AuthPhoto/Actions'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthPhotoTemplate from 'templates/Auth/Photo'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const AuthPhoto = ({
  t,
  theme,
  handleLibrarySnap,
  handleCameraSnap,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View testID="components/AuthPhoto" style={styling.root}>
      <View style={styling.component}>
        <AuthHeaderTemplate
          title={t('Add an Unmodified Profile Picture')}
          subtitle={t('Our AI detects photoshop & filters')}
        />

        <View style={styling.content}>
          <AuthPhotoTemplate />
          <ActionsComponent
            handleLibrarySnap={handleLibrarySnap}
            handleCameraSnap={handleCameraSnap}
          />
        </View>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  component: {
    paddingHorizontal: 24,
    flex: 1,
  },
  content: {
    flex: 1,
  },
})

AuthPhoto.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  handleLibrarySnap: PropTypes.any,
  handleCameraSnap: PropTypes.any,
}

export default withTranslation()(withTheme(AuthPhoto))
