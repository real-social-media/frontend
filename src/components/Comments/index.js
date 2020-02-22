import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native'
import FormComponent from 'components/Comments/Form'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import CommentComponent from 'components/Comments/Comment'
import pathOr from 'ramda/src/pathOr'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Comments = ({
  theme,
  commentsAdd,
  commentsAddRequest,
  postsCommentsGet,
  marginBottom,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <ScrollView
        style={styling.comments}
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.border}
            refreshing={postsCommentsGet.status === 'loading'}
          />
        }
      >
        {pathOr([], ['data'])(postsCommentsGet).map(((comment, key) => (
          <View style={styling.comment}>
            <CommentComponent key={key} comment={comment} />
          </View>
        )))}
      </ScrollView>
      <View style={{ marginBottom }}>
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
