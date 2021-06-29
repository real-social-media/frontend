import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import prop from 'ramda/src/prop'
import head from 'ramda/src/head'
import compose from 'ramda/src/compose'
import groupBy from 'ramda/src/groupBy'
import memoizeWith from 'ramda/src/memoizeWith'
import { withTheme } from 'react-native-paper'
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view'
import { withTranslation } from 'react-i18next'

export const a11y = {
  openBtn: 'Open country code modal',
  closeBtn: 'Close country code modal',
  modal: 'Country Code Modal',
}

export const filterOptions = (search, options) => {
  if (!search) return options

  const filter = search.toUpperCase()

  return options.filter((item) => {
    return (
      item.label.toUpperCase().indexOf(filter) > -1 ||
      item.value.indexOf(filter) > -1 ||
      item.dialCode.indexOf(filter) > -1
    )
  })
}

const keyExtractor = (item, index) => `${item.value}-${index}`
const formatGroup = (options) => Object.keys(options).map((key) => ({ title: key, data: options[key] }))
const groupByFirstLetter = groupBy(compose(head, prop('label')))
const memoizedFilter = memoizeWith((search) => search, filterOptions)

const CountryCode = ({ t, theme, value, options, onChange }) => {
  const [visible, setVisible] = useState(false)
  const [search, handleSearch] = useState('')
  const styling = styles(theme)
  const active = find(propEq('value', value), options)

  const handleOpen = () => {
    setVisible(true)
  }

  const handleClose = () => {
    setVisible(false)
  }

  const handleChange = (item) => {
    handleClose()
    onChange(item)
  }

  const sections = formatGroup(groupByFirstLetter(memoizedFilter(search, options)))

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleChange(item)}>
      <View style={styling.row} accessibilityRole="radio">
        <Text style={styling.label} numberOfLines={1} ellipsizeMode="tail">
          {item.label}
        </Text>
        <Text style={styling.value}>{item.dialCode}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderSectionHeader = ({ section: { title } }) => <Text style={styling.sectionHeader}>{title}</Text>

  return (
    <View>
      <TouchableOpacity
        style={styling.openBtn}
        onPress={handleOpen}
        accessibilityLabel={a11y.openBtn}
        accessibilityRole="button"
      >
        <Text style={styling.flag}>{active?.flag}</Text>
        <Text style={styling.dialCode}>{active?.dialCode}</Text>
      </TouchableOpacity>
      <Modal
        presentationStyle="formSheet"
        animationType="slide"
        accessibilityLabel={a11y.modal}
        visible={visible}
        onDismiss={handleClose}
        onRequestClose={handleClose}
      >
        <View style={styling.modal}>
          <View style={styling.header}>
            <TextInput
              style={styling.searchInput}
              value={search}
              onChangeText={handleSearch}
              placeholder="Search"
              clearButtonMode="always"
              keyboardShouldPersistTaps="always"
            />
            <TouchableOpacity
              style={styling.closeBtn}
              onPress={handleClose}
              accessibilityLabel={a11y.closeBtn}
              accessibilityRole="button"
            >
              <Text style={styling.closeBtnText}>{t('Close')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styling.inner}>
            <KeyboardAwareSectionList
              sections={sections}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    openBtn: {
      backgroundColor: theme.colors.backgroundSecondary,
      paddingHorizontal: 8,
      borderRadius: 4,
      height: 42,
      marginRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    flag: {
      fontSize: 30,
      marginRight: 8,
    },
    dialCode: {
      fontSize: 14,
    },
    sectionHeader: {
      fontWeight: '700',
      fontSize: 16,
      paddingHorizontal: 10,
      paddingTop: 16,
      backgroundColor: '#ffffff',
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      paddingVertical: 14,
      borderBottomColor: theme.colors.backgroundSecondary,
      borderBottomWidth: 1,
    },
    label: {
      fontSize: 16,
      marginRight: 10,
      flex: 1,
    },
    value: {
      fontWeight: '700',
      fontSize: 16,
      flexShrink: 0,
    },
    modal: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 0,
      backgroundColor: '#F7F7F7',
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 14,
    },
    inner: {
      flex: 1,
    },
    searchInput: {
      backgroundColor: '#E9E9E9',
      flexGrow: 1,
      flex: 1,
      marginRight: 10,
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 8,
      fontSize: 16,
    },
    closeBtn: {
      flexShrink: 0,
    },
    closeBtnText: {
      fontSize: 16,
      color: '#3498db',
    },
  })

CountryCode.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      flag: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      dialCode: PropTypes.string.isRequired,
      mask: PropTypes.string,
    }),
  ),
}

CountryCode.defaultProps = {
  options: [],
}

export default withTranslation()(withTheme(CountryCode))
