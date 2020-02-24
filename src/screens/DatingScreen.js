import React from 'react'
import DatingComponent from 'components/Dating'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class DatingScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Translation>
          {(t) => (
            <NavigationSecondary
              title={t('Dating')}
            />
          )}
        </Translation>

        <DatingComponent />
      </React.Fragment>
    )
  }
}

export default DatingScreen