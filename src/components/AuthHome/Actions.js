import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Actions = ({
  t,
  theme,
  authGoogle,
  authGoogleRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  
  return (
    <View style={styling.root}>
      <View style={styling.item}>
        <DefaultButton label={t('Use Phone or Email')} onPress={navigationActions.navigateAuthUsername(navigation)} loading={false} />
      </View>
      <View style={styling.item}>
        <DefaultButton label={t('Login with Google')} onPress={authGoogleRequest} loading={authGoogle.status === 'loading'} />
      </View>
    </View>
  )
}

Actions.propTypes = {
  theme: PropTypes.any,
  authFacebook: PropTypes.any,
  authFacebookRequest: PropTypes.any,
  authGoogle: PropTypes.any,
  authGoogleRequest: PropTypes.any,
  t: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
  },
  item: {
    marginBottom: 12,
  },
})

export default withTranslation()(withTheme(Actions))
