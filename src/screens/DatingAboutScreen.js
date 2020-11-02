import React from 'react'
import DatingAboutComponent from 'components/DatingAbout'
import DatingAboutServiceComponent from 'components/DatingAbout/index.service'
import PermissionsComponent from 'components/Permissions'
import PermissionsServiceComponent from 'components/Permissions/index.service'

class DatingAboutScreen extends React.Component {
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

            <DatingAboutServiceComponent>
              {(datingAboutProps) => (
                <DatingAboutComponent
                  {...datingAboutProps}
                />
              )}
            </DatingAboutServiceComponent>
          </React.Fragment>
        )}
      </PermissionsServiceComponent>
    )
  }
}

export default DatingAboutScreen