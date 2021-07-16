import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from 'react-native'
import { withTranslation } from 'react-i18next'
import TagsCloud from 'templates/TagsCloud'
import TagsList from 'templates/TagsList'
import TextInput from 'components/TextInput'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import * as keywordsAPI from 'store/ducks/keywords/api'
import useAutocomplete from 'services/hooks/useAutocomplete'

export const a11y = {
  modal: 'Edit keywords modal',
  openBtn: 'Open keywords modal',
  closeBtn: 'Close keywords modal',
  inputBtn: 'Keywords input placeholder',
  autocomplete: {
    input: 'Keywords autocomplete field',
    tagsCloud: 'Keywords list',
  },
}

const uniqueTags = (tags) => [...new Set(tags)]
const joinTags = (...collections) => uniqueTags(collections.reduce((acc, item) => acc.concat(item), []))
const removeHashtag = (str) => str.replace('#', '')
const replaceAll = (search, replacement, str) => str.split(' ').map(item => item === search ? replacement : item).join(' ')
const searchTags = (str = '') => uniqueTags(str.match(/[#]+[A-Za-z0-9-_]+/g)).map(removeHashtag)

const FormKeywords = ({ t, values, setFieldValue }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const autocomplete = useAutocomplete(keywordsAPI.searchKeywords)
  const keywords = joinTags(searchTags(values.text), values.keywords)

  const handleAdd = (option) => {
    setFieldValue('keywords', [...keywords, option])
  }

  const handleRemove = (option) => {
    const value = keywords.filter((item) => item !== option)

    setFieldValue('text', replaceAll(`#${option}`, option, values.text))
    setFieldValue('keywords', value)
  }

  const handleToggle = (option, { isSelected }) => {
    if (isSelected) {
      handleRemove(option)
    } else {
      handleAdd(option)
    }
  }

  const handleSubmit = (event) => {
    const value = event?.nativeEvent?.text || ''

    handleAdd(value.trim())
    autocomplete.clear()
  }

  return (
    <View style={styles.root}>
      <TouchableOpacity accessibilityLabel={a11y.openBtn} onPress={handleOpenModal}>
        <TextInput
          accessibilityLabel={a11y.inputBtn}
          style={styles.input}
          placeholder={t('Type keywords')}
          pointerEvents="none"
        />
      </TouchableOpacity>
      <TagsCloud options={keywords} onPress={handleRemove} />

      <Modal accessibilityLabel={a11y.modal} presentationStyle="formSheet" animationType="slide" visible={isModalOpen}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.header}>
            <TextInput
              accessibilityLabel={a11y.autocomplete.input}
              style={styles.input}
              onChangeText={autocomplete.handleSearch}
              onSubmitEditing={handleSubmit}
              value={autocomplete.search}
              placeholder={t('Type keywords')}
              clearButtonMode="while-editing"
              blurOnSubmit={false}
              autoCorrect={false}
              enablesReturnKeyAutomatically
              autoFocus
            />
            <TagsCloud accessibilityLabel={a11y.autocomplete.tagsCloud} options={keywords} onPress={handleRemove} />
          </View>
          <View style={styles.inner}>
            <TagsList
              options={autocomplete.state.data}
              value={keywords}
              onPress={handleToggle}
              loading={autocomplete.state.status === 'loading'}
            />
          </View>
          <View style={styles.footer}>
            <DefaultButton accessibilityLabel={a11y.closeBtn} label={t('Close')} onPress={handleCloseModal} />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 8,
    paddingHorizontal: 12,
    flexShrink: 0,
  },
  input: {
    marginBottom: 12,
  },
  modal: {
    flex: 1,
  },
  inner: {
    flexGrow: 1,
  },
  footer: {
    paddingHorizontal: 12,
    flexShrink: 0,
  },
})

FormKeywords.propTypes = {
  t: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
}

export default withTranslation()(FormKeywords)
