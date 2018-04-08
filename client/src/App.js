import React, { Component } from "react";
import MapNav from "./components/MapNav";
import Sidebar from "./components/Sidebar";
import logo from "./logo.svg";
import Axios from "axios";
import "./App.css";
import { Map } from "./components";
import Test from "./components/test";
import io from "socket.io-client";
const socket = io("https://e2c18673.ngrok.io");

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: null,
      notificationList: [],
      clarifaiList: []
    };
    socket.on("notification", notification => {
      console.log(notification);
      this.setState({
        notificationList: [...this.state.notificationList, notification]
      });
    });

    socket.on("clarifai", clarifai => {
      this.setState({
        clarifaiList: [...this.state.clarifaiList, clarifai]
      });
    });
  }

  getUsers = async () =>
    await fetch("https://e2c18673.ngrok.io/member/users")
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
        <Sidebar
          notificationList={this.state.notificationList}
          clarifaiList={this.state.clarifaiList}
        />
        <Map
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          users={this.state.users}
          notificationList={this.state.notificationList}
        />
      </div>
    );
  }
}

export default App;
