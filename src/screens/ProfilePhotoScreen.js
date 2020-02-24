import React from 'react'
import PostsGridSelectComponent from 'components/PostsGridSelect'
import PostsGridSelectServiceComponent from 'components/PostsGridSelect/index.service'
import NavigationSecondary from 'components/NavigationSecondary/Default'
import { Translation } from 'react-i18next'

class ProfilePhotoScreen extends React.Component {
  render() {
    return (
      <PostsGridSelectServiceComponent>
        {(props) => (
          <React.Fragment>

            <Translation>
              {(t) => (
                <NavigationSecondary
                  onNavLeftPress={() => this.props.navigation.goBack(null)}
                  title={t('Choose Photo')}
                  rightLabel={t('Update')}
                  onNavRightPress={props.usersEditProfileRequest}
                />
              )}
            </Translation>
            
            <PostsGridSelectComponent {...props} />
          </React.Fragment>
        )}
      </PostsGridSelectServiceComponent>
    )
  }
}

export default ProfilePhotoScreen