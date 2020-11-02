import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import DatingCard from 'components/Dating/Card'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'
import UploadAvatar from 'components/UploadAvatar'

const DatingProfile = ({ t, theme, user, usersSetUserDatingStatus, usersSetUserDatingStatusRequest }) => {
  const styling = styles(theme)

  return (
    <UploadAvatar>
      {({ openUploadAvatarMenu, isAvatarEmpty }) => (
        <View style={styling.root}>
          <View style={styling.card}>
            <DatingCard user={user} />
          </View>
          <View style={styling.actions}>
            {isAvatarEmpty ? (
              <View style={styling.actions}>
                <DefaultButton label={t('Upload Profile Picture')} onPress={openUploadAvatarMenu} />
                <Text style={styling.text}>{t('Before start dating, change Profile Picture')}</Text>
              </View>
            ) : (
              <View style={styling.actions}>
                <DefaultButton
                  label={t('Start Dating')}
                  onPress={usersSetUserDatingStatusRequest}
                  loading={usersSetUserDatingStatus.status === 'loading'}
                />
                <Text style={styling.text}>{t('Preview your dating profile and start dating')}</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </UploadAvatar>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    card: {
      flex: 1,
      padding: theme.spacing.base,
    },
    actions: {
      height: 120,
      marginTop: theme.spacing.base,
      padding: theme.spacing.base,
      justifyContent: 'space-around',
    },
    text: {
      textAlign: 'center',
    },
  })

DatingProfile.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  user: PropTypes.any,
  usersSetUserDatingStatus: PropTypes.any,
  usersSetUserDatingStatusRequest: PropTypes.func,
}

export default withTranslation()(withTheme(DatingProfile))
