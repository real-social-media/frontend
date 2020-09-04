import React from 'react'
import CameraComponent from 'components/Camera'
import CameraServiceComponent from 'components/Camera/index.service'
import PermissionsComponent from 'components/Permissions'
import PermissionsServiceComponent from 'components/Permissions/index.service'

class CameraScreen extends React.Component {
  render() {
    return (
      <PermissionsServiceComponent>
        {(permissionsProps) => (
          <>
            {!permissionsProps.cameraEnabled || !permissionsProps.libraryEnabled ?
              <PermissionsComponent
                {...permissionsProps}
              />
            :
              <CameraServiceComponent>
                {(cameraProps) => (
                  <CameraComponent
                    {...cameraProps}
                    {...permissionsProps}
                  />
                )}
              </CameraServiceComponent>
            }
          </>
        )}
      </PermissionsServiceComponent>
    )
  }
}

export default CameraScreen