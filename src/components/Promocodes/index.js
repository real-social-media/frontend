import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import color from 'color'
import { Text, withTheme } from 'react-native-paper'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import FormComponent from 'components/Promocodes/Form'
import CouponIcon from 'assets/svg/promocodes/Coupon'
import { withTranslation } from 'react-i18next'
import * as navigationActions from 'navigation/actions'

const Promocodes = ({ t, theme, navigation, handleFormSubmit, formSubmitLoading, formInitialValues, isSubscribed }) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <View style={styling.heading}>
        <View style={styling.info}>
          <CouponIcon fill={theme.colors.text} />
        </View>
        <Text style={styling.headingTitle}>{t('Promocodes')}</Text>
        {isSubscribed ? (
          <Text style={styling.headingSubtitle}>{t('Redeem your promocode')}</Text>
        ) : (
          <Text style={styling.headingSubtitle}>
            {t('Redeem promocode to get \n ')}
            <Text style={styling.link} onPress={() => navigationActions.navigateMembership(navigation)}>
              {t('REAL Diamond')}
            </Text>
            {t(' FREE for life!')}
          </Text>
        )}
      </View>
      <View style={styling.inner}>
        <FormComponent
          handleFormSubmit={handleFormSubmit}
          formSubmitLoading={formSubmitLoading}
          formInitialValues={formInitialValues}
        />
      </View>
      {!isSubscribed && (
        <View style={styling.footer}>
          <DefaultButton
            label={t('Follow & Invite Friends')}
            onPress={navigationActions.navigateInviteFriends(navigation)}
            mode="outlined"
          />
        </View>
      )}
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    info: {
      alignItems: 'center',
      paddingBottom: 12,
    },
    heading: {
      paddingHorizontal: 48,
      paddingVertical: 24,
      flexShrink: 0,
    },
    subheading: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
    headingTitle: {
      fontSize: 22,
      fontWeight: '600',
      paddingBottom: 6,
      textAlign: 'center',
    },
    headingSubtitle: {
      fontSize: 16,
      fontWeight: '400',
      color: color(theme.colors.text).fade(0.4).string(),
      textAlign: 'center',
    },
    link: {
      fontSize: 18,
      textDecorationLine: 'underline',
      color: theme.colors.primary,
    },
    inner: {
      flex: 1,
      paddingHorizontal: 24,
    },
    footer: {
      flexShrink: 0,
      paddingHorizontal: 24,
      paddingVertical: 48,
    },
  })

Promocodes.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  navigation: PropTypes.any,
  handleFormSubmit: PropTypes.func,
  formSubmitLoading: PropTypes.bool,
  formInitialValues: PropTypes.shape({
    code: PropTypes.string,
  }),
  isSubscribed: PropTypes.bool,
}

export default withTranslation()(withTheme(Promocodes))
