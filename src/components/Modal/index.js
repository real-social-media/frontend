import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import {
  Button,
  Title,
  Text,
} from 'react-native-paper'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Modal = ({
  theme,
  ...props
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()

  const cancelAction = props.cancelAction || path(['params', 'cancelAction'])(route)
  const cancelLabel = props.cancelLabel || path(['params', 'cancelLabel'])(route)
  const confirmLabel = props.confirmLabel || path(['params', 'confirmLabel'])(route)
  const confirmAction = props.confirmAction || path(['params', 'confirmAction'])(route)
  const title = props.title || path(['params', 'title'])(route)
  const text = props.text || path(['params', 'text'])(route)

  return (
    <View style={styling.root}>
      <View style={styling.modal}>
        <View style={styling.text}>
          <Title>{title}</Title>
        </View>

        <View style={styling.text}>
          <Text>{text}</Text>
        </View>

        <View style={styling.action}>
          <Button mode="contained" onPress={confirmAction}>
            {confirmLabel}
          </Button>
        </View>

        <View style={styling.action}>
          <Button mode="text" onPress={cancelAction}>
            {cancelLabel}
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: theme.colors.backgroundPrimary,
    width: '90%',
    padding: theme.spacing.base,
  },
  text: {
    marginBottom: 24,
  },
  action: {
    marginBottom: theme.spacing.base,
  },
})

Modal.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(Modal)
