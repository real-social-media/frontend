import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const MoreComponent = ({
  theme,
  onPress,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

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
  
}

export default withTheme(MoreComponent)
