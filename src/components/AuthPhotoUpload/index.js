import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import ActionsComponent from 'components/AuthPhotoUpload/Actions'
import ProgressComponent from 'components/AuthPhotoUpload/Progress'
import AuthHeaderTemplate from 'templates/Auth/Header'
import PhotoTemplate from 'templates/Auth/Photo'
import AuthErrorTemplate from 'templates/Auth/Error'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const AuthPhotoUpload = ({
  t,
  theme,
  formErrorMessage,
  handleErrorClose,
  activeUpload,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <React.Fragment>
      {formErrorMessage ?
        <AuthErrorTemplate
          text={formErrorMessage}
          onClose={handleErrorClose}
        />
      : null}

      <View style={styling.root}>
        <AuthHeaderTemplate
          title={t('Add Profile Picture')}
          subtitle={t('Add an Unmodified Profile Picture. Our AI detects photoshop and filters')}
        />

        <View style={styling.content}>
          <PhotoTemplate
            activeUpload={activeUpload}
          />

          {!formErrorMessage ?
            <ProgressComponent
              activeUpload={activeUpload}
            />
          : null}

          {formErrorMessage ?
            <ActionsComponent />
          : null}
        </View>
      </View>
    </React.Fragment>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  footer: {
  },
})

AuthPhotoUpload.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  formErrorMessage: PropTypes.any,
  handleErrorClose: PropTypes.any,
  activeUpload: PropTypes.any,
}

export default withTranslation()(withTheme(AuthPhotoUpload))
