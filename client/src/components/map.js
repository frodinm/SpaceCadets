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

const sampleMarkers = [
  {
    name: "Brennan Bennett",
    profession: "Mechanical engineer",
    latitude: 20.3554841,
    longitude: 7.5730188,
    heartRate: 110
  },
  {
    name: "Ammaarah Wilks",
    profession: "Researcher",
    latitude: 20.3754841,
    longitude: 7.630188,
    heartRate: 70
  }
];

// const Map = withScriptjs(
//   withGoogleMap(props => (
//     <GoogleMap
//       mapTypeId="satellite"
//       defaultZoom={12}
//       defaultCenter={{ lat: 20.3554841, lng: 7.5730188 }}
//     >
//       <div>
//         {props.isMarkerShown &&
//           sampleMarkers.map((marker, key) => (
//             <Marker
//               key={key}
//               position={{ lat: marker.latitude, lng: marker.longitude }}
//             >
//               <InfoWindow onCloseClick={props.onToggleOpen}>
//                 <div>
//                   <div>Name: {marker.name} </div>
//                   <div>Profession: {marker.profession}</div>
//                 </div>
//               </InfoWindow>
//             </Marker>
//           ))}
//       </div>
//     </GoogleMap>
//   ))
// );

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
)(props => (
  <GoogleMap
    mapTypeId="satellite"
    defaultZoom={12}
    defaultCenter={{ lat: 20.3554841, lng: 7.5730188 }}
  >
    <div>
      {props.isMarkerShown &&
        sampleMarkers.map((marker, key) => (
          <CustomMarker
            key={key}
            latitude={marker.latitude}
            longitude={marker.longitude}
            name={marker.name}
            profession={marker.profession}
            heartRate={marker.heartRate}
          />
        ))}
    </div>
  </GoogleMap>
));

export default Map;