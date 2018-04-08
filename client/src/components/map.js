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
)(props => {
  console.log(props);

  return (
    <GoogleMap
      options={{ mapTypeControl: false, streetViewControl: false }}
      mapTypeId="satellite"
      defaultZoom={12}
      defaultCenter={{ lat: 20.3554841, lng: 7.5730188 }}
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
              />
            ))
          : "kjashdkjasd"}
      </div>
    </GoogleMap>
  );
});

export default Map;
