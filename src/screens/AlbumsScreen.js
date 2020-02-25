import React from 'react'
import AlbumsServiceComponent from 'components/Albums/index.service'
import AlbumsComponent from 'components/Albums'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import * as navigationActions from 'navigation/actions'

class AlbumsScreen extends React.Component {
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onClosePress={() => this.props.navigation.goBack(null)}
              title={t('Albums')}
            />
          )}
        </Translation>

        <AlbumsServiceComponent>
          {((shareProps) => (
            <AlbumsComponent
              {...shareProps}
            />
          ))}
        </AlbumsServiceComponent>
      </>
    )
  }
}

export default AlbumsScreen