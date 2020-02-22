import React from 'react'
import AlbumsServiceComponent from 'components/Albums/index.service'
import AlbumsComponent from 'components/Albums'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class AlbumsScreen extends React.Component {
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