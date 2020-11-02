import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import DatingAboutForm from 'components/DatingAbout/Form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { withTheme } from 'react-native-paper'

const DatingAbout = ({
  theme,
  form,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <KeyboardAwareScrollView>
        <View style={styling.form}>
          <DatingAboutForm
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

DatingAbout.propTypes = {
  theme: PropTypes.any,
  form: PropTypes.any,
}

export default withTheme(DatingAbout)

