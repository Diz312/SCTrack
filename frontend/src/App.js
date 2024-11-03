// src/App.js

import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.js';  // Import Header component
import WorldMap from './components/WorldMap/WorldMap.js';  // Import WorldMap component
import './App.css';
import axios from 'axios';

const App = () => {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/graph');
        setGraphData(response.data);
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    fetchGraphData();
  }, []);

  return (
    <div className="app">
      <Header />  {/* Render Header component */}
      <WorldMap graphData={graphData} />  {/* Render WorldMap component with graphData */}
    </div>
  );
};

export default App;




// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
