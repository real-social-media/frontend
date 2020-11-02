import React from 'react'
import DatingMatchComponent from 'components/DatingMatch'
import DatingMatchServiceComponent from 'components/DatingMatch/index.service'
import PermissionsComponent from 'components/Permissions'
import PermissionsServiceComponent from 'components/Permissions/index.service'

class DatingMatchScreen extends React.Component {
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

            <DatingMatchServiceComponent>
              {(datingMatchProps) => (
                <DatingMatchComponent
                  {...datingMatchProps}
                />
              )}
            </DatingMatchServiceComponent>
          </React.Fragment>
        )}
      </PermissionsServiceComponent>
    )
  }
}

export default DatingMatchScreen