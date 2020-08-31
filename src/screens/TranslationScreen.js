import React from 'react'
import TranslationComponent from 'components/Translation'
import TranslationServiceComponent from 'components/Translation/index.service'

class TranslationScreen extends React.Component {
  render() {
    return <TranslationServiceComponent>{(props) => <TranslationComponent {...props} />}</TranslationServiceComponent>
  }
}

export default TranslationScreen
