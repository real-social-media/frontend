import React from 'react'
import SearchComponent from 'components/Search'
import SearchServiceComponent from 'components/Search/index.service'

class SearchScreen extends React.Component {
  render() {
    return (
      <SearchServiceComponent>
        {(searchProps) => (
          <SearchComponent
            {...searchProps}
          />
        )}
      </SearchServiceComponent>
    )
  }
}

export default SearchScreen