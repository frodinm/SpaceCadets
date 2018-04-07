import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { default as Map } from "./components/map";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;
