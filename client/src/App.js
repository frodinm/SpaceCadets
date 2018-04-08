import React, { Component } from "react";
import MapNav from "./components/MapNav";
import Sidebar from "./components/Sidebar";
import logo from "./logo.svg";
import Axios from "axios";
import "./App.css";
import { Map } from "./components";
import Test from "./components/test";
import io from "socket.io-client";

const socket = io("http://b03c615f.ngrok.io");

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: null,
      notificationList: []
    };
    socket.on("notification", notification => {
      console.log(notification);
      this.setState({
        notificationList: [...this.state.notificationList, notification]
      });
    });
  }

  getUsers = async () =>
    await fetch("https://a7c5899f.ngrok.io/member/users")
      .then(x => x.json())
      .then(y => this.setState({ users: y }));

  componentWillMount = async () => {
    this.getUsers();
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <MapNav />
        <Sidebar notificationList={this.state.notificationList} />
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
