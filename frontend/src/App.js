// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.js';
import WorldMap from './components/WorldMap/WorldMap.js';
import './App.css';
import axios from 'axios';

const App = () => {
  const [configData, setConfigData] = useState({});
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const configResponse = await axios.get('http://127.0.0.1:5000/api/config');
        const graphResponse = await axios.get('http://127.0.0.1:5000/api/graph');
        setConfigData(configResponse.data);
        setGraphData(graphResponse.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="app">
      <>
        <Header />
        <WorldMap graphData={graphData} configData={configData} />
      </>

    </div>
  );
};

export default App;

