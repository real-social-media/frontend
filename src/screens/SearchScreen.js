import React from 'react'
import SearchComponent from 'components/Search'
import SearchServiceComponent from 'components/Search/index.service'
import UserServiceProvider from 'services/providers/User'

class SearchScreen extends React.Component {
  render() {
    return (
      <SearchServiceComponent>
        {(searchProps) => (
          <UserServiceProvider navigation={this.props.navigation}>
            {((userProps) => (
              <SearchComponent
                {...searchProps}
                {...userProps}
              />
            ))}
          </UserServiceProvider>
        )}
      </SearchServiceComponent>
    )
  }
}

export default SearchScreen