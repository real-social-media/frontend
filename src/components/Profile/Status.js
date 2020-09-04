import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Caption, Text } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfileStatus = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <TouchableOpacity onPress={navigationActions.navigatePayout(navigation)}>
        <Text>
          <Caption>{t('You will be paid {{amount}} dollars per view from other diamond members', { amount: '$0.11' })} </Caption>
          <Caption style={styling.link}>{t('learn more')}</Caption>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.base,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
})

ProfileStatus.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(ProfileStatus))
