from pymongo import MongoClient

import os
from dotenv import find_dotenv, load_dotenv

# dotenv_path = find_dotenv()

# load_dotenv(dotenv_path)
# MONGODB_CONN_URL = os.getenv("MONGODB_CONN_URL")

# client = MongoClient(f"{MONGODB_CONN_URL}")

mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(mongo_uri)

db = client["auth_db"]

tokens_col = db["tokens"]
usages_col = db["usages"]