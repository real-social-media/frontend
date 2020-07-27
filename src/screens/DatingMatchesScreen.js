import React from 'react';
import DatingMatchesComponent from 'components/DatingMatches';
import DatingMatchesServiceComponent from 'components/DatingMatches/index.service';

class DatingMatchesScreen extends React.Component {
  render() {
    return (
      <DatingMatchesServiceComponent>{(props) => <DatingMatchesComponent {...props} />}</DatingMatchesServiceComponent>
    );
  }
}

export default DatingMatchesScreen;
