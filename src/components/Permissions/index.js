import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Text } from 'react-native-paper'
import FeatureComponent from 'templates/Feature'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Permissions = ({
  t,
  theme,
  openSettings,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <View>
        <View style={styling.features}>
          <FeatureComponent active>Open the "Settings" app on your iPhone or iPad.</FeatureComponent>
          <FeatureComponent active>Tap the "Privacy" menu item.</FeatureComponent>
          <FeatureComponent active>Tap the "Photos" menu item.</FeatureComponent>
          <FeatureComponent active>Find "REAL" in the list of apps and tap it.</FeatureComponent>
          <FeatureComponent active>Tap the "Read and Write" option to allow photo access by the REAL app.</FeatureComponent>
        </View>
      </View>

      <View style={styling.action}>
        <DefaultButton label={t('Privacy Settings')} onPress={openSettings} />
      </View>
    </View>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    justifyContent: 'center',
  },
  title: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: theme.spacing.base,
  },
  titlePrimary: {
    backgroundColor: theme.colors.primary,
  },
  features: {
    marginVertical: 6,
  },
  action: {
    padding: theme.spacing.base,
  },
})

Permissions.propTypes = {
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Permissions))
