import React from "react";
import DatingComponent from "components/Dating";
import DatingServiceComponent from "components/Dating/index.service";

class DatingScreen extends React.Component {
  render() {
    return <DatingServiceComponent>{(props) => <DatingComponent {...props} />}</DatingServiceComponent>;
  }
}

export default DatingScreen;
