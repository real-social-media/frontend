import React from 'react'
import TranslationComponent from 'components/Translation'
import TranslationServiceComponent from 'components/Translation/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import * as navigationActions from 'navigation/actions'

class TranslationScreen extends React.Component {
  render() {
    return (
      <TranslationServiceComponent>
        {(props) => (
          <React.Fragment>
            <Translation>
              {(t) => (
                <NavigationSecondary
                  onNavLeftPress={() => this.props.navigation.goBack(null)}
                  title={t('Choose Language')}
                />
              )}
            </Translation>            

            <TranslationComponent
              {...props}
            />
          </React.Fragment>
        )}
      </TranslationServiceComponent>
    )
  }
}

export default TranslationScreen