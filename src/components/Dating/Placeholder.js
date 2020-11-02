import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import * as navigationActions from 'navigation/actions'

import { useNavigation } from '@react-navigation/native'
import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Placeholder = ({
  t,
  theme,
  datingMatchedUsersRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <View style={styling.placeholder}>
        <Text style={styling.text}>{t('We cannot find potential matches or you have viewed them all based on your search criteria')}.</Text>
      </View>
      <View style={styling.placeholder}>
        <DefaultButton label={t('Your Dating Preferences')} onPress={navigationActions.navigateDatingAbout(navigation)} loading={false} />
      </View>
      <View style={styling.placeholder}>
        <DefaultButton label={t('Check again')} onPress={datingMatchedUsersRequest} loading={false} mode="outline" />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  placeholder: {
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.base * 2,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',  
  },
})

Placeholder.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  datingMatchedUsersRequest: PropTypes.any,
}

export default withTranslation()(withTheme(Placeholder))
