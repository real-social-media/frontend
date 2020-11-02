import React from 'react'
import StoriesComponent from 'components/Stories'
import StoriesServiceComponent from 'components/Stories/index.service'
import FeedCardsComponent from 'components/FeedCards'
import FeedCardsServiceComponent from 'components/FeedCards/index.service'
import UploadingComponent from 'components/Uploading'
import UploadingServiceComponent from 'components/Uploading/index.service'

const ListHeaderComponent = () => (
  <React.Fragment>
    <StoriesServiceComponent>{(props) => <StoriesComponent {...props} />}</StoriesServiceComponent>
    <FeedCardsServiceComponent>{(props) => <FeedCardsComponent {...props} />}</FeedCardsServiceComponent>
    <UploadingServiceComponent>{(props) => <UploadingComponent {...props} />}</UploadingServiceComponent>
  </React.Fragment>
)

export default React.memo(ListHeaderComponent)
