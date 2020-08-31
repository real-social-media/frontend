import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Alert } from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const ProfileDelete = ({ t, theme, usersDelete, usersDeleteRequest }) => {
  const styling = styles(theme)

  const handleProfileDelete = () => {
    Alert.alert(
      'Profile Delete',
      'Your photo will be deleted permanently!',
      [
        {
          text: 'Delete now',
          onPress: usersDeleteRequest,
        },
      ],
      { cancelable: true },
    )
  }

  return (
    <View style={styling.root}>
      <Text style={styling.text}>
        {t('Delete your profile')}. {t('Be aware that this action is non-reversible')}!
      </Text>
      <DefaultButton
        label={t('Delete your Profile')}
        onPress={handleProfileDelete}
        loading={usersDelete.status === 'loading'}
      />
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      height: 160,
      justifyContent: 'center',
    },
    text: {
      marginBottom: theme.spacing.base * 2,
      fontWeight: '500',
    },
  })

ProfileDelete.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  usersDelete: PropTypes.any,
  usersDeleteRequest: PropTypes.any,
}

export default withTranslation()(withTheme(ProfileDelete))
