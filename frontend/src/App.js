// // src/App.js

import React from 'react';
import './App.css';
import Header from './components/Header/Header'; // Import Header component
import WorldMap from './components/WorldMap/WorldMap'; // Import WorldMap component

function App() {
  return (
    <div className="App">
      <Header /> {/* Render Header component */}
      <WorldMap /> {/* Render WorldMap component */}
    </div>
  );
}

export default App;
