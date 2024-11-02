# Supply Chain Visualization Application

## Background

The Supply Chain Visualization Application is designed to provide users with an interactive, map-based overview of a supply chain network. By leveraging modern frameworks like Flask, React, D3, and Axios, this application allows users to visualize and explore relationships between supply chain entities (e.g., manufacturers, warehouses, distributors) overlaid on a Google Maps interface.

The backend, powered by Flask, serves data to the frontend by retrieving it from a serialized graph data file and YAML-based configuration file. The graph data is processed and returned as JSON, allowing the React frontend to dynamically render it using D3 for visualization. The D3 component overlays the graph on a Google Maps background, and nodes are positioned based on geospatial data, with size adjustments reflecting traffic volume or other attributes.

This modular architecture, which incorporates Axios for efficient API communication, ensures scalability, allowing for future functionality to be easily added. Additionally, a left-side navigation pane and a refresh button enhance usability by allowing users to reload data as they explore different configurations and perspectives within the supply chain.

The project will be organized with separate directories for backend, frontend, and configuration files. The structure will look like this:

## Folder Structure
SCtrack/
├── backend/
│ ├── app.py # Main Flask application file
│ ├── config_loader.py # Module for loading YAML configuration
│ ├── config.yaml # YAML configuration file
│ ├── graph_data.gpickle # Pickle file storing the graph data
│ ├── data_handler.py # Module for managing the content of the pickle file
│ ├──  utils.py # Other Utilities
├── frontend/
│ ├── Various Files and Directories installed through React Bootstrap (see Frontend Bootstrap)
├── .gitignore
├── LICENSE
├── Pipfile # Python dependencies that are installed when you run "pipenv install"
├── Pipfile.lock # Lock file for the Pipfile
├── README.md # This file

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
                |                                  |
                |  +---------+      +-----------+ |
                |  | React   |<---->|    D3     | |
                |  +---------+      +-----------+ |
                |        |                |       |
                |        |    Renders     |       |
                |        |   Visuals in   |       |
                |        |    React UI    |       |
                |     +-------------------------+ |
                |     |         Axios           | |
                |     +-------------------------+ |
                |                   |              |
                +-------------------|--------------+
                                    |
                                    | API Request
                                    |
                          +---------v---------+
                          |      Backend      |
                          |                   |
                          |   +-----------+   |
                          |   |  FlaskAPI  |   |
                          |   +-----------+   |
                          |         |         |
                          |         | Fetches |
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

## Creating the Python environment
**Virtual Environment**
Use pipenv to install dependencies and create a virtual environment.
Open 'terminal' and run the following command:
```terminal  
pipenv install
``` 
Then (assuming VS Code) open the command palette and run the following command:
```terminal
Python: Select Interpreter
```
Select the interpreter that matches the Python version in the Pipfile and the name of the folder in the root directory (i.e. SCtrack).

## Frontend Bootstrap
The frontend is built with React and uses npm to manage the dependencies. Below are the steps to bootstrap the project from scratch when I was building it. 
This, however, should not be necessary if you are using the application ZIP file as all the dependencies should already be in the /frontend directory.

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
**Install Leaflet**
The `react-leaflet` and `leaflet` libraries are used to create interactive maps in React applications. `react-leaflet` is a React wrapper for `leaflet`, which is a popular open-source JavaScript library for mobile-friendly interactive maps. To install these libraries, run the following command:
```terminal
npm install react-leaflet leaflet
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




