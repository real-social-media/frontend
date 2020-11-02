import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DatingMatchForm from 'components/DatingMatch/Form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { withTheme } from 'react-native-paper'

const DatingMatch = ({
  theme,
  form,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <KeyboardAwareScrollView>
        <View style={styling.form}>
          <DatingMatchForm
            form={form}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  form: {
    padding: theme.spacing.base,
  },
})

DatingMatch.propTypes = {
  theme: PropTypes.any,
  form: PropTypes.any,
}

export default withTheme(DatingMatch)

