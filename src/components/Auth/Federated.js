import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Federated = ({
  t,
  theme,
  authFacebook,
  authFacebookRequest,
  authGoogle,
  authGoogleRequest,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <View style={styling.item}>
        <DefaultButton label={t('Login with Google')} onPress={authGoogleRequest} loading={authGoogle.status === 'loading'} />
      </View>
    </View>
  )
}

Federated.propTypes = {
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

export default withTranslation()(withTheme(Federated))
