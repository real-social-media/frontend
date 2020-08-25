import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import InfoIcon from 'assets/svg/verification/Info'
import CameraIcon from 'assets/svg/verification/Camera'
import CropIcon from 'assets/svg/verification/Crop'
import RotateIcon from 'assets/svg/verification/Rotate'
import ShareIcon from 'assets/svg/verification/Share'
import * as navigationActions from 'navigation/actions'
import color from 'color'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Verification = ({
  t,
  theme,
  handleBackAction,
  handleHideAction,
  handleHomeAction,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const route = useRoute()

  return (
    <View style={styling.root}>
      <TouchableOpacity style={styling.backdrop} onPress={navigationActions.navigateBack(navigation)} />
    
      <SafeAreaView style={styling.component}>
        <View style={styling.heading}>
          <View style={styling.info}>
            <InfoIcon fill={theme.colors.text} />
          </View>
          <Text style={styling.headingTitle}>{t('Post Verification Criteria')}</Text>
          <Text style={styling.headingSubtitle}>{t('Add an Unmodified Profile Picture. Our AI detects photoshop and filters')}</Text>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <CropIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('No Cropping')}</Text>
            <Text style={styling.subheadingSubtitle}>
              {t('The Photo must be')} <Text style={styling.strong}>{t('uncropped')}</Text>
            </Text>
          </View>
        </View>

        <View style={styling.subheading}>
          <View style={styling.subheadingIcon}>
            <RotateIcon fill={theme.colors.text} />
          </View>
          <View style={styling.subheadingContent}>
            <Text style={styling.subheadingTitle}>{t('No Rotation')}</Text>
            <Text style={styling.subheadingSubtitle}>
              {t('The Photo must be')} <Text style={styling.strong}>{t('unrotated')}</Text>
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

        <View style={styling.description}>
          <Text style={styling.descriptionText}>{t('Unverified posts can’t be trending/discovered, used as profile pictures, or used in dating. They can only be seen by your followers')}</Text>
        </View>

        {route.params && route.params.actionType === 'BACK' ?
          <View style={styling.action}>
            <DefaultButton label={t('Go Back')} onPress={handleBackAction} />
          </View>
        : null}

        {route.params && route.params.actionType === 'HIDE' ?
          <React.Fragment>
            <View style={styling.action}>
              <DefaultButton label={t('Go Back')} onPress={handleBackAction} />
            </View>

            <View style={styling.action}>
              <DefaultButton label={t('Hide and Proceed')} onPress={handleHideAction} />
            </View>
          </React.Fragment>
        : null}

        {route.params && route.params.actionType === 'HOME' ?
          <View style={styling.action}>
            <DefaultButton label={t('Hide and Proceed')} onPress={handleHomeAction} />
          </View>
        : null}
      </SafeAreaView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
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
    color: color(theme.colors.text).fade(.4),
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
    color: color(theme.colors.text).fade(.4),
  },
  strong: {
    fontWeight: '500',
    color: color(theme.colors.text).fade(.4),
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
  handleBackAction: PropTypes.any,
  handleHideAction: PropTypes.any,
  handleHomeAction: PropTypes.any,
}

export default withTranslation()(withTheme(Verification))
