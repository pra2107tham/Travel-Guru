import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
  Pin,
  InfoWindow
} from "@vis.gl/react-google-maps";
import { useMapsContext } from "../context/MapsContext";
import axios from "axios";
const GoogleMaps = () => {
  const { places, setPlaces } = useMapsContext();
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error fetching user location: ", error)
      );
    }
  }, []);

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
        setMarkers(markerLocations.filter((marker) => marker !== null));

        // Fit map to markers
        if (map && markerLocations.length > 0) {
          const bounds = new window.google.maps.LatLngBounds();
          markerLocations.forEach((marker) => {
            if (marker) bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
          });
          map.fitBounds(bounds);
        }
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
          defaultCenter={userLocation || { lat: 37.7749, lng: -122.4194}}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          mapId="4ee58f22973d3e46"
          className=""
        >
          {markers.map((marker, index) => (
            <AdvancedMarker 
            key={index} 
            position={marker}
            
                >
              <Pin
                background={"#1e1e1e"}
                glyphColor={"#ffffff"}
                borderColor={"#000"}
                className=" cursor-pointer"
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleMaps;
