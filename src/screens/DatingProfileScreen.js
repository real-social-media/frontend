import React from 'react'
import DatingProfileComponent from 'components/DatingProfile'
import DatingProfileServiceComponent from 'components/DatingProfile/index.service'

class DatingProfileScreen extends React.Component {
  render() {
    return (
      <DatingProfileServiceComponent>
        {(datingProps) => (
          <DatingProfileComponent
            {...datingProps}
          />
        )}
      </DatingProfileServiceComponent>
    )
  }
}

export default DatingProfileScreen