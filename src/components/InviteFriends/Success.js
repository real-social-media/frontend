import React from 'react'
import PropTypes from 'prop-types'
import LottieView from 'lottie-react-native'
import { ScrollView, SafeAreaView, View, StyleSheet } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import color from 'color'
import confettiAnimation from 'assets/animations/confetti.json'
import * as navigationActions from 'navigation/actions'
import DiamondHeaderIcon from 'assets/svg/membership/Diamond'
import DefaultButton from 'components/Formik/Button/DefaultButton'

const InviteFriendsSuccess = ({ t, theme }) => {
  const navigation = useNavigation()
  const styling = styles(theme)
  const navigateMembership = () => navigationActions.navigateMembership(navigation)

  return (
    <ScrollView style={styling.root}>
      <SafeAreaView style={styling.component}>
        <View style={styling.heading}>
          <View style={styling.info}>
            <DiamondHeaderIcon fill={theme.colors.text} />
          </View>
          <Text style={styling.headingTitle}>{t('Congratulations!')}</Text>
          <Text style={styling.headingSubtitle}>{t('You\'ve got free REAL Diamond')}</Text>
        </View>

        <View style={styling.inner}>
          <Text style={styling.text}>
            {t('You are one of our earliest members, part of a movement to help make social media “social” again!')}
          </Text>
          <Text style={styling.text}>
            {t('No longer will people grow up thinking what they see on Instagram is a normal lifestyle.')}
          </Text>
          <Text style={styling.text}>{t('We wouldn’t be here without you, and we won’t forget it.')}</Text>
          <Text style={styling.text}>
            {t('As a thank you for helping get the word out, we’ve given you free REAL Diamond for life!')}
          </Text>
        </View>

        <View style={styling.footer}>
          <DefaultButton label={t('Learn More')} onPress={navigateMembership} />
        </View>

        <LottieView style={styling.animation} source={confettiAnimation} autoPlay loop={false} />
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    component: {
      position: 'relative',
    },
    animation: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    info: {
      alignItems: 'center',
      paddingBottom: 12,
    },
    heading: {
      paddingHorizontal: 24,
      paddingVertical: 24,
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
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: '400',
      marginBottom: 14,
    },
    inner: {
      paddingHorizontal: 48,
      marginBottom: 12,
    },
    footer: {
      paddingHorizontal: 48,
      zIndex: 1,
    },
    primaryBtn: {
      marginBottom: 12,
    },
  })

InviteFriendsSuccess.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(InviteFriendsSuccess))
