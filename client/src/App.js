import React, { Component } from 'react';
import MapNav from './components/MapNav';
import Sidebar from './components/Sidebar';
import logo from "./logo.svg";
import Axios from "axios";
import "./App.css";
import {Map} from "./components";

const baseURL = "http://localhost:5000";

class App extends Component {
  constructor() {
    super();
    this.state = {
      mapLatCenterPos: 0,
      mapLngCenterPos: 0
    }
  }
  render() {
    return (
      <div className="App">
        <MapNav/>
        <Sidebar/>
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
