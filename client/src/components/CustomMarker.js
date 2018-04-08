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
    this.setState({
      isOpen: true
    });
  };

  onCloseInfoBox = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { latitude, longitude, name, profession, heartRate } = this.props;

    return (
      <Marker
        position={{ lat: latitude, lng: longitude }}
        onClick={this.onMarkerClick}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.onCloseInfoBox}>
            <div>
              <div>Name: {name} </div>
              <div>Profession: {profession}</div>
              <div>Heart Rate: {heartRate}</div>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}
