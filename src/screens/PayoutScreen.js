import React from 'react'
import PayoutComponent from 'components/Payout'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import * as navigationActions from 'navigation/actions'

class PayoutScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('Payout')}
              onNavLeftPress={() => this.props.navigation.goBack(null)}
            />
          )}
        </Translation>

        <PayoutComponent />
      </React.Fragment>
    )
  }
}

export default PayoutScreen