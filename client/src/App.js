import React, { Component } from 'react';
import MapNav from './components/MapNav';
import Sidebar from './components/Sidebar';
import logo from "./logo.svg";
import Axios from "axios";
import "./App.css";
import {Map} from "./components";
import Test from "./components/test";

const baseURL = "http://localhost:5000";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: null,
    }
  }

  getUsers = async () => await fetch("https://a7c5899f.ngrok.io/member/users")
  .then(x => x.json())
  .then(y => this.setState(st => { return { users: y }}));

  componentWillMount = async () => {
    this.getUsers();
  }

  render() {
    console.log(this.state.users);
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
          users={this.state.users}
        />
      </div>
    );
  }
}

export default App;
