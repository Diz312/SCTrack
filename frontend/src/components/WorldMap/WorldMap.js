// src/components/WorldMap.js

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import { Polyline } from 'react-leaflet';
const WorldMap = ({ graphData }) => {
  return (
    <MapContainer
      center={[41.8781, -87.6298]}  // Centered on Chicago
      zoom={12}  // Zoom to 10 mile radius
      style={{ height: "800px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {graphData.nodes.map((node, index) => (
        <Marker 
          key={index} 
          position={node.location} 
          icon={icon({
            iconUrl: require(`./${node.logo}`),
            iconSize: [50, 50], // Size of the marker (scaled up)
            iconAnchor: [25, 50], // Anchor point of the marker (scaled up)
            popupAnchor: [0, -50], // Popup position (scaled up)
            className: 'leaflet-zoom-hide' // Prevent marker size from changing with zoom
          })}
        >
          <Popup>
            <strong>{node.name}</strong><br />
            {node.address}
          </Popup>
        </Marker>
      ))}
      {graphData.edges.map((edge, index) => {
        const sourceNode = graphData.nodes.find(node => node.name === edge.source);
        const targetNode = graphData.nodes.find(node => node.name === edge.target);
        if (sourceNode && targetNode) {
          let color = "blue"; // Default color
          if (sourceNode.type === "ACCN" || targetNode.type === "ACCN") {
            color = "purple"; // Color for Accenture nodes
          }
          if (sourceNode.type === "MHQ" || targetNode.type === "MHQ") {
            color = "red"; // Color for MHQ nodes
          }
          return (
            <Polyline
              key={index}
              positions={[sourceNode.location, targetNode.location]}
              color={color}
            />
          );
        }
        return null;
      })}
    </MapContainer>
  );
};

export default WorldMap;
