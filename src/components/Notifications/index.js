import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Paragraph, Title } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Notifications = ({
  theme,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <Title style={styling.title}>{t('Notifications Coming Soon')}</Title>
      <Paragraph style={styling.paragraph}>{t('REAL is fully Open Source & built by the people')}. {t('Help us move faster by contributing code')}.</Paragraph>
    </View>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  paragraph: {
    textAlign: 'center',
    maxWidth: 280,
  },
})

Notifications.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(Notifications)
