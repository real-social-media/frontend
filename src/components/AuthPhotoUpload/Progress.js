import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import SubtitleTemplate from 'templates/Subtitle'
import path from 'ramda/src/path'

import { withTranslation } from 'react-i18next'

const Actions = ({ t, activeUpload }) => {
  const styling = styles

  const progress = path(['meta', 'progress'])(activeUpload)

  return (
    <View style={styling.root}>
      {progress ? (
        <View testID="components/AuthPhotoUpload/Progress/progress" style={styling.item}>
          <SubtitleTemplate
            disabled
            actions={[
              {
                onPress: () => {},
                title: t('Upload progress {{progress}}%', { progress }),
              },
            ]}
          />
        </View>
      ) : null}

      {!progress ? (
        <View testID="components/AuthPhotoUpload/Progress/process" style={styling.item}>
          <SubtitleTemplate
            disabled
            actions={[
              {
                onPress: () => {},
                title: t('Processing'),
              },
            ]}
          />
        </View>
      ) : null}
    </View>
  )
}

Actions.propTypes = {
  t: PropTypes.any,
  activeUpload: PropTypes.any,
  handleErrorClose: PropTypes.any,
}

const styles = StyleSheet.create({
  root: {},
  item: {
    marginBottom: 12,
  },
})

export default withTranslation()(Actions)
