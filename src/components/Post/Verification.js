import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { BlurView } from '@react-native-community/blur'
import FeatureComponent from 'templates/Feature'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Verification = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  
  return (
    <BlurView style={styling.root}>
      <FeatureComponent active>{t('The Photo must be uncropped')}</FeatureComponent>
      <FeatureComponent active>{t('The Photo must be unrotated')}</FeatureComponent>
      <FeatureComponent active>{t('The Photo must have been taken on this phone (not sent to you)')}</FeatureComponent>
      <FeatureComponent active>{t('If you’re still having trouble, photos taken using the camera inside the REAL app will always pass verification')}</FeatureComponent>
    </BlurView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
  },
  blur: {
    width: '100%',
    height: '100%',
  },
})

Verification.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Verification))
