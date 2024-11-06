# Supply Chain Visualization Application

## Background

The Supply Chain Visualization Application is designed to provide users with an interactive, map-based overview of a supply chain network. By leveraging modern frameworks like Flask, React, D3, and Axios, this application allows users to visualize and explore relationships between supply chain entities (e.g., manufacturers, warehouses, distributors) overlaid on a Google Maps interface.

The backend, powered by Flask, serves data to the frontend by retrieving it from a serialized graph data file and YAML-based configuration file. The graph data is processed and returned as JSON, allowing the React frontend to dynamically render it using D3 for visualization. The D3 component overlays the graph on a Google Maps background, and nodes are positioned based on geospatial data, with size adjustments reflecting traffic volume or other attributes.

This modular architecture, which incorporates Axios for efficient API communication, ensures scalability, allowing for future functionality to be easily added. Additionally, a left-side navigation pane and a refresh button enhance usability by allowing users to reload data as they explore different configurations and perspectives within the supply chain.

## Application Architecture
                          +----------------+
                          |     User       |
                          +----------------+
                                 |
                                 |
                             Interacts
                                 |
                +----------------v----------------+
                |            Frontend             |
                |    Renders Visuals in React UI  |
                |  +---------+      +-----------+ |
                |  | React   |<---->|    D3     | |
                |  +---------+      +-----------+ |
                |        |                |       |
                |        |                |       |
                |        |                |       |
                |     +-------------------------+ |
                |     |         Axios           | |
                |     +-------------------------+ |
                |                   |             |
                +-------------------|-------------+
                                    |
                                    | API Request
                                    |
                          +---------v---------+
                          |      Backend      |
                          |    Fetches Data   |
                          |   +-----------+   |
                          |   |  FlaskAPI |   |
                          |   +-----------+   |
                          |         |         |
                          +---------|---------+
                                    |
                                    |
                   +----------------v----------------+
                   |         Data Sources            |
                   |                                 |
                   | +-----------+   +-------------+ |
                   | | GraphData |   | YAML Config | |
                   | +-----------+   +-------------+ |
                   +---------------------------------+

## Environment Setup
### Python (for backend)
**Use `pipenv` to set up a Virtual Python Environment**

Open 'terminal' and run the following command:
```terminal  \
pip install pipenv (if not already installed)
pipenv install
``` 
**Select the Python Interpreter in IDE**

(Assuming VS Code) open the command palette and run the following command:
```
Python: Select Interpreter
```
Select the interpreter that matches the Python version in the Pipfile and the name of the folder in the root directory (i.e. SCtrack)

### React (for frontend)
**Note**: Below steps assume the REACT application is already bootstrapped. If it is, the necessary folder structure and bootstrap .JS and HTML files should already be in the /frontend directory appropriately. If not, see the ***Frontend Bootstrap*** section below.

Assuming the REACT application is already bootstrapped, the following steps are needed to install all the necessary dependencies for the REACT application in the /frontend/node_modules directory since this directory is included in the .gitignore and the node_modules directory is not committed to the repository.This folder carries all the dependencies for the REACT application and is necessary for the application to run.

First make sure Node.js and npm are installed on the machine
```
For Mac (without Homebrew):
Visit Node.js official website
Download and install the LTS version for macOS
```

After installation, verify that both Node.js and npm are installed:
```terminal
   node --version
   npm --version
```

Once this is done go to the `./frontend` directory and run the following terminal command:
```terminal
npm install
npm-check-updates -u 
```

**Install AXIOS and D3**

Axios is a popular JavaScript library used to make HTTP requests from a browser or Node.js. It’s particularly favored in frontend applications for its simplicity, powerful features, and support for modern JavaScript like async/await. 

D3 is a JavaScript library for building data visualizations based on prebuilt components. React and D3 can be used together to create a powerful and flexible data visualization application.

Go to the frontend directory and install axios and d3.
```terminal
npm install axios
npm install d3
```
At this point you should be able to run the following command to start the REACT application:
```terminal
npm start
```
This will start the REACT application. 

**Install Google Maps and Mapbox Libraries**

For Google Maps visualization using @vis.gl/react-google-maps: 
```terminal
npm install @vis.gl/react-google-maps
```
For Mapbox visualization using react-map-gl: 
```terminal
npm install mapbox-gl
```

### Frontend Initial Bootstrap
The frontend is built with React and uses npm to manage the dependencies. Below are the steps to bootstrap the project from scratch. This, however, should not be necessary if the application is pulled from the repository as the folder structures should already be in the /frontend directory. 

**Bootstrap React**

Go to the frontend directory and create the react app. This will install all the necessary dependencies and create the folder structure for the React app.
```terminal  
cd ../frontend
npx create-react-app .
```


## Application Components

### Backend (WIP)

#### app.py

This file will serve as the main Flask application. It will set up API routes and serve the frontend application. 

Key parts include:
- **API Endpoints**:
  - `/api/graph`: Fetches the graph data in JSON format for D3 visualization.
  - `/api/config`: Provides filter options and other configurable UI settings based on the YAML configuration.
  - `/api/refresh`: Reloads graph data and filter settings when the user refreshes the graph.

#### config_loader.py
This module loads the **config.yaml** file.
The application configuration is loaded into a dictionary and returned.
The plan is to use this to control configurable UI settings and other components to make the  app flexible.
The **config.yaml** file has to be located in the **same directory as the config_loader.py file (i.e. /backend directory)**.
The configuration will be accessed dynamically from the frontend via the /api/config endpoint.

##### config.yaml (example)
```yaml
filters:
  - type: node_type
    options: ["Manufacturer", "Warehouse", "Distributor"]
display:
  node_size_multiplier: 1.5
  map_zoom_level: 2
etc..
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

#### data_handler.py (NOT STARTED)
This module manages loading and saving graph data in the pickle file format. It will provide functions to unpickle, manipulate, and repickle the data.
import pickle

### Frontend (WIP)
The front end will be a combination of React and D3 components.

#### React Components
**Header Component:** Displays the header with the logo and the refresh button.
**WorldMap Component:** Uses **LeafLet and OpenStreetMap** as the background for displaying the supply chain network. The plan is to replace this with **Google Maps** in the future.


### Testing (NOT STARTED)
This is the plan for the testing of the application. 
Testing code has not been developed yet and is part of the future work.

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




