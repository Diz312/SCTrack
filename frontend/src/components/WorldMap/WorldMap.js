// src/components/WorldMap.js

import React, { useEffect, useRef } from 'react';

const WorldMap = ({ graphData, configData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCSRat9HWD3uvuhs9AMA5m0bpfR7lV2Y0k`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 41.8781, lng: -87.6298 },
        zoom: 12,
      });

      new window.google.maps.Marker({
        position: { lat: 41.88872904554145, lng: -87.65304094650439 },
        map: map,
      });
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initMap();
    }
  }, []);

  return <div ref={mapRef} style={{ height: '700px', width: '100%' }} />;
};

export default WorldMap;
