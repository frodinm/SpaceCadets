import React, { Component } from "react";
import logo from "./logo.svg";
import Axios from 'axios';
import "./App.css";
import { default as Map } from "./components/map";
import Axios from "axios";

const baseURL = "http://localhost:5000";

class App extends Component {
  constructor() {
    super();

    Axios.request({
      baseURL,
      method: "post",
      url: "/member/register",
      data: {
        name: "Fabrizio RM",
        profession: "Coder",
        birthday: "11 January 1997",
        gender: "Male",
        location: { longitude: 100, latitude: 150 }
      }
    });
  }
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
