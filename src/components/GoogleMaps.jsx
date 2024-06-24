import React from "react";
import { APIProvider, Map, Marker, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useMapsContext } from "../context/MapsContext";
const GoogleMaps = () => {
    const {places, setPlaces } = useMapsContext();
    
  return (
    <div id="maps-section" className="bg-black flex-grow p-4 overflow-y-auto ">
      <APIProvider apiKey={import.meta.env.VITE_MAP_API_KEY}>
        <Map
          defaultCenter={{ lat:20.9345332242869,lng: 77.74526184228444 }}
          defaultZoom={6}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          mapId="4ee58f22973d3e46"
          className=""
        >
            <AdvancedMarker position={{lat:20.9345332242869,lng: 77.74526184228444}}  > 
            <Pin background={'#1e1e1e'} glyphColor={'#ffffff'} borderColor={'#000'}  />
            </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleMaps;
