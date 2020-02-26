import React from 'react'
import AvatarPickerComponent from 'components/AvatarPicker'
import AvatarPickerServiceComponent from 'components/AvatarPicker/index.service'

class AvatarPickerScreen extends React.Component {
  render() {
    return (
      <AvatarPickerServiceComponent>
        {(props) => (
          <AvatarPickerComponent
            {...props}
          />
        )}
      </AvatarPickerServiceComponent>
    )
  }
}

export default AvatarPickerScreen