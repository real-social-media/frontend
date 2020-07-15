import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import ActionsComponent from 'components/AuthPhotoUpload/Actions'
import ProgressComponent from 'components/AuthPhotoUpload/Progress'
import AuthHeaderTemplate from 'templates/Auth/Header'
import AuthPhotoTemplate from 'templates/Auth/Photo'
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
    <View testID="components/AuthPhotoUpload" style={styling.root}>
      {formErrorMessage ?
        <AuthErrorTemplate
          text={formErrorMessage}
          onClose={handleErrorClose}
        />
      : null}

      <View style={styling.component}>
        <AuthHeaderTemplate
          title={t('Add Profile Picture')}
          subtitle={t('Add an Unmodified Profile Picture. Our AI detects photoshop and filters')}
        />

        <View style={styling.content}>
          <AuthPhotoTemplate
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

AuthPhotoUpload.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  formErrorMessage: PropTypes.any,
  handleErrorClose: PropTypes.any,
  activeUpload: PropTypes.any,
}

export default withTranslation()(withTheme(AuthPhotoUpload))
