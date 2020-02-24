import React from 'react'
import ArchivedComponent from 'components/Archived'
import ArchivedServiceComponent from 'components/Archived/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class ArchivedScreen extends React.Component {
  render() {
    return (
      <ArchivedServiceComponent>
        {(props) => (
          <React.Fragment>

            <Translation>
              {(t) => (
                <NavigationSecondary
                  onNavLeftPress={() => this.props.navigation.goBack(null)}
                  title={t('Archived')}
                />
              )}
            </Translation>
            
            <ArchivedComponent {...props} />
          </React.Fragment>
        )}
      </ArchivedServiceComponent>
    )
  }
}

export default ArchivedScreen