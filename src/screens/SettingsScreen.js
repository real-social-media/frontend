import React from 'react'
import SettingsComponent from 'components/Settings'
import SettingsServiceComponent from 'components/Settings/index.service'

class SettingsScreen extends React.Component {
  render() {
    return <SettingsServiceComponent>{(props) => <SettingsComponent {...props} />}</SettingsServiceComponent>
  }
}

export default SettingsScreen
