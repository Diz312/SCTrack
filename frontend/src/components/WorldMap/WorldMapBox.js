import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import './WorldMapBox.css'

function WorldMapBox() {
  //TODO: get from config
  const initCenter = [-98.5795, 39.8283];
  const initZoom = 3;
  
  //set states
  const [center, setCenter] = useState([-98.5795, 39.8283]) //TODO: get from config
  const [zoom, setZoom] = useState(3) //TODO: get from config  
  const [mapboxAccessToken, setMapboxAccessToken] = useState('');

  //set refs
  const mapRef = useRef();
  const mapContainerRef = useRef();
 
  //set functions
  const handleReset = () => {
    mapRef.current.flyTo({
      center: initCenter,
      zoom: initZoom,
    });
  };
  
  useEffect(() => { // Fetch the Mapbox key from the Flask API. The Flask route will run config_loader.py to pull key from .env that needs to be in root directory
    fetch('http://127.0.0.1:5000/api/config')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Log the fetched data
        if (data.MAPBOX_ACCESS_TOKEN) {
          setMapboxAccessToken(data.MAPBOX_ACCESS_TOKEN);
        } else {
          console.error('Mapbox key is missing in the response');
        }
      })
      .catch(error => console.error('Error fetching Mapbox key:', error));
  }, []);

  useEffect(() => { // Initialize the map
    if (!mapboxAccessToken) return;

    mapboxgl.accessToken = mapboxAccessToken;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove();
    };
  }, [mapboxAccessToken]); // Only depend on MAPBOX_ACCESS_TOKEN

  useEffect(() => { // Do the initial fly to center and zoom
    if (!mapRef.current) return;

    mapRef.current.on('load', () => {
      mapRef.current.flyTo({
        center: [-98.5795, 39.8283],
        zoom: 3,
        speed: 0.5,
        curve: 1,
      });
    });
  }, [mapRef]); // Depend on center and zoom

  useEffect(() => { // LISTENER: When user pans the map, update center and zoom info so it can be used in the sidebar
    if (!mapRef.current) return;

    const handleMove = () => {
    const mapCenter = mapRef.current.getCenter();
    const mapZoom = mapRef.current.getZoom();
    console.log('Map moved:', mapCenter, mapZoom); // Debugging: log the new center and zoom
    setCenter([mapCenter.lng, mapCenter.lat]);
    setZoom(mapZoom);
    };

    mapRef.current.on('move', handleMove);

    return () => {
      mapRef.current.off('move', handleMove);
    };
  }, []); // Correct dependency to mapRef

  return (
    <>
      <div id='map-container' ref={mapContainerRef} />
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      <button className="reset-button" onClick={handleReset}>Reset</button>
    </>
  )
}

export default WorldMapBox
