import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
// import 'mapbox-gl/dist/mapbox-gl.css';
import './WorldMapBox.css'

function WorldMapBox() {

  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGl6MzEyIiwiYSI6ImNtMzRvYTJraTAwZ28ycnB2ZmJpYWhoOHAifQ.76sBUjcSBy9nOGxB6i45_w'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])

  return (
    <>
      <div id='map-container' ref={mapContainerRef}/>
    </>
  )
}

export default WorldMapBox
