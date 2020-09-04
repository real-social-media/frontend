import React from 'react'
import AlbumCreateServiceComponent from 'components/AlbumCreate/index.service'
import AlbumCreateComponent from 'components/AlbumCreate'

class AlbumCreateScreen extends React.Component {
  render() {
    return (
      <AlbumCreateServiceComponent>
        {((shareProps) => (
          <AlbumCreateComponent
            {...shareProps}
          />
        ))}
      </AlbumCreateServiceComponent>
    )
  }
}

export default AlbumCreateScreen