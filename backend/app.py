# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
from config_loader import load_config  # Assuming load_config is the function to get config data

app = Flask(__name__)
CORS(app)

# Sample data to simulate graph and configuration
graph_data = {
    "nodes": [
       {"name": "McDonald's 600 N Clark St","address": "600 N Clark St, Chicago, IL 60610","location": [41.89351753088768, -87.63165443077865], "logo": "McDonalds_Logo.png", "type":"RST"},
       {"name": "McDonald's 203 N La Salle Dr","address": "203 N La Salle Dr, Chicago, IL 60601","location": [41.88652105508355, -87.63169734622184], "logo": "McDonalds_Logo.png", "type":"RST"},
       {"name": "McDonald's 225 S Canal St","address": "225 S Canal St, Chicago, IL 60606","location": [41.87930014433387, -87.6387783777535], "logo": "McDonalds_Logo.png", "type":"RST"},
       {"name": "McDonald's 1380 W Lake St","address": "1380 W Lake St, Chicago, IL 60607","location": [41.886553004202675, -87.66225307016444], "logo": "McDonalds_Logo.png", "type":"RST"},
       {"name": "Accenture Tower-BigBoss","address": "500 W Madison St, Chicago, IL 60661","location": [41.88247985156896, -87.64034474523874], "logo": "Accenture_Logo.png", "type":"ACCN"},
       {"name": "MHQ-SuperBigBoss","address": "110 N Carpenter St, Chicago, IL 60607","location": [41.883788103250254, -87.65361242883566], "logo": "MHQ_Logo.png", "type":"MHQ"}
    ],
    "edges": [
        {"source": "McDonald's 600 N Clark St", "target": "Accenture Tower-BigBoss"},
        {"source": "McDonald's 600 N Clark St", "target": "MHQ-SuperBigBoss"},
        {"source": "McDonald's 203 N La Salle Dr", "target": "Accenture Tower-BigBoss"},
        {"source": "McDonald's 203 N La Salle Dr", "target": "MHQ-SuperBigBoss"},
        {"source": "McDonald's 225 S Canal St", "target": "Accenture Tower-BigBoss"},
        {"source": "McDonald's 225 S Canal St", "target": "MHQ-SuperBigBoss"},
        {"source": "McDonald's 1380 W Lake St", "target": "Accenture Tower-BigBoss"},
        {"source": "McDonald's 1380 W Lake St", "target": "MHQ-SuperBigBoss"}
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

