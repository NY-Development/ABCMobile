import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "250px",
  borderRadius: "12px",
};

export default function BakeryMap({ lat, lng }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY, // make sure your env variable starts with VITE_
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (isLoaded && mapRef.current && lat && lng) {
      const map = mapRef.current;

      // Clear previous markers
      map?.markers?.forEach((m) => m.setMap(null));

      // Use AdvancedMarkerElement instead of deprecated Marker
      new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat, lng },
        title: "Bakery Location",
      });
    }
  }, [isLoaded, lat, lng]);

  if (!isLoaded) return <div>Loading map...</div>;
  if (!lat || !lng) return <div>Location not available</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={15}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    />
  );
}
