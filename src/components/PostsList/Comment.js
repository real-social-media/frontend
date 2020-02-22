import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Comment = ({
  theme,
  comment,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.comment}>
        <Text><Text style={styling.author}>{path(['commentedBy', 'username'])(comment)}</Text> {path(['text'])(comment)}</Text>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 4,
  },
  author: {
    fontWeight: '600',
  },
  comment: {
    marginLeft: theme.spacing.base,
    flex: 1,
  },
})

Comment.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(Comment)
