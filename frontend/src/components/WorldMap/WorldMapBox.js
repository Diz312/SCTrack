import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css';
import './WorldMapBox.css'

function WorldMapBox() {
  const [MAPBOX_ACCESS_TOKEN, setMapBoxAccessToken] = useState('');
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    // Fetch the Mapbox key from the Flask API
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

  useEffect(() => {
    console.log('Mapbox key in useEffect:', MAPBOX_ACCESS_TOKEN); // Debugging log
    if (!MAPBOX_ACCESS_TOKEN) {
      console.log('Mapbox key is not available');
      return; // Ensure map is initialized only when MAP_BOX_ACCESS_TOKEN is available
    }

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN; // Use the fetched MAP_BOX_ACCESS_TOKEN

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove();
    };
  }, [MAPBOX_ACCESS_TOKEN]); // Ensure this useEffect depends on map_box_access_token

  return (
    <>
      <div id='map-container' ref={mapContainerRef}/>
    </>
  )
}

export default WorldMapBox
