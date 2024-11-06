import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGl6MzEyIiwiYSI6ImNtMzRvYTJraTAwZ28ycnB2ZmJpYWhoOHAifQ.76sBUjcSBy9nOGxB6i45_w';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-87.6298, 41.8781], // Chicago coordinates
      zoom: 10 // Adjust zoom level as needed
    });

    return () => mapRef.current.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ height: '100%' }} />;
};

export default MapboxExample;