import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, StyleSheet, ScrollView, View, RefreshControl } from 'react-native'
import color from 'color'
import { Text, withTheme } from 'react-native-paper'
import DiamondHeaderIcon from 'assets/svg/membership/Diamond'
import ProfileIcon from 'assets/svg/membership/Profile'
import DatingIcon from 'assets/svg/membership/Dating'
import ThemesIcon from 'assets/svg/membership/Themes'
import SupportIcon from 'assets/svg/membership/Support'
import DiamondIcon from 'assets/svg/settings/Diamond'
import WalletIcon from 'assets/svg/membership/Wallet'
import VerifiedIcon from 'assets/svg/membership/Verified'
import MusicIcon from 'assets/svg/membership/Music'
import AppleIcon from 'assets/svg/auth/Apple'
import StickerIcon from 'assets/svg/membership/Sticker'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import AuthTermsTemplate from 'templates/Auth/Terms'
import { withTranslation } from 'react-i18next'

const Membership = ({
  t,
  theme,
  navigateInviteFriends,
  requestSubscription,
  manageSubscriptions,
  subscriptionGet,
  subscriptionGetRequest,
  isSubscribed,
  purchasesRequest,
  retryPurchase,
  handleContactUs,
  retryPurchaseRequest,
  navigatePayouts,
  navigateTheme,
}) => {
  const styling = styles(theme)
  const hasError = [purchasesRequest.status, retryPurchase.status].includes('failure')

  const renderRetry = () => (
    <>
      <DefaultButton
        style={styling.tryAgainBtn}
        labelStyle={styling.labelStyle}
        label={t('Retry Subscription')}
        onPress={retryPurchaseRequest}
        loading={retryPurchase.status === 'loading'}
        disabled={retryPurchase.status === 'loading'}
      />
      <Text onPress={handleContactUs} style={styling.text}>
        {t('Or contact us')}
      </Text>
    </>
  )

  const renderUnsubscribe = () => (
    <DefaultButton
      labelStyle={styling.unsubscribeBtnLabel}
      mode="outlined"
      label={t('Unsubscribe')}
      onPress={manageSubscriptions}
    />
  )

  const renderSubscribe = () => {
    if (subscriptionGet.status === 'failure') {
      return (
        <View>
          <DefaultButton labelStyle={styling.labelStyle} label={t('Loading price failed')} icon={AppleIcon} disabled />
          <Text style={styling.failedPriceLabel}>{t('Pull down to refresh')}</Text>
        </View>
      )
    }

    if (subscriptionGet.status !== 'success') {
      return (
        <DefaultButton labelStyle={styling.labelStyle} label={t('Loading price')} icon={AppleIcon} loading disabled />
      )
    }

    return (
      <DefaultButton
        labelStyle={styling.labelStyle}
        label={t('Subscribe for {{localizedPrice}} month', subscriptionGet.data)}
        icon={AppleIcon}
        onPress={requestSubscription}
        loading={purchasesRequest.status === 'loading'}
        disabled={purchasesRequest.status === 'loading'}
      />
    )
  }

  return (
    <ScrollView
      style={styling.root}
      refreshControl={
        <RefreshControl
          tintColor={theme.colors.border}
          onRefresh={subscriptionGetRequest}
          refreshing={subscriptionGet.status === 'loading'}
        />
      }
    >
      <SafeAreaView style={styling.component}>
        <View style={styling.heading}>
          <View style={styling.info}>
            <DiamondHeaderIcon fill={theme.colors.text} />
          </View>
          <Text style={styling.headingTitle}>{t('REAL Diamond')}</Text>
          <Text style={styling.headingSubtitle}>{t('Membership Perks')}</Text>
          {hasError ? renderRetry() : isSubscribed ? renderUnsubscribe() : renderSubscribe()}
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <WalletIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>
              <Text style={styling.link} onPress={navigatePayouts}>
                {t('Creator Payouts')}
              </Text>
              {t(' (coming soon)')}
            </Text>
            <Text style={styling.subheadingSubtitle}>{t('We pay you for each view received on posts')}</Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <ThemesIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={[styling.subheadingTitle, styling.link]} onPress={navigateTheme}>
              {t('Profile Themes')}
            </Text>
            <Text style={styling.subheadingSubtitle}>{t('Change the look and feel of your profile')}</Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <MusicIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('Profile Music (coming soon)')}</Text>
            <Text style={styling.subheadingSubtitle}>{t('Have a song play when people visit your profile')}</Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <VerifiedIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('Verified Accounts (coming soon)')}</Text>
            <Text style={styling.subheadingSubtitle}>{t('Verify your identity & boost your posts')}</Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <DiamondIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('Diamond Badge')}</Text>
            <Text style={styling.subheadingSubtitle}>{t('A shiny badge next to your username')}</Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <StickerIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('Emotes (coming soon)')}</Text>
            <Text style={styling.subheadingSubtitle}>{t('React to posts with new emoticons each month')}</Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <ProfileIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('Profile Trending Boost')}</Text>
            <Text style={styling.subheadingSubtitle}>{t('Your posts are more likely to become trending')}</Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <DatingIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('Dating Match Boost')}</Text>
            <Text style={styling.subheadingSubtitle}>{t('People are more likely to discover you in dating')}</Text>
          </View>
        </View>

        <View style={[styling.subheading, styling.lastChild]}>
          <View style={styling.subheadingIcon}>
            <SupportIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('Live Chat Support (coming soon)')}</Text>
            <Text style={styling.subheadingSubtitle}>{t('Chat with us 24/7, we are at your service')}</Text>
          </View>
        </View>

        {isSubscribed === false && (
          <View style={styling.action}>
            <DefaultButton
              labelStyle={styling.labelStyle}
              label={t('Get Free Diamond For Life')}
              onPress={navigateInviteFriends}
              mode="outlined"
            />
          </View>
        )}

        <AuthTermsTemplate />
      </SafeAreaView>
    </ScrollView>
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
      paddingHorizontal: 24,
      paddingVertical: 24,
    },
    subheading: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
    action: {
      paddingHorizontal: theme.spacing.base,
      marginTop: 24,
      marginBottom: 12,
    },
    labelStyle: {
      marginLeft: 12,
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
      marginBottom: 24,
    },
    subheadingIcon: {
      paddingRight: 24,
      paddingTop: 6,
    },
    subheadingContent: {
      flex: 1,
    },
    subheadingTitle: {
      fontSize: 15,
      paddingBottom: 6,
      fontWeight: '500',
    },
    subheadingSubtitle: {
      fontWeight: '400',
      color: color(theme.colors.text).fade(0.4).string(),
    },
    link: {
      fontSize: 15,
      paddingBottom: 6,
      fontWeight: '500',
      textDecorationLine: 'underline',
      textDecorationColor: color(theme.colors.text).fade(0.4).string(),
    },
    lastChild: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    text: {
      fontSize: 14,
      fontWeight: '300',
      paddingBottom: 6,
      textAlign: 'center',
    },
    failedPriceLabel: {
      fontSize: 14,
      fontWeight: '300',
      paddingVertical: 6,
      textAlign: 'center',
    },
    unsubscribeBtnLabel: {
      color: theme.colors.text,
    },
    tryAgainBtn: {
      marginBottom: 20,
    },
    manageSubscriptionsBtn: {
      marginBottom: 20,
    },
    separateText: {
      textAlign: 'center',
      fontSize: 14,
      paddingVertical: 6,
      color: color(theme.colors.text).fade(0.4).string(),
    },
  })

Membership.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  isSubscribed: PropTypes.bool,
  requestSubscription: PropTypes.func,
  manageSubscriptions: PropTypes.func,
  handleContactUs: PropTypes.func,
  retryPurchaseRequest: PropTypes.func,
  purchasesRequest: PropTypes.shape({
    status: PropTypes.string,
  }),
  retryPurchase: PropTypes.shape({
    status: PropTypes.string,
  }),
  subscriptionGet: PropTypes.shape({
    status: PropTypes.string,
    data: PropTypes.shape({
      localizedPrice: PropTypes.string,
    }),
  }),
  subscriptionGetRequest: PropTypes.func,
  navigateInviteFriends: PropTypes.func,
  navigatePayouts: PropTypes.func,
  navigateTheme: PropTypes.func,
}

Membership.defaultProps = {
  isSubscribed: false,
  isSubmitting: false,
}

export default withTranslation()(withTheme(Membership))
