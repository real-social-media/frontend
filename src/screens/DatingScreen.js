import React from 'react'
import DatingComponent from 'components/Dating'
import DatingServiceComponent from 'components/Dating/index.service'
import PermissionsComponent from 'components/Permissions'
import PermissionsServiceComponent from 'components/Permissions/index.service'

class DatingScreen extends React.Component {
  render() {
    return (
      <PermissionsServiceComponent location>
        {(permissionsProps) => (
          <React.Fragment>
            {!permissionsProps.datingEnabled ?
              <PermissionsComponent
                {...permissionsProps}
                location
              />
            : null}

            <DatingServiceComponent>
              {(datingProps) => (
                <DatingComponent
                  {...datingProps}
                />
              )}
            </DatingServiceComponent>
          </React.Fragment>
        )}
      </PermissionsServiceComponent>
    )
  }
}

export default DatingScreen