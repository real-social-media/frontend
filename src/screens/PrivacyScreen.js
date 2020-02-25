import React from 'react'
import PrivacyComponent from 'components/Privacy'
import PrivacyServiceComponent from 'components/Privacy/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import * as navigationActions from 'navigation/actions'

class PrivacyScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onNavLeftPress={() => this.props.navigation.goBack(null)}
              title={t('Mental Health & Privacy Settings')}
            />
          )}
        </Translation>

        <PrivacyServiceComponent>
          {(props) => (
            <PrivacyComponent
              {...props}
            />
          )}
        </PrivacyServiceComponent>
      </React.Fragment>
    )
  }
}

export default PrivacyScreen