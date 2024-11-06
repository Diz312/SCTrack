// src/components/WorldMap.js

import React, { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';

const mapContainerStyle = {
  height: '700px',
  width: '100%',
};

const initialCenter = { lat: 41.8781, lng: -87.6298 };
const markerPosition = { lat: 41.88872904554145, lng: -87.65304094650439 };

const WorldMap = () => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [zoom, setZoom] = useState(10);

  return (
    <APIProvider apiKey=""> 
      <div style={mapContainerStyle}>
        <Map
          defaultCenter={initialCenter}
          zoom={zoom}
          onZoomChanged={(newZoom) => setZoom(newZoom)}
          options={{
            zoomControl: true,
            draggable: true,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            fullscreenControl: true,
            mapTypeControl: true,
            streetViewControl: true,
            gestureHandling: 'greedy',
          }}
          style={{ height: '100%', width: '100%' }}
        >
          <Marker
            position={markerPosition}
            onClick={() => setInfoWindowOpen(true)}
          />
          {infoWindowOpen && (
            <InfoWindow
              position={markerPosition}
              onCloseClick={() => setInfoWindowOpen(false)}
            >
              <div>MHQ</div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default WorldMap;
