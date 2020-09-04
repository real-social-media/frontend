import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Paragraph } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Formula = ({
  t,
  theme,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <View style={styling.output}>
        <View style={styling.divident}>
          <Paragraph style={styling.paragraph}>{t('(Total Revenue) * (Processing Fees)')}</Paragraph>
        </View>

        <View style={styling.line}></View>

        <View style={styling.divisor}>
          <Paragraph style={styling.paragraph}>{t('(Total 💎Views)')}</Paragraph>
        </View>
      </View>
    </View>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  equals: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  output: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  divident: {
  },
  line: {
    borderTopWidth: 0.5,
    borderColor: theme.colors.text,
    width: '100%',
    marginVertical: 8,
  },
  divisor: {
  },
  paragraph: {
  },
})

Formula.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(Formula))
