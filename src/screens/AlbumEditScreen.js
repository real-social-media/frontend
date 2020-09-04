import React from 'react'
import AlbumEditServiceComponent from 'components/AlbumEdit/index.service'
import AlbumEditComponent from 'components/AlbumEdit'

class AlbumEditScreen extends React.Component {
  render() {
    return (
      <AlbumEditServiceComponent>
        {((shareProps) => (
          <AlbumEditComponent
            {...shareProps}
          />
        ))}
      </AlbumEditServiceComponent>
    )
  }
}

export default AlbumEditScreen