import React from 'react'
import DownloadAppComponent from 'components/DownloadApp'
import DownloadAppService from 'components/DownloadApp/index.service'

class DownloadAppScreen extends React.Component {
  render() {
    return (
      <DownloadAppService>
        {(shareProps) => <DownloadAppComponent {...shareProps} />}
      </DownloadAppService>
    )
  }
}

export default DownloadAppScreen
