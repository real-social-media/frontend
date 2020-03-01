import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import Modal from 'react-native-modal'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Provider as PaperProvider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import * as themeSelector from 'store/ducks/theme/selectors'

import { withTheme, Paragraph } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const ThemeModal = ({
  theme,
  isVisible,
  children,
  onApplyClick,
  onDiscardClick,
}) => {
  const activeTheme = useSelector(themeSelector.userThemeSelector('black.green'))

  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <Modal isVisible={isVisible}>
      <View style={styling.root}>
        <View style={styling.header}>
          <PaperProvider theme={activeTheme}>
            <View style={styling.action}>
              <Paragraph style={styling.text}>{t('This is preview of selected theme')}</Paragraph>
            </View>

            <View style={styling.action}>
              <View style={styling.actionItem}>
                <DefaultButton label={t('Apply Theme')} onPress={onApplyClick} />
              </View>
              <View style={styling.actionItem}>
                <DefaultButton label={t('Discard Theme')} onPress={onDiscardClick} />
              </View>
            </View>
          </PaperProvider>
        </View>

        <View style={styling.screen}>
          <View style={styling.screenPlaceholder} />
          {children}
        </View>
      </View>
    </Modal>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    backgroundColor: '#2f3542',
    marginVertical: 40,
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  header: {
    height: 120,
  },
  text: {
    padding: 12,
  },
  screen: {
    flex: 1,
  },
  screenPlaceholder: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  action: {
    flexDirection: 'row',
  },
  actionItem: {
    flex: 1,
    padding: theme.spacing.base,
  },
})

ThemeModal.propTypes = {
  theme: PropTypes.any,
  isVisible: PropTypes.any,
  children: PropTypes.any,
  onApplyClick: PropTypes.any,
  onDiscardClick: PropTypes.any,
}

export default withTheme(ThemeModal)
