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
  return (
    <GoogleMap
      options={{ mapTypeControl: false, streetViewControl: false }}
      mapTypeId="satellite"
      defaultZoom={12}
      defaultCenter={{ lat: props.mapCenter.lat, lng: props.mapCenter.lng }}
    >
      <div className="noScollbar">
        {props.isMarkerShown && props.users
          ? props.users.map((marker, key) => (
              <CustomMarker
                key={key}
                latitude={parseFloat(marker.location.latitude)}
                longitude={parseFloat(marker.location.longitude)}
                name={marker.name}
                profession={marker.profession}
                heartRate={marker.heartRate}
                weight={marker.weight}
                height={marker.height}
              />
            ))
          : "kjashdkjasd"}
      </div>
    </GoogleMap>
  );
});

export default Map;
