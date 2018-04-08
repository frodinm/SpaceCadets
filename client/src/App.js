import React, { Component } from "react";
import MapNav from "./components/MapNav";
import Sidebar from "./components/Sidebar";
import logo from "./logo.svg";
import Axios from "axios";
import "./App.css";
import { Map } from "./components";
import Test from "./components/test";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: null,
      notificationList: [],
      clarifaiList: [],
      newCoordinatesDelta: { lat: 20.4, lng: 7.4 },
      notificationList: []
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
    await fetch("http://localhost:5000/member/users")
      .then(x => x.json())
      .then(y => this.setState({ users: y }));

  getCenterCoordinates = () => {
    return this.state.newCoordinatesDelta;
  };

  updateMapView = direction => {
    switch (direction) {
      case "topLeft":
        this.setState(st => {
          return {
            newCoordinatesDelta: {
              lat: st.newCoordinatesDelta.lat - 0.5,
              lng: st.newCoordinatesDelta.lng + 0.5
            }
          };
        });
        break;
      case "top":
        this.setState(st => {
          return {
            newCoordinatesDelta: {
              lat: st.newCoordinatesDelta.lat + 0,
              lng: st.newCoordinatesDelta.lng + 0.5
            }
          };
        });
        break;
      case "topRight":
        this.setState(st => {
          return {
            newCoordinatesDelta: {
              lat: st.newCoordinatesDelta.lat + 0.5,
              lng: st.newCoordinatesDelta.lng + 0.5
            }
          };
        });
        break;
      case "right":
        this.setState(st => {
          return {
            newCoordinatesDelta: {
              lat: st.newCoordinatesDelta.lat + 0.5,
              lng: st.newCoordinatesDelta.lng + 0
            }
          };
        });
        break;
      case "bottomRight":
        this.setState(st => {
          return {
            newCoordinatesDelta: {
              lat: st.newCoordinatesDelta.lat + 0.5,
              lng: st.newCoordinatesDelta.lng - 0.5
            }
          };
        });
        break;
      case "bottom":
        this.setState(st => {
          return {
            newCoordinatesDelta: {
              lat: st.newCoordinatesDelta.lat + 0,
              lng: st.newCoordinatesDelta.lng - 0.5
            }
          };
        });
        break;
      case "bottomLeft":
        this.setState(st => {
          return {
            newCoordinatesDelta: {
              lat: st.newCoordinatesDelta.lat - 0.5,
              lng: st.newCoordinatesDelta.lng - 0.5
            }
          };
        });
        break;
      case "left":
        this.setState(st => {
          return {
            newCoordinatesDelta: {
              lat: st.newCoordinatesDelta.lat - 0.5,
              lng: st.newCoordinatesDelta.lng + 0
            }
          };
        });
        break;
      default:
        break;
    }
  };

  componentWillMount = async () => {
    this.getUsers();
  };

  render() {
    return (
      <div className="App">
        <Sidebar
          notificationList={this.state.notificationList}
          clarifaiList={this.state.clarifaiList}
        />
        <MapNav passMapViewDirection={this.updateMapView} />
        <Map
          ref={gm => (this.googleMap = gm)}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          users={this.state.users}
          notificationList={this.state.notificationList}
          mapCenter={this.getCenterCoordinates()}
        />
      </div>
    );
  }
}

export default App;
