import React from 'react'
import AlbumServiceComponent from 'components/Album/index.service'
import AlbumComponent from 'components/Album'

class AlbumScreen extends React.Component {
  render() {
    return (
      <AlbumServiceComponent>
        {((shareProps) => (
          <AlbumComponent
            {...shareProps}
          />
        ))}
      </AlbumServiceComponent>
    )
  }
}

export default AlbumScreen