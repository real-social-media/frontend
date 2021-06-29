import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, SafeAreaView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import InfoIcon from 'assets/svg/verification/Info'
import color from 'color'
import ActionsComponent from 'components/AuthHome/Actions'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const ProfileUpgrade = ({
  t,
  theme,
  handleClose,
  authSigninGoogle,
  authSigninGoogleRequest,
  authSigninApple,
  authSigninAppleRequest,
  authSigninAnonymous,
  authSigninAnonymousRequest,
  navigateSignin,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <TouchableOpacity style={styling.backdrop} onPress={handleClose} />

      <SafeAreaView style={styling.component}>
        <View style={styling.heading}>
          <View style={styling.info}>
            <InfoIcon fill={theme.colors.text} />
          </View>
          <Text style={styling.headingTitle}>{t('Join REAL')}</Text>
          <Text style={styling.headingSubtitle}>
            {t('The Healthier Social Media Movement')}
          </Text>
        </View>

        <View style={styling.actions}>
          <ActionsComponent
            authSigninGoogle={authSigninGoogle}
            authSigninGoogleRequest={authSigninGoogleRequest}
            authSigninApple={authSigninApple}
            authSigninAppleRequest={authSigninAppleRequest}
            authSigninAnonymous={authSigninAnonymous}
            authSigninAnonymousRequest={authSigninAnonymousRequest}
            hideAnonymousBtn
          />
        </View>

        <View style={styling.footer}>
          <Text style={styling.descriptionText}>
            {t('You must create an account to chat, follow, create, like or use dating.' )}
          </Text>
          <DefaultButton label={t('Already Have an Account? Log In')} onPress={navigateSignin} style={styling.signInBtn} />
        </View>
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
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
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
    actions: {
      paddingHorizontal: 24,
      paddingVertical: 12,
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
    strong: {
      fontWeight: '500',
      color: color(theme.colors.text).fade(0.4).string(),
    },
    footer: {
      paddingHorizontal: theme.spacing.base * 2,
      marginBottom: theme.spacing.base,
    },
    descriptionText: {
      fontSize: 12,
      fontWeight: '300',
      paddingBottom: 6,
      textAlign: 'center',
      marginBottom: theme.spacing.base * 3,
    },
    signInBtn: {
      backgroundColor: '#333333',
    },
  })

ProfileUpgrade.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  handleClose: PropTypes.any,
  authSigninGoogle: PropTypes.any,
  authSigninGoogleRequest: PropTypes.any,
  authSigninApple: PropTypes.any,
  authSigninAppleRequest: PropTypes.any,
  authSigninAnonymous: PropTypes.any,
  authSigninAnonymousRequest: PropTypes.any,
  navigateSignin: PropTypes.func,
}

export default withTranslation()(withTheme(ProfileUpgrade))
