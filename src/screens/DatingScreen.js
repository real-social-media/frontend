import React from 'react'
import DatingServiceComponent from 'components/Dating/index.service'
import DatingGridServiceComponent from 'components/DatingGrid/index.service'
import DatingComponent from 'components/Dating'

class DatingScreen extends React.Component {
  render() {
    return (
      <DatingServiceComponent>
        {((shareProps) => (
          <DatingGridServiceComponent datingGetRequestOnMount={true}>
            {(datingProps) => (
              <DatingComponent 
                {...shareProps}
                {...datingProps}
              />
            )}
          </DatingGridServiceComponent>
        ))}
      </DatingServiceComponent>
    )
  }
}

export default DatingScreen
