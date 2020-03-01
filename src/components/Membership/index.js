import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
} from 'react-native'
import { DataTable } from 'react-native-paper'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Membership = ({
  theme,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <ScrollView style={styling.root}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Free</DataTable.Title>
          <DataTable.Title>Diamond</DataTable.Title>
          <DataTable.Title>Features</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>✅</DataTable.Cell>
          <DataTable.Cell>✅</DataTable.Cell>
          <DataTable.Cell>REAL Social Media</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>✅</DataTable.Cell>
          <DataTable.Cell>✅</DataTable.Cell>
          <DataTable.Cell>REAL Chat (Coming March 2020)</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell>✅</DataTable.Cell>
          <DataTable.Cell>Get Paid $0.11 every view (from other 💎members)</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell>✅</DataTable.Cell>
          <DataTable.Cell>Access to Follow “Diamond Exclusive” Private Accounts</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell>✅</DataTable.Cell>
          <DataTable.Cell>💎emblem next to your username</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell>✅</DataTable.Cell>
          <DataTable.Cell>Personalize your profile with exclusive Colors, Themes, and Skins</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell>✅</DataTable.Cell>
          <DataTable.Cell>Disable the REAL watermark when sharing posts</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell>✅</DataTable.Cell>
          <DataTable.Cell>REAL Dating (Coming April 2020)</DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <DefaultButton label={t('Get Diamond In One Tap')} />
    </ScrollView>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 12,
  },
})

Membership.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(Membership)
