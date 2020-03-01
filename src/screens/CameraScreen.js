import React from 'react'
import CameraComponent from 'components/Camera'
import CameraServiceComponent from 'components/Camera/index.service'
import PlaceholderNavigationComponent from 'components/NavigationPrimary/Placeholder'

class CameraScreen extends React.Component {
  render() {
    return (
      <CameraServiceComponent>
        {(props) => (
          <CameraComponent
            {...props}
          />
        )}
      </CameraServiceComponent>
    )
  }
}

export default CameraScreen