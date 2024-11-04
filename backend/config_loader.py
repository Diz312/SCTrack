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

        # Add GOOGLE_MAPS_API_KEY to the config
        load_dotenv()
        google_maps_api_key = os.getenv("GOOGLE_MAPS_API_KEY")
       
        if google_maps_api_key:
            config["GOOGLE_MAPS_API_KEY"] = google_maps_api_key
        else:
            logging.warning("GOOGLE_MAPS_API_KEY not found in .env file or .env was not loaded properly.")
            
    logging.debug(f"Config content: {config}")
    return config

if __name__ == "__main__":
    config = load_config()
    

