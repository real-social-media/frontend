import React from 'react'
import AlbumsServiceComponent from 'components/Albums/index.service'
import AlbumsComponent from 'components/Albums'

class AlbumsScreen extends React.Component {
  render() {
    return (
      <AlbumsServiceComponent>
        {((shareProps) => (
          <AlbumsComponent
            {...shareProps}
          />
        ))}
      </AlbumsServiceComponent>
    )
  }
}

export default AlbumsScreen