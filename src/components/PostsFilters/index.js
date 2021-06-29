import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, SafeAreaView, StyleSheet, View } from 'react-native'
import { withTheme, Text } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import ToggleButton from 'components/ToggleButton'

const OPTIONS = {
  ALL: undefined,
  VERIFIED: true,
  NOT_VERIFIED: false,
  VIEWED: 'VIEWED',
  NOT_VIEWED: 'NOT_VIEWED',
}

const PostsFilters = ({ t, theme, handleClose, handleFilterChange, initialValues }) => {
  const styling = styles(theme)
  const [isVerified, setVerified] = useState(initialValues.isVerified)
  const [viewedStatus, setViewedStatus] = useState(initialValues.viewedStatus)

  const handleSubmit = () => {
    handleFilterChange({ isVerified, viewedStatus })
    handleClose()
  }

  const handleReset = () => {
    setVerified(OPTIONS.ALL)
    setViewedStatus(OPTIONS.ALL)
  }

  return (
    <View style={styling.overlay}>
      <TouchableOpacity style={styling.backdrop} onPress={handleClose} />
      <SafeAreaView style={styling.modal}>
        <View style={styling.header}>
          <TouchableOpacity style={styling.resetBtn} onPress={handleReset}>
            <Text>{t('Clear All')}</Text>
          </TouchableOpacity>
          <Text style={styling.headerTitle}>{t('Filters')}</Text>
          <TouchableOpacity style={styling.closeBtn} onPress={handleClose}>
            <Text>{t('Close')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styling.inner}>
          <ToggleButton
            value={isVerified}
            onChange={setVerified}
            options={[
              { label: t('All'), value: OPTIONS.ALL },
              { label: t('Authenticated'), value: OPTIONS.VERIFIED },
              { label: t('Unauthenticated'), value: OPTIONS.NOT_VERIFIED },
            ]}
          />
          <ToggleButton
            value={viewedStatus}
            onChange={setViewedStatus}
            options={[
              { label: t('All'), value: OPTIONS.ALL },
              { label: t('Viewed'), value: OPTIONS.VIEWED },
              { label: t('Unviewed'), value: OPTIONS.NOT_VIEWED },
            ]}
          />
          <DefaultButton onPress={handleSubmit} style={styling.submitBtn} label={t('Apply Filters')} />
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    overlay: {
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
    modal: {
      borderRadius: 24,
      backgroundColor: theme.colors.backgroundSecondary,
    },
    inner: {
      paddingHorizontal: 24,
    },
    header: {
      padding: 24,
      paddingBottom: 0,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: '600',
      flex: 3,
      textAlign: 'center',
    },
    resetBtn: {
      flex: 3,
    },
    closeBtn: {
      flex: 3,
      alignItems: 'flex-end',
    },
    submitBtn: {
      marginTop: 10,
    },
  })

PostsFilters.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  handleClose: PropTypes.func,
  handleFilterChange: PropTypes.func,
  initialValues: PropTypes.shape({
    isVerified: PropTypes.bool,
    viewedStatus: PropTypes.oneOf([OPTIONS.VIEWED, OPTIONS.NOT_VIEWED]),
  }),
}

export default withTranslation()(withTheme(PostsFilters))
