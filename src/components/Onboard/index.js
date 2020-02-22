import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import Header from 'components/Auth/Header'
import Form from 'components/Auth/Form'
import Footer from 'components/Auth/Footer'
import Title from 'components/Auth/Title'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Auth = ({
  theme,
  authFacebookRequest,
  authSignin,
  authSigninRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.wrapper}>
      <View style={styling.root}>
        <View style={styling.header}>
          <Header />
        </View>
        <View style={styling.title}>
          <Title />
        </View>
        <View style={styling.footer}>
          <Footer
            authFacebookRequest={authFacebookRequest}
          />
        </View>
        <View style={styling.form}>
          <Form
            authSignin={authSignin}
            authSigninRequest={authSigninRequest}
          />
        </View>
      </View>
    </View>
  )
}

Auth.propTypes = {
  theme: PropTypes.any,
  authFacebookRequest: PropTypes.any,
  authSignin: PropTypes.any,
  authSigninRequest: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  root: {
    paddingHorizontal: 48, 
  },
  header: {
    justifyContent: 'center',
  },
  footer: {
    justifyContent: 'flex-end',
  },
  title: {
    paddingBottom: 24,
  },
  form: {
  },
})

export default withTheme(Auth)
