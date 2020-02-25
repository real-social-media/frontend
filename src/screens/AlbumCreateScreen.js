import React from 'react'
import AlbumCreateServiceComponent from 'components/AlbumCreate/index.service'
import AlbumCreateComponent from 'components/AlbumCreate'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'
import * as navigationActions from 'navigation/actions'

class AlbumCreateScreen extends React.Component {
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onClosePress={navigationActions.navigateHome(this.props.navigation)}
              title={t('Edit Post')}
            />
          )}
        </Translation>

        <AlbumCreateServiceComponent>
          {((shareProps) => (
            <AlbumCreateComponent
              {...shareProps}
            />
          ))}
        </AlbumCreateServiceComponent>
      </>
    )
  }
}

export default AlbumCreateScreen