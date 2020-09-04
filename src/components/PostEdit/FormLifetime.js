import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { Text, Caption } from 'react-native-paper'
import Slider from '@react-native-community/slider'
import Layout from 'constants/Layout'
import LifetimeIndicator from 'components/PostCreate/LifetimeIndicator'
import dayjs from 'dayjs'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const getIndexByValue = (lifetime) => {
  if (lifetime === 'P1D') { return 1 }
  if (lifetime === 'P7D') { return 2 }
  if (lifetime === 'P1M') { return 3 }
  if (lifetime === 'P1Y') { return 4 }
  if (lifetime === null) { return 5 }
}

const getValueByIndex = (lifetime) => {
  if (lifetime === 1) { return 'P1D' }
  if (lifetime === 2) { return 'P7D' }
  if (lifetime === 3) { return 'P1M' }
  if (lifetime === 4) { return 'P1Y' }
  if (lifetime === 5) { return null }
  return null
}

const getArgumentsByIndex = (lifetime) => {
  if (lifetime === 1) { return [1, 'day'] }
  if (lifetime === 2) { return [7, 'day'] }
  if (lifetime === 3) { return [1, 'month'] }
  if (lifetime === 4) { return [1, 'year'] }
  if (lifetime === 5) { return null }
}

const FormLifetime = ({
  t,
  theme,
  values,
  setFieldValue,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <Text>{t('Post availability')}</Text>
      <Caption>
        {values.expiresAt ?
          t('This post will expire {{expiresAt}}', { expiresAt: dayjs(values.expiresAt).from(dayjs()) }) :
          t('This post will be available forever')}
      </Caption>

      <Slider
        style={styling.slider}
        minimumValue={1}
        step={1}
        maximumValue={5}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.disabled}
        value={getIndexByValue(values.lifetime)}
        onValueChange={(value) => {
          setFieldValue('lifetime', getValueByIndex(value))
          const expiryArguments = getArgumentsByIndex(value)

          if (expiryArguments) {
            setFieldValue('expiresAt', dayjs().add(...getArgumentsByIndex(value) || null).toJSON())
          } else {
            setFieldValue('expiresAt', null)
          }
        }}
      />
      
      <View style={styling.sliderIndicator}>
        <LifetimeIndicator
          onValueChange={(value) => {
            setFieldValue('lifetime', getValueByIndex(value))
            const expiryArguments = getArgumentsByIndex(value)

            if (expiryArguments) {
              setFieldValue('expiresAt', dayjs().add(...getArgumentsByIndex(value) || null).toJSON())
            } else {
              setFieldValue('expiresAt', null)
            }
          }}
        />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  slider: {
    width: Layout.window.width - 24,
    height: 30,
    marginTop: theme.spacing.base,
  },
  sliderIndicator: {
  },
})

FormLifetime.propTypes = {
  theme: PropTypes.any,
  values: PropTypes.any,
  setFieldValue: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(FormLifetime))
