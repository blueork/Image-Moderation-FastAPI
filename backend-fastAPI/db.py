from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["auth_db"]

tokens_col = db["tokens"]
usages_col = db["usages"]