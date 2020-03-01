import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
} from 'react-native'
import { Paragraph } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Verification = ({
  theme,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <ScrollView style={styling.root}>
      <Paragraph style={styling.paragraph}>{t('On REAL, we don\'t want you to feel like you need likes')}.</Paragraph>
      <Paragraph style={styling.paragraph}>{t('It\'s our goal to keep you mentally healthy')}.</Paragraph>
      <Paragraph style={styling.paragraph}>{t('For that reason, nobody can see a posts total likes, or who liked it, aside from the first person to like the post')}.</Paragraph>
    </ScrollView>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 12,
  },
})

Verification.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(Verification)
