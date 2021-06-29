import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import * as navigationActions from 'navigation/actions'
import ContactsIcon from 'assets/svg/contacts/Contacts'
import { useNavigation } from '@react-navigation/native'
import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import { AuthContext } from 'services/providers/Auth'
import * as contactsConstants from 'store/ducks/contacts/constants'

const navigateMembership = navigationActions.withAuthValidation(navigationActions.navigateMembership)

const Placeholder = ({ t, theme }) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)
  const handlePress = navigationActions.navigateInviteFriends(navigation, {}, { protected: true, user })
  const handleMembershipPress = navigateMembership(navigation, {}, { protected: true, user })

  return (
    <View style={styling.root} accessibilityLabel="Empty State">
      <View style={styling.headerIcon}>
        <ContactsIcon fill={theme.colors.text} />
      </View>
      <View style={styling.title}>
        <Text style={styling.text}>{t('We couldn\'t find any posts in your feed')}</Text>

        <Text style={styling.subtitle}>
          {t('Get FREE ')}
          <Text style={styling.link} onPress={handleMembershipPress}>
            {t('REAL Diamond')}
          </Text>
          {t(' for life')}
        </Text>
        <Text style={styling.subtitle}>
          {t('by inviting {{count}} friends to REAL', { count: contactsConstants.CONTACTS_INVITE_LIMIT })}
        </Text>
      </View>
      <View style={styling.actions}>
        <DefaultButton style={styling.actionBtn} label={t('Follow & Invite Friends')} onPress={handlePress} />
        <Text style={styling.emptyText}>{t('Pull down to refresh')}</Text>
      </View>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      paddingHorizontal: theme.spacing.base * 2,
      paddingTop: 50,
      paddingBottom: 60,
    },
    headerIcon: {
      alignItems: 'center',
      marginBottom: theme.spacing.base,
    },
    title: {
      marginBottom: theme.spacing.base * 2,
    },
    actionBtn: {
      marginBottom: theme.spacing.base,
    },
    text: {
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 18,
      textAlign: 'center',
      color: theme.colors.placeholder,
    },
    link: {
      fontSize: 18,
      textDecorationLine: 'underline',
      color: theme.colors.primary,
    },
    emptyText: {
      fontSize: 14,
      fontWeight: '300',
      textAlign: 'center',
      color: theme.colors.placeholder,
    },
  })

Placeholder.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

export default withTranslation()(withTheme(Placeholder))
