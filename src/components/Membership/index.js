import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, ScrollView } from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Text } from 'react-native-paper'
import FeatureComponent from 'templates/Feature'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Membership = ({ t, theme }) => {
  const styling = styles(theme)

  return (
    <ScrollView style={styling.root}>
      <View>
        <View style={styling.title}>
          <Text>Free</Text>
        </View>
        <View style={styling.features}>
          <FeatureComponent>REAL Social Media</FeatureComponent>
          <FeatureComponent>REAL Chat (Coming March 2020)</FeatureComponent>
        </View>
      </View>

      <View>
        <View style={[styling.title, styling.titlePrimary]}>
          <Text>Diamond</Text>
        </View>
        <View style={styling.features}>
          <FeatureComponent active>REAL Social Media</FeatureComponent>
          <FeatureComponent active>REAL Chat (Coming March 2020)</FeatureComponent>
          <FeatureComponent active>Get Paid $0.11 every view (from other Diamond members)</FeatureComponent>
          <FeatureComponent active>Access to Follow “Diamond Exclusive” Private Accounts</FeatureComponent>
          <FeatureComponent active>Diamond emblem next to your username</FeatureComponent>
          <FeatureComponent active>Personalize your profile with exclusive Colors, Themes, and Skins</FeatureComponent>
          <FeatureComponent active>Disable the REAL watermark when sharing posts</FeatureComponent>
          <FeatureComponent active>REAL Dating (Coming April 2020)</FeatureComponent>
        </View>
      </View>

      <View style={styling.action}>
        <DefaultButton label={t('Get Diamond In One Tap')} />
      </View>
    </ScrollView>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.backgroundPrimary,
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

Membership.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(Membership))
