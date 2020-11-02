import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import AuthHeaderTemplate from 'templates/Auth/Header'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import PhotoComponent from 'components/ProfilePhotoUpload/Photo'
import { confirm } from 'components/Alert'
import { withTranslation } from 'react-i18next'

const ProfilePhoto = ({ t, handleLibrarySnap, handleCameraSnap, handleSkipUpload }) => { 
  const confirmProfilePhotoUpload = (onConfirm) => () => {
    confirm({
      title: t('Profile Picture Upload'),
      desc: t('Your photo will be uploaded as post'),
      onConfirm,
    })
  }

  return (
    <View style={styles.root}>
      <View style={styles.component}>
        <AuthHeaderTemplate
          title={t('Add an Unmodified Profile Picture')}
          subtitle={t('Our AI detects photoshop & filters')}
        />
        <View style={styles.content}>
          <PhotoComponent />
          <View style={styles.actions}>
            <View style={styles.item}>
              <DefaultButton
                label={t('Take a Photo')}
                onPress={confirmProfilePhotoUpload(handleCameraSnap)}
                loading={false}
              />
            </View>
            <View style={styles.item}>
              <DefaultButton
                label={t('Choose From Gallery')}
                onPress={confirmProfilePhotoUpload(handleLibrarySnap)}
                loading={false}
              />
            </View>
            <View style={styles.item}>
              <DefaultButton label={t('Skip Photo Upload')} onPress={handleSkipUpload} loading={false} />
            </View>
          </View>
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
  item: {
    marginBottom: 12,
  },
})

ProfilePhoto.propTypes = {
  t: PropTypes.any,
  handleLibrarySnap: PropTypes.func.isRequired,
  handleCameraSnap: PropTypes.func.isRequired,
  handleSkipUpload: PropTypes.func.isRequired,
}

export default withTranslation()(ProfilePhoto)
