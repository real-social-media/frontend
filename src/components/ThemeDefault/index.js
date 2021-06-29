import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, SafeAreaView, StyleSheet, View } from 'react-native'
import { Provider as PaperProvider, Text } from 'react-native-paper'
import NightIcon from 'assets/svg/other/Night'
import color from 'color'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { withTranslation } from 'react-i18next'
import testIDs from 'components/ThemeDefault/test-ids'

const ThemeDefault = ({ t, handleSkip, handleEnable, theme }) => {
  const styling = styles(theme)

  return (
    <PaperProvider theme={theme}>
      <View style={styling.root}>
        <TouchableOpacity testID={testIDs.backdrop} style={styling.backdrop} onPress={handleSkip} />

        <SafeAreaView style={styling.component}>
          <View style={styling.heading}>
            <View style={styling.info}>
              <NightIcon fill={theme.colors.text} />
            </View>
            <Text style={styling.headingTitle}>{t('Dark Mode')}</Text>
            <Text style={styling.headingSubtitle}>{t('You can select any theme later in profile settings')}</Text>
          </View>

          <View style={styling.footer}>
            <DefaultButton label={t('Enable')} onPress={handleEnable} style={styling.primaryBtn} />
            <DefaultButton label={t('Skip')} onPress={handleSkip} mode="outlined" />
          </View>
        </SafeAreaView>
      </View>
    </PaperProvider>
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
    footer: {
      paddingHorizontal: theme.spacing.base * 2,
      marginBottom: theme.spacing.base,
    },
    primaryBtn: {
      marginBottom: theme.spacing.base,
    },
  })

ThemeDefault.propTypes = {
  t: PropTypes.any,
  handleSkip: PropTypes.any,
  handleEnable: PropTypes.func,
  theme: PropTypes.any,
}

export default withTranslation()(ThemeDefault)
