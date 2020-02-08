import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import FormComponent from 'components/Comments/Form'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import CommentComponent from 'components/Comments/Comment'
import pathOr from 'ramda/src/pathOr'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Comments = ({
  theme,
  commentsAdd,
  commentsAddRequest,
  postsCommentsGet,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <ScrollView style={styling.comments}>
        {pathOr([], ['data'])(postsCommentsGet).map(((comment, key) => (
          <View style={styling.comment}>
            <CommentComponent key={key} comment={comment} />
          </View>
        )))}
      </ScrollView>
      <View style={styling.form}>
        <FormComponent
          commentsAdd={commentsAdd}
          commentsAddRequest={commentsAddRequest}
        />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  comments: {
    flex: 1,
    padding: theme.spacing.base,
  },
  comment: {
    marginBottom: theme.spacing.base,
  },
  form: {
    ...ifIphoneX({
      marginBottom: 40,
    }, {
      marginBottom: 0,
    }),
  }
})

Comments.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(Comments)
