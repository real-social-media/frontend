import React from 'react'
import AlbumsServiceComponent from 'components/Albums/index.service'
import AlbumsGridServiceComponent from 'components/AlbumsGrid/index.service'
import AlbumsComponent from 'components/Albums'

class AlbumsScreen extends React.Component {
  render() {
    return (
      <AlbumsServiceComponent>
        {(shareProps) => (
          <AlbumsGridServiceComponent>
            {(albumsProps) => <AlbumsComponent {...shareProps} {...albumsProps} />}
          </AlbumsGridServiceComponent>
        )}
      </AlbumsServiceComponent>
    )
  }
}

export default AlbumsScreen
