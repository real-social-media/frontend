import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const MoreComponent = ({
  t,
  theme,
  onPress,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <View style={styling.helper}>
        <DefaultButton label={t('See more posts like this')} onPress={onPress} />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
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

MoreComponent.defaultProps = {
}

MoreComponent.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  onPress: PropTypes.any,
}

export default withTranslation()(withTheme(MoreComponent))
