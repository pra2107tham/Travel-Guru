import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { useMapsContext } from "../context/MapsContext";
import axios from "axios";
const GoogleMaps = () => {
  const { places, setPlaces } = useMapsContext();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const markerPromises = places.map(async (place) => {
          const response = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            {
              params: {
                address: place,
                key: import.meta.env.VITE_MAP_API_KEY,
              },
            }
          );
          //   console.log(response.data)
          if (response.data.results && response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            return { lat, lng };
          } else {
            console.log(`No results found for place: ${place}`);
            return null;
          }
        });

        const markerLocations = await Promise.all(markerPromises);
        setMarkers(markerLocations);
      } catch (error) {
        console.error("Error fetching coordinates: ", error);
      }
    };

    if (places.length > 0) {
      fetchCoordinates();
    }
  }, [places]);

  return (
    <div id="maps-section" className="bg-black flex-grow p-4 overflow-y-auto ">
      <APIProvider apiKey={import.meta.env.VITE_MAP_API_KEY}>
        <Map
          defaultCenter={{ lat: 20.9345332242869, lng: 77.74526184228444 }}
          defaultZoom={6}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          mapId="4ee58f22973d3e46"
          className=""
        >
          {markers.map((marker, index) => (
            <AdvancedMarker key={index} position={marker}>
              <Pin
                background={"#1e1e1e"}
                glyphColor={"#ffffff"}
                borderColor={"#000"}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleMaps;
