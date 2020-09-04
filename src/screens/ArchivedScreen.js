import React from 'react'
import ArchivedComponent from 'components/Archived'
import ArchivedServiceComponent from 'components/Archived/index.service'

class ArchivedScreen extends React.Component {
  render() {
    return (
      <ArchivedServiceComponent>
        {(props) => (
          <ArchivedComponent {...props} />
        )}
      </ArchivedServiceComponent>
    )
  }
}

export default ArchivedScreen