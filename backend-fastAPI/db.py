from pymongo import MongoClient

import os
from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()

load_dotenv(dotenv_path)
MONGODB_CONN_URL = os.getenv("MONGODB_CONN_URL")

client = MongoClient(f"{MONGODB_CONN_URL}")
db = client["auth_db"]

tokens_col = db["tokens"]
usages_col = db["usages"]