import React from 'react'
import PrivacyComponent from 'components/Privacy'
import PrivacyServiceComponent from 'components/Privacy/index.service'

class PrivacyScreen extends React.Component {
  render() {
    return <PrivacyServiceComponent>{(props) => <PrivacyComponent {...props} />}</PrivacyServiceComponent>
  }
}

export default PrivacyScreen
