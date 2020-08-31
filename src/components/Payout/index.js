import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Paragraph, Title, Caption, Subheading } from 'react-native-paper'
import Formula from 'components/Payout/Formula'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Payout = ({ t, theme }) => {
  const styling = styles(theme)

  return (
    <ScrollView style={styling.root}>
      <Title style={styling.title}>{t('Starting March of 2019')}</Title>
      <Subheading style={styling.title}>{t('Current Payout Per 💎View')}.</Subheading>

      <View style={styling.amount}>
        <Title>{t('{{amount}}', '$0.11')}</Title>
      </View>

      <Paragraph style={styling.paragraph}>
        {t(
          'We feel there are many influencers on Social Media getting paid to promote products that they don’t actually use or care about in real life',
        )}
        . {t('On REAL, you’ll get paid to be yourself')}.
      </Paragraph>
      <Paragraph style={styling.paragraph}>
        {t(
          'For every view you get from another diamond member, you’ll be paid the current payout per view rate (above)',
        )}
        . {t('We explain how it’s calculated below')}.
      </Paragraph>
      <Paragraph style={styling.paragraph}>{t('Tips to earning big on REAL')}:</Paragraph>
      <Paragraph style={styling.paragraph}>
        *{' '}
        {t(
          'You can restrict your account to only allow followers who have a diamond membership to ensure you’re getting paid for every view',
        )}
        .
      </Paragraph>
      <Paragraph style={styling.paragraph}>
        * {t('You can add an additional “Charge Users Monthly” fee, which requires followers to pay you each month')}.
      </Paragraph>

      <Title style={styling.title}>{t('Is Calculated')}:</Title>
      <Paragraph style={styling.paragraph}>{t('How “Current Payout Per 💎View” Is Calculated')}.</Paragraph>
      <Paragraph style={styling.paragraph}>
        {t(
          'This rate changes slightly throughout the day and is calculated in real time by our platform learning from the previous day’s views and revenues',
        )}
        .
      </Paragraph>

      <View style={styling.formula}>
        <Formula />
      </View>

      <Caption style={styling.paragraph}>
        * <Caption style={styling.bold}>{t('Total Revenue')}</Caption>:{' '}
        {t('The amount of money {{comapny}} earned over the past 30 days from all global REAL subscribers', {
          company: '“REAL.app, Inc.“',
        })}
        .
      </Caption>
      <Caption style={styling.paragraph}>
        * <Caption style={styling.bold}>{t('Processing Fees')}</Caption>:{' '}
        {t('Fees taken by our providers to operate our business')} (e.g Apple Pay, AWS)
      </Caption>
      <Caption style={styling.paragraph}>
        * <Caption style={styling.bold}>{t('Total 💎Views')}</Caption>:{' '}
        {t('Total views over the past 30 days of diamond member posts by other REAL diamond members')}.
      </Caption>
    </ScrollView>
  )
}

const styles = (theme) =>
  StyleSheet.create({
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
    amount: {
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
      marginBottom: 24,
      backgroundColor: theme.colors.primary,
    },
    formula: {
      marginTop: 12,
      marginBottom: 24,
    },
    bold: {
      fontWeight: '500',
      color: theme.colors.text,
    },
  })

Payout.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(Payout))
