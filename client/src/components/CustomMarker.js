import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

export default class CustomMarker extends React.Component {
  state = {
    isOpen: false
  };

  onMarkerClick = () => {
    this.setState(st => {
      return { isOpen: !st.isOpen };
    });
  };

  onCloseInfoBox = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const {
      latitude,
      longitude,
      name,
      profession,
      heartRate,
      weight,
      height
    } = this.props;

    const google = window.google;
    var marker_icon = {
      url: "/images/humanflag.png",
      size: new google.maps.Size(100, 100),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(100, 100)
    };

    return (
      <Marker
        options={{ icon: marker_icon }}
        position={{ lat: latitude, lng: longitude }}
        onClick={this.onMarkerClick}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.onCloseInfoBox}>
            <div>
              <div>Name: {name} </div>
              <div>Profession: {profession}</div>
              <div>Heart Rate: {heartRate}</div>
              <div>Height: {height}</div>
              <div>Weight: {weight}</div>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}
