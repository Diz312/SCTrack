// src/components/WorldMap.js

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WorldMap = () => {
  return (
    <MapContainer
      center={[40.0, -100.0]}  // Centered on North America
      zoom={4}  // Zoom level to focus on North America
      style={{ height: "800px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Add markers or custom overlays here as needed */}
    </MapContainer>
  );
};

export default WorldMap;
