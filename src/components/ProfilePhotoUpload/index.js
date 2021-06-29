import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import ProgressComponent from 'components/ProfilePhotoUpload/Progress'
import PhotoComponent from 'components/ProfilePhotoUpload/Photo'
import AuthHeaderTemplate from 'templates/Auth/Header'

import { withTranslation } from 'react-i18next'

const ProfilePhotoUpload = ({ t, activeUpload }) => {
  return (
    <View style={styles.root}>
      <View style={styles.component}>
        <AuthHeaderTemplate
          title={t('Add Profile Picture')}
          subtitle={t('Add an Unmodified Profile Picture. \n The only thing you have to change, \nis nothing at all!')}
        />

        <View style={styles.content}>
          <PhotoComponent activeUpload={activeUpload} />
          <ProgressComponent activeUpload={activeUpload} />
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
})

ProfilePhotoUpload.propTypes = {
  t: PropTypes.any,
  usersEditProfile: PropTypes.any,
  handleClose: PropTypes.any,
  activeUpload: PropTypes.any,
}

export default withTranslation()(ProfilePhotoUpload)
