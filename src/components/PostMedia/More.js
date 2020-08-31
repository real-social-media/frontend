import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTranslation } from 'react-i18next'

const MoreComponent = ({ t, onPress }) => {
  const styling = styles

  return (
    <View style={styling.root}>
      <View style={styling.helper}>
        <DefaultButton label={t('See more posts like this')} onPress={onPress} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  helper: {
    padding: 12,
    borderRadius: 4,
  },
})

MoreComponent.defaultProps = {}

MoreComponent.propTypes = {
  t: PropTypes.any,
  onPress: PropTypes.any,
}

export default withTranslation()(MoreComponent)
