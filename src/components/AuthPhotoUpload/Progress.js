import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import SubtitleTemplate from 'templates/Subtitle'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Actions = ({
  t,
  theme,
  activeUpload,
}) => {
  const styling = styles(theme)
  
  const progress = path(['meta', 'progress'])(activeUpload)

  return (
    <View style={styling.root}>
      {progress ?
        <View style={styling.item}>
          <SubtitleTemplate
            actions={[{
              onPress: () => {},
              title: t('Upload progress {{progress}}%', { progress }),
            }]}
          />
        </View>
      : null}

      {!progress ?
        <View style={styling.item}>
          <SubtitleTemplate
            actions={[{
              onPress: () => {},
              title: t('Processing'),
            }]}
          />
        </View>
      : null}
    </View>
  )
}

Actions.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  activeUpload: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
  },
  item: {
    marginBottom: 12,
  },
})

export default withTranslation()(withTheme(Actions))
