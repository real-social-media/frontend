import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import ProgressComponent from 'components/ProfilePhotoUpload/Progress'
import PhotoComponent from 'components/ProfilePhotoUpload/Photo'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthErrorTemplate from 'templates/Auth/Error'

import { withTranslation } from 'react-i18next'

const ProfilePhotoUpload = ({
  t,
  formErrorMessage,
  handleClose,
  activeUpload,
}) => {
  const styling = styles

  return (
    <View style={styling.root}>
      {formErrorMessage ?
        <AuthErrorTemplate
          text={formErrorMessage}
          onClose={handleClose}
        />
      : null}

      <View style={styling.component}>
        <AuthHeaderTemplate
          title={t('Add Profile Picture')}
          subtitle={t('Add an Unmodified Profile Picture. Our AI detects photoshop and filters')}
        />

        <View style={styling.content}>
          <PhotoComponent
            activeUpload={activeUpload}
          />

          {!formErrorMessage ?
            <ProgressComponent
              activeUpload={activeUpload}
            />
          : null}

          {formErrorMessage ?
            <DefaultButton label={t('Try Again')} onPress={handleClose} />
          : null}
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
  formErrorMessage: PropTypes.any,
  handleClose: PropTypes.any,
  activeUpload: PropTypes.any,
}

export default withTranslation()(ProfilePhotoUpload)
