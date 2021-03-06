import React from "react";
import PropTypes from "prop-types";
import Header from "./shared/header/header";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
