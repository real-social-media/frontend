import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, SafeAreaView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import SpaceshipIcon from 'assets/svg/verification/Spaceship'
import CameraIcon from 'assets/svg/verification/Camera'
import CropIcon from 'assets/svg/verification/Crop'
import ShareIcon from 'assets/svg/verification/Share'
import PhoneIcon from 'assets/svg/verification/Phone'
import color from 'color'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import testIDs from './test-ids'

export const VERIFICATION_TYPE = {
  HOME: 'HOME',
  CONTINUE: 'CONTINUE',
  HIDE: 'HIDE',
  BACK: 'BACK',
}

const Verification = ({
  t,
  theme,
  handleBackAction,
  handleHideAction,
  handleContinueAction,
  handleClose,
  actionType,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <TouchableOpacity testID={testIDs.backdrop} style={styling.backdrop} onPress={handleClose} />

      <SafeAreaView style={styling.component}>
        <View style={styling.heading}>
          <View style={styling.info}>
            <SpaceshipIcon fill={theme.colors.text} />
          </View>
          <Text style={styling.headingTitle}>{t('Trending Tips')}</Text>
          <Text style={styling.headingSubtitle}>
            {t('You’re perfect! Verify future posts to get them trending faster!')}
          </Text>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <CameraIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('In-app Camera')}</Text>
            <Text style={styling.subheadingSubtitle}>
              {t('Photos/Videos taken inside this app are always verified & boosted towards the top of trending')}
            </Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <CropIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('Cropping/Rotating')}</Text>
            <Text style={styling.subheadingSubtitle}>
              {t('Be sure to crop/rotate images within this app to ensure they pass verification.')}
            </Text>
            <Text style={styling.subheadingSubtitle}>
              {t('Our app can’t tell what was changed about a photo, it only knows if it was modified by another app.')}
            </Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <ShareIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('Copyright Origin Check')}</Text>
            <Text style={styling.subheadingSubtitle}>
              {t('The Photo must have been')} <Text style={styling.strong}>{t('taken using this device')}</Text>{' '}
              {t('to pass verification')}
            </Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <PhoneIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('Device must be an iPhone7 or newer')}</Text>
            <Text style={styling.subheadingSubtitle}>{t('Photo must have been taken using the iOS camera app')}</Text>
          </View>
        </View>

        <View style={styling.description}>
          <Text style={styling.descriptionText}>{t('You’re perfect the way you are.')}</Text>
          <Text style={styling.descriptionText}>{t('On REAL, you’re more likely to go viral by being yourself!')}</Text>
        </View>

        {actionType === VERIFICATION_TYPE.BACK ? (
          <View style={styling.action}>
            <DefaultButton label={t('Go Back')} onPress={handleBackAction} />
          </View>
        ) : null}

        {actionType === VERIFICATION_TYPE.HIDE ? (
          <React.Fragment>
            <View style={styling.action}>
              <DefaultButton label={t('Go Back')} onPress={handleBackAction} />
            </View>

            <View style={styling.action}>
              <DefaultButton label={t('Hide and Proceed')} onPress={handleHideAction} />
            </View>
          </React.Fragment>
        ) : null}

        {actionType === VERIFICATION_TYPE.HOME ? (
          <View style={styling.action}>
            <DefaultButton label={t('Hide and Proceed')} onPress={handleBackAction} />
          </View>
        ) : null}

        {actionType === VERIFICATION_TYPE.CONTINUE ? (
          <View style={styling.action}>
            <DefaultButton label={t('Continue')} onPress={handleContinueAction} />
          </View>
        ) : null}
      </SafeAreaView>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFill,
    },
    component: {
      borderRadius: 24,
      backgroundColor: theme.colors.backgroundSecondary,
    },

    info: {
      alignItems: 'center',
      paddingBottom: 12,
    },
    heading: {
      paddingHorizontal: 48,
      paddingVertical: 24,
    },
    subheading: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 6,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
    action: {
      padding: theme.spacing.base,
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
      marginBottom: 6,
    },
    strong: {
      fontWeight: '500',
      color: color(theme.colors.text).fade(0.4).string(),
    },
    description: {
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 10,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
    descriptionText: {
      fontSize: 12,
      fontWeight: '300',
      marginBottom: 6,
      textAlign: 'center',
    },
  })

Verification.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  handleBackAction: PropTypes.func,
  handleHideAction: PropTypes.func,
  handleContinueAction: PropTypes.func,
  handleClose: PropTypes.func,
  actionType: PropTypes.oneOf(Object.values(VERIFICATION_TYPE)),
}

export default withTranslation()(withTheme(Verification))
