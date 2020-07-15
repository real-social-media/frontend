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

const Actions = ({
  t,
  theme,
  authSignoutRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  
  return (
    <View style={styling.root}>
      <View style={styling.item}>
        <DefaultButton testID="components/AuthCognito/Actions/retry" label={t('Try Again')} onPress={authSignoutRequest} loading={false} mode="outline" />
      </View>
    </View>
  )
}

Actions.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  authSignoutRequest: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
  },
  item: {
    marginBottom: 12,
  },
})

export default withTranslation()(withTheme(Actions))
