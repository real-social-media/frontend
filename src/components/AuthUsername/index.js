import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import FormComponent from 'components/AuthUsername/Form'
import AuthActionTemplate from 'templates/Auth/Action'
import AuthHeaderTemplate from 'templates/Auth/Header'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const AuthUsername = ({
  t,
  theme,
  handleFormSubmit,
  formSubmitLoading,
  formInitialValues,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <React.Fragment>
      <View style={styling.root}>
        <AuthHeaderTemplate
          title={t('Grab Your Username!')}
          subtitle={t('You can always change it later')}
        />

        <View style={styling.content}>
          <FormComponent
            handleFormSubmit={handleFormSubmit}
            formSubmitLoading={formSubmitLoading}
            formInitialValues={formInitialValues}
          />
        </View>
      </View>

      <AuthActionTemplate onPress={navigationActions.navigateAuthPhone(navigation)}>
        {t('Signup with Phone Number')}
      </AuthActionTemplate>
    </React.Fragment>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 48, 
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  footer: {
  },
})

AuthUsername.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  handleFormSubmit: PropTypes.any,
  formSubmitLoading: PropTypes.any,
  formInitialValues: PropTypes.any,
}

export default withTranslation()(withTheme(AuthUsername))
