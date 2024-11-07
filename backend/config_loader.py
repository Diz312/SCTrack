# backend/config_loader.py
import yaml
import os
import logging
from pprint import pprint
from dotenv import load_dotenv

# Set up logging configuration
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

def load_config():
    config_path = os.path.join(os.path.dirname(__file__), "config.yaml")
    logging.debug(f"Config path: {config_path}")
    
    with open(config_path, "r") as file:
        #config = yaml.safe_load(file)
        config = {}

        # Add MAPBOX_ACCESS_TOKEN to the config
        load_dotenv()
        mapbox_access_token = os.getenv("MAPBOX_ACCESS_TOKEN")
        config["MAPBOX_ACCESS_TOKEN"] = mapbox_access_token
       
    logging.debug(f"Config content: {config}")
    return config

if __name__ == "__main__":
    config = load_config()
    

