import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Federated = ({
  theme,
  authFacebook,
  authFacebookRequest,
  authGoogle,
  authGoogleRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

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
}

const styles = theme => StyleSheet.create({
  root: {
  },
  item: {
    marginBottom: 12,
  },
})

export default withTheme(Federated)
