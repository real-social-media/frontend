import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, SafeAreaView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import InfoIcon from 'assets/svg/verification/Info'
import CameraIcon from 'assets/svg/verification/Camera'
import CropIcon from 'assets/svg/verification/Crop'
import RotateIcon from 'assets/svg/verification/Rotate'
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
            <InfoIcon fill={theme.colors.text} />
          </View>
          <Text style={styling.headingTitle}>{t('Post Verification Criteria')}</Text>
          <Text style={styling.headingSubtitle}>
            {t('Add an Unmodified Profile Picture. Our AI detects photoshop and filters')}
          </Text>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <CropIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('No Cropping Outside REAL')}</Text>
            <Text style={styling.subheadingSubtitle}>
              {t('You can crop it')} <Text style={styling.strong}>{t('inside the REAL app')}</Text>
            </Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <RotateIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('No Rotation Outside REAL')}</Text>
            <Text style={styling.subheadingSubtitle}>
              {t('You can rotate it')} <Text style={styling.strong}>{t('inside the REAL app')}</Text>
            </Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <ShareIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('Origin Check')}</Text>
            <Text style={styling.subheadingSubtitle}>
              {t('The Photo must have been')} <Text style={styling.strong}>{t('taken on this phone')}</Text>
            </Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <CameraIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('In-app Camera')}</Text>
            <Text style={styling.subheadingSubtitle}>
              {t('Photos taken using the camera inside the REAL app will always pass verification')}
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
          <Text style={styling.descriptionText}>
            {t(
              'Verified posts will be boosted to the top of the explore page, and be more discoverable. Unverified posts can\'t be used in REAL Dating',
            )}
          </Text>
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
      paddingVertical: 12,
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
    },
    strong: {
      fontWeight: '500',
      color: color(theme.colors.text).fade(0.4).string(),
    },
    description: {
      paddingHorizontal: 48,
      paddingVertical: 24,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
    descriptionText: {
      fontSize: 12,
      fontWeight: '300',
      paddingBottom: 6,
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
