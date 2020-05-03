import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import SignupForm from 'components/Signup/Form'
import { Headline, Subheading } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Auth = ({
  t,
  theme,
  authSignin,
  authSignup,
  authSignupRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <React.Fragment>
      <View style={styling.root}>
        <View style={styling.header}>
          <Headline>{t('Grab Your Username!')}</Headline>
          <Subheading>{t('You can always change it later')}</Subheading>
        </View>

        <View style={styling.content}>
          <SignupForm
            authSignin={authSignin}
            authSignup={authSignup}
            authSignupRequest={authSignupRequest}
          />
        </View>
      </View>
    </React.Fragment>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 48, 
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  content: {
  },
  footer: {
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    height: 80,
  },
  actionText: {
    fontWeight: '500',
    letterSpacing: 0,
    color: theme.colors.primary,
  },
})

Auth.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  authSignin: PropTypes.any,
  authSignup: PropTypes.any,
  authSignupRequest: PropTypes.any,
}

export default withTranslation()(withTheme(Auth))
