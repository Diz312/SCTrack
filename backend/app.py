# backend/app.py
from flask import Flask, jsonify, Response
from flask_cors import CORS
from config_loader import load_config  # Assuming load_config is the function to get config data
import requests

app = Flask(__name__)
CORS(app)

# Sample data to simulate graph and configuration
graph_data = {
    "nodes": [
       {"name": "McDonald's 600 N Clark St", "address": "600 N Clark St, Chicago, IL 60610", "latitude":41.88872904554145, "longitude":-87.65304094650439, "logo": "McDonalds_Logo.png", "type": "RST"}
    ],
    "edges": []
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

