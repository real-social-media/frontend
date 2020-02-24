import React from 'react'
import ModalComponent from 'components/Modal'

class ModalScreen extends React.Component {
  render() {
    return (
      <ModalComponent
        {...this.props}
      />
    )
  }
}

export default ModalScreen