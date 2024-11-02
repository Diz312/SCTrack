# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
from config_loader import load_config  # Assuming load_config is the function to get config data

app = Flask(__name__)
CORS(app)

# Sample data to simulate graph and configuration
graph_data = {
    "nodes": [
        {"id": "1", "type": "Manufacturer", "location": "North America"},
        {"id": "2", "type": "Warehouse", "location": "Europe"}
    ],
    "edges": [
        {"source": "1", "target": "2", "traffic": 10}
    ]
}

config_data = load_config()  # Use the function to load config data

@app.route('/api/graph', methods=['GET'])
def get_graph_data():
    return jsonify(graph_data)

@app.route('/api/config', methods=['GET'])
def get_config():
    return jsonify(config_data)

if __name__ == '__main__':
    app.run(debug=True)

