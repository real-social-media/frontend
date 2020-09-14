import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTranslation } from 'react-i18next'

const Actions = ({
  t,
  authSignoutRequest,
}) => {
  const styling = styles
  
  return (
    <View style={styling.root}>
      <View style={styling.item}>
        <DefaultButton label={t('Try Again')} onPress={authSignoutRequest} loading={false} mode="outline" />
      </View>
    </View>
  )
}

Actions.propTypes = {
  t: PropTypes.any,
  authSignoutRequest: PropTypes.any,
}

const styles = StyleSheet.create({
  root: {
  },
  item: {
    marginBottom: 12,
  },
})

export default withTranslation()(Actions)
