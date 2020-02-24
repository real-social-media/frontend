import React from 'react'
import SettingsComponent from 'components/Settings'
import SettingsServiceComponent from 'components/Settings/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class SettingsScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onNavLeftPress={() => this.props.navigation.replace('ProfileSelf')}
              title={t('Settings')}
            />
          )}
        </Translation>        

        <SettingsServiceComponent>
          {(props) => (
            <SettingsComponent
              {...props}
            />
          )}
        </SettingsServiceComponent>
      </React.Fragment>
    )
  }
}

export default SettingsScreen