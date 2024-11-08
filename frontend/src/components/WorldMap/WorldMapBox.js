import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css';
import './WorldMapBox.css'

const INITIAL_CENTER = [-98.5795, 39.8283] //TODO: get from config
const INITIAL_ZOOM = 3 //TODO: get from config  

function WorldMapBox() {
  const [MAPBOX_ACCESS_TOKEN, setMapBoxAccessToken] = useState('');
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)

  useEffect(() => { // Fetch the Mapbox key from the Flask API. The Flask route will run config_loader.py to pull key from .env that needs to be in root directory
    fetch('http://127.0.0.1:5000/api/config')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Log the fetched data
        if (data.MAPBOX_ACCESS_TOKEN) {
          setMapBoxAccessToken(data.MAPBOX_ACCESS_TOKEN);
        } else {
          console.error('Mapbox key is missing in the response');
        }
      })
      .catch(error => console.error('Error fetching Mapbox key:', error));
  }, []);

  useEffect(() => { // Initialize the map and fly to the initial center and zoom
    if (!MAPBOX_ACCESS_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    mapRef.current.on('load', () => {
      mapRef.current.flyTo({
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM,
        speed: 0.5,
        curve: 1,
      });
    });

    return () => {
      mapRef.current.remove();
    };
  }, [MAPBOX_ACCESS_TOKEN]); // Only depend on MAPBOX_ACCESS_TOKEN

  useEffect(() => { // When user pans the map, update center and zoom info so it can be used in the sidebar
    if (!mapRef.current) return;

    const handleMove = () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();
      // console.log('Map moved:', mapCenter, mapZoom); // Debugging: log the new center and zoom
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    };

    mapRef.current.on('move', handleMove);

    return () => {
      mapRef.current.off('move', handleMove);
    };
  }, [mapRef]); // Correct dependency to mapRef
  
  return (
    <>
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      <div id='map-container' ref={mapContainerRef} />
    </>
  )
}

export default WorldMapBox
