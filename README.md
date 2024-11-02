# Supply Chain Visualization Application

## Background

The Supply Chain Visualization Application is designed to provide users with an interactive, map-based overview of a supply chain network. By leveraging modern frameworks like Flask, React, D3, and Axios, this application allows users to visualize and explore relationships between supply chain entities (e.g., manufacturers, warehouses, distributors) overlaid on a Google Maps interface.

The backend, powered by Flask, serves data to the frontend by retrieving it from a serialized graph data file and YAML-based configuration file. The graph data is processed and returned as JSON, allowing the React frontend to dynamically render it using D3 for visualization. The D3 component overlays the graph on a Google Maps background, and nodes are positioned based on geospatial data, with size adjustments reflecting traffic volume or other attributes.

This modular architecture, which incorporates Axios for efficient API communication, ensures scalability, allowing for future functionality to be easily added. Additionally, a left-side navigation pane and a refresh button enhance usability by allowing users to reload data as they explore different configurations and perspectives within the supply chain.


## Bootstrapping
**Virtual Environment**
Use pipenv to install dependencies and create a virtual environment.
```terminal  
pipenv install
``` 
**Bootstrap React**
Go to the frontend directory and create the react app. This will install all the necessary dependencies and create the folder structure for the React app.
```terminal  
cd ../frontend
npx create-react-app .
```

**Update all the dependencies to the latest version**
```terminal
npm install -g npm-check-updates 
npm-check-updates -u 
npm install
```
**Install AXIOS and D3**
Axios is a popular JavaScript library used to make HTTP requests from a browser or Node.js. It’s particularly favored in frontend applications for its simplicity, powerful features, and support for modern JavaScript like async/await. 

D3 is a JavaScript library for building data visualizations based on prebuilt components. React and D3 can be used together to create a powerful and flexible data visualization application.

Go to the frontend directory and install axios and d3.
```terminal
npm install axios
npm install d3
```

## Project Structure
The project will be organized with separate directories for backend, frontend, and configuration files. The structure will look like this:

SCtrack/
├── backend/
│ ├── app.py # Main Flask application file
│ ├── config.yaml # YAML configuration file
│ ├── graph_data.gpickle # Pickle file storing the graph data
│ ├── data_handler.py # Module for handling pickle data
│ ├── config_loader.py # Module for loading YAML configuration
│ └── utils.py # New utility functions module
├── frontend/
│ ├── components/ # Directory for React.js components
│ └── index.js # Main entry point for React application
├── .gitignore
├── IMP.md
├── LICENSE
├── METHOD.md
└── README.md
### Backend (Flask)

#### app.py

The main Flask app will set up API routes and serve the frontend application. Key parts include:

- **API Endpoints**:

  - `/api/graph`: Fetches the graph data in JSON format for D3 visualization.
  - `/api/config`: Provides filter options and other configurable UI settings based on the YAML configuration.
  - `/api/refresh`: Reloads graph data and filter settings when the user refreshes the graph.

- **CORS Setup**: Flask-CORS will be configured to allow frontend requests.

Example code for `app.py`:

```python
from flask import Flask, jsonify
from flask_cors import CORS
from data_handler import load_graph_data
from config_loader import load_config

app = Flask(__name__)
CORS(app)

@app.route('/api/graph')
def get_graph_data():
    data = load_graph_data()
    return jsonify(data)

@app.route('/api/config')
def get_config():
    config = load_config()
    return jsonify(config)

@app.route('/api/refresh', methods=['POST'])
def refresh_graph():
    # Logic to refresh data from pickle file and return updated JSON
    data = load_graph_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
```

#### config.yaml

This module loads settings from config.yaml, providing flexible control over filter options, node attributes, and other UI behaviors. The configuration can be accessed dynamically from the frontend via the /api/config endpoint.

Example of a YAML config structure (config.yaml):

```yaml
filters:
  - type: node_type
    options: ["Manufacturer", "Warehouse", "Distributor"]
  - type: region
    options: ["North America", "Europe", "Asia"]
display:
  node_size_multiplier: 1.5
  map_zoom_level: 2
```

#### graph_data.gpickle

This file stores the graph data in a json format. The attributes of the nodes and links need to correlate to the filter options in the **config.yaml** file: 

```json
{
    "directed": true,
    "multigraph": false,
    "graph": {},
    "nodes": [
        {
            "loc": [
                -80.59957,
                28.172040999999997
            ],
            "ty": "sup",
            "pc": "sup",
            "id": "A Drum Pack Inc USA Satellite Beach (MF)"
        },
        {
            "loc": [
                -80.85755999999999,
                41.205342
            ],
            "ty": "dis",
            "pc": "dis",
            "id": "Anderson and Dubose, Inc  USA Lordstown (DC 88)"
        },
    "links": [
        {
            "pc": "Operating Supplies",
            "psc": "Can Liner",
            "spend": 16074.245000000003,
            "source": "A Drum Pack Inc USA Satellite Beach (MF)",
            "target": "Anderson and Dubose, Inc  USA Lordstown (DC 88)"
        },
        {
            "pc": "Operating Supplies",
            "psc": "Cleaning Supplies",
            "spend": 74865.73580000001,
            "source": "Kay Chemical Company USA WINSTON SALEM (MF)",
            "target": "Earp Meat Company USA KANSAS CITY (DC 45)"
        },
    ]
}
```
#### config_loader.py
This module loads the configuration from the YAML file.
The config.yaml file is loaded into a dictionary and returned.
It contains the filter options and other configurable UI settings.
The config.yaml file has to be located in the same directory as the config_loader.py file (i.e. /backend directory).

#### data_handler.py

This module manages loading and saving graph data in the pickle file format. It will provide functions to unpickle, manipulate, and repickle the data.
import pickle

```python
import pickle

def load_graph_data():
    with open('graph_data.pkl', 'rb') as f:
        return pickle.load(f)

def save_graph_data(data):
    with open('graph_data.pkl', 'wb') as f:
        pickle.dump(data, f)
```

### Frontend (React)

#### Core React Components

**Map Component:** Integrates Google Maps as the background.
**Graph Component:** Renders D3 nodes on the map, adjusting circle size based on the traffic volume.
**Filter Component:** Displays filter radio buttons dynamically based on config data.
**Navigation Pane:** Allows future components to be added for extension.

Example of the FilterComponent with dynamic options from /api/config:

```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";

function FilterComponent({ onFilterChange }) {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    axios.get("/api/config").then((response) => {
      setFilters(response.data.filters);
    });
  }, []);

  return (
    <div>
      {filters.map((filter) => (
        <div key={filter.type}>
          <h4>{filter.type}</h4>
          {filter.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={filter.type}
                value={option}
                onChange={onFilterChange}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

export default FilterComponent;
```

#### D3 Graph Visualization

The GraphComponent will render nodes using D3, using geospatial attributes for positioning and adjusting size based on traffic volume.
An onClick handler will trigger the /api/refresh call when users request an update.

Example use:
**_Effect hook to render D3 elements:_**

```javascript
import React, { useEffect } from "react";
import * as d3 from "d3";

function GraphComponent({ data }) {
  useEffect(() => {
    const svg = d3.select("#graph-svg");

    svg
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x) // Geospatial x-position
      .attr("cy", (d) => d.y) // Geospatial y-position
      .attr("r", (d) => d.traffic * 1.5) // Size based on traffic volume
      .attr("fill", "blue");
  }, [data]);

  return <svg id="graph-svg" width="800" height="600"></svg>;
}

export default GraphComponent;
```

#### index.js

The main entry point for the React application, setting up the App component and rendering it to the DOM.

### Testing

#### Backend Testing (test_backend.py)

**Testing Framework**: The backend will use `pytest` as the primary testing framework for automated unit and integration tests. Tests will include:

- **API Endpoint Tests**: Verifies responses from each endpoint (`/api/graph`, `/api/config`, `/api/refresh`) for correct status codes, data formats, and content based on mock data.
- **Data Handling Tests**: Ensures correct loading and saving of data from the `graph_data.gpickle` file. This will include:
  - Tests to validate the structure and integrity of unpickled data.
  - Mocking scenarios where the pickle file may be malformed or contain corrupted data.
- **Configuration Loading Tests**: Tests the `config_loader.py` functionality to confirm that settings are correctly loaded and returned as expected for configurable options in `config.yaml`.
- **Utility Tests**: Any utility functions defined in `utils.py` will have dedicated tests for verification, especially if they handle data transformations or calculations used in multiple parts of the application.

#### Frontend Testing (test_frontend.js)

Testing Framework: The frontend will use Jest and React Testing Library for unit and integration tests. This setup will allow testing of both UI components and their interactions with backend APIs.

-**Component Tests:**
-Tests for individual React components, such as MapComponent, GraphComponent, and FilterComponent, ensuring they render correctly and respond to user interactions.
-UI tests for the left navigation pane to ensure visibility and potential future component interactions.
**API Interaction Tests:**
-Tests to ensure API requests and responses work as expected, especially the integration with /api/config and /api/graph.
-Mocking API calls to validate how the application responds to different configurations and dataset inputs.

Example Command: To run all frontend tests, execute:

```bash
npm test
```

#### Integration Testing

For end-to-end testing, Cypress can be used to simulate user interactions with the entire application:
**User Workflow Tests:** Testing a full user interaction, from loading the map, selecting filters, refreshing the graph, and viewing updated data.
**Error Handling:** Tests to check how the application handles failed API requests or invalid configurations.




