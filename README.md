# SPEC-1: Supply Chain Visualization Application

## Background

This project aims to create a modular, single-screen Flask-based web application that allows users to visually explore a supply chain network on a world map. Using a graph dataset stored in a pickle file, users will be able to filter nodes based on dynamic attributes, such as type of supply chain entity (e.g., manufacturers, warehouses, distribution centers) or node-specific characteristics (e.g., location, supply volume). The application is designed for modularity, allowing additional functionality to be easily integrated over time.

The application will feature a dynamic user interface, using React.js for a modern look and feel and incorporating a navigation pane to support future extensions. A configurable interface will enable easy management of filtering criteria, while a D3 visualization overlays the supply chain network on a Google Maps background. The node sizes reflect supply chain traffic volumes, providing an interactive overview of the supply chain's geospatial distribution and scale.

## Requirements

### Must-Have
- Single screen application with a flat Google Maps map as the background.
- Node data from a graph dataset stored in a pickle file representing supply chain entities and connections.
- Separate backend module to unpickle the graph data into a text file for attribute manipulation, then repickle it after updates.
- Radio button filters for selecting node types and attributes, configurable from the backend.
- D3-based visualization overlay with geospatial placement of nodes on the map.
- Graph nodes displayed as circles, with size dependent on traffic volume.
- Button to refresh the graph after filter changes.
- React.js-based frontend for a modern, enjoyable user experience.
- Left-side navigation pane for future extensions.
- Modular architecture to support incremental development and future functionality.
- Overall app behavior configuration stored in a YAML file for easy adjustments.

### Should-Have
- Dynamic update of filter criteria in the UI based on available node attributes.
- Smooth, responsive interactions on the map for user experience.

### Could-Have
- Option for users to click on nodes for more information (e.g., popup with node details).
