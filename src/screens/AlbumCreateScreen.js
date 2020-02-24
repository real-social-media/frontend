import React from 'react'
import AlbumCreateServiceComponent from 'components/AlbumCreate/index.service'
import AlbumCreateComponent from 'components/AlbumCreate'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class AlbumCreateScreen extends React.Component {
  render() {
    return (
      <>
        <Translation>
          {(t) => (
            <NavigationSecondary
              onClosePress={() => this.props.navigation.goBack(null)}
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