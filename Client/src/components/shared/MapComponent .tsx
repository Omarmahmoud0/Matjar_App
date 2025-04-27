// src/MapComponent.tsx
import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";

const mapContainerStyle: React.CSSProperties = {
  height: "400px",
  width: "100%",
};

const center = {
  lat: -3.745,
  lng: -74.35,
};

const MapComponent: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setAddress(place.formatted_address);
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}
      libraries={["places"]}
    >
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete; // الاحتفاظ بمرجع الاوتوكومبليت
        }}
        onPlaceChanged={onPlaceChanged}
        options={{
          types: ["address"],
          componentRestrictions: { country: ["us"] },
        }}
      >
        <input
          type="text"
          placeholder="أدخل عنوانًا"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      />
    </LoadScript>
  );
};

export default MapComponent;
