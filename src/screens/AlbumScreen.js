import React from 'react'
import AlbumServiceComponent from 'components/Album/index.service'
import AlbumComponent from 'components/Album'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class AlbumScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => ({
    headerShown: false,
  })
  
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

        <AlbumServiceComponent>
          {((shareProps) => (
            <AlbumComponent
              {...shareProps}
            />
          ))}
        </AlbumServiceComponent>
      </>
    )
  }
}

export default AlbumScreen