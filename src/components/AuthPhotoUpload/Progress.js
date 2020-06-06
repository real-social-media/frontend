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
  handleErrorClose,
}) => {
  const styling = styles(theme)
  
  const progress = path(['meta', 'progress'])(activeUpload)

  return (
    <View style={styling.root}>
      {progress ?
        <View testID="components/AuthPhotoUpload/Progress/progress" style={styling.item}>
          <SubtitleTemplate
            disabled
            actions={[{
              onPress: () => {},
              title: t('Upload progress {{progress}}%', { progress }),
            }, {
              onPress: handleErrorClose,
              title: t('Cancel upload'),
              active: true,
            }]}
          />
        </View>
      : null}

      {!progress ?
        <View testID="components/AuthPhotoUpload/Progress/process" style={styling.item}>
          <SubtitleTemplate
            disabled
            actions={[{
              onPress: () => {},
              title: t('Processing'),
            }, {
              onPress: handleErrorClose,
              title: t('Cancel upload'),
              active: true,
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
  handleErrorClose: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
  },
  item: {
    marginBottom: 12,
  },
})

export default withTranslation()(withTheme(Actions))
