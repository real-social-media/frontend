import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import ActionsComponent from 'components/AuthPhoto/Actions'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthPhotoTemplate from 'templates/Auth/Photo'
import HeaderRight from 'navigation/HeaderRight'

import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

const AuthPhoto = ({ t, handleLibrarySnap, handleCameraSnap, skipPhotoUpload }) => {
  const styling = styles
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight
          testID={testIDs.header.skipBtn}
          onPress={skipPhotoUpload}
          title="Skip"
          style={styling.headerRight}
        />
      ),
    })
  }, [])

  return (
    <View testID={testIDs.root} style={styling.root}>
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
            skipPhotoUpload={skipPhotoUpload}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  headerRight: {
    color: '#ffffff',
  },
})

AuthPhoto.propTypes = {
  t: PropTypes.any,
  handleLibrarySnap: PropTypes.any,
  handleCameraSnap: PropTypes.any,
  skipPhotoUpload: PropTypes.any,
}

export default withTranslation()(AuthPhoto)
