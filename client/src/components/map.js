import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { default as CustomMarker } from "../components/CustomMarker";
const { compose, withProps, withStateHandlers } = require("recompose");

export const Map = compose(
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => {
  let markerList = [];
  if (props.isMarkerShown && props.users) {
    props.users.forEach(marker => {
      console.log("p", props.notifName);
      console.log("m", marker.name);
      if (props.notifName === marker.name) {
        console.log("yess");
        markerList.push(
          <CustomMarker
            latitude={parseFloat(marker.location.latitude)}
            longitude={parseFloat(marker.location.longitude)}
            name={marker.name}
            profession={marker.profession}
            heartRate={marker.heartRate}
            weight={marker.weight}
            height={marker.height}
            notif={true}
          />
        );
      } else {
        markerList.push(
          <CustomMarker
            latitude={parseFloat(marker.location.latitude)}
            longitude={parseFloat(marker.location.longitude)}
            name={marker.name}
            profession={marker.profession}
            heartRate={marker.heartRate}
            weight={marker.weight}
            height={marker.height}
            notif={false}
          />
        );
      }
    });
  }

  return (
    <GoogleMap
      options={{ mapTypeControl: false, streetViewControl: false }}
      mapTypeId="satellite"
      defaultZoom={12}
      defaultCenter={{ lat: props.mapCenter.lat, lng: props.mapCenter.lng }}
    >
      <div className="noScollbar">{markerList}</div>
    </GoogleMap>
  );
});

export default Map;
