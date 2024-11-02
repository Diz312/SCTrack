// src/App.js

import React from 'react';
import Header from './components/Header/Header.js';  // Import Header component
import WorldMap from './components/WorldMap/WorldMap.js';  // Import WorldMap component
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />  {/* Render Header component */}
      <WorldMap />  {/* Render WorldMap component */}
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
