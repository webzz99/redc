from bson import ObjectId
from pymongo import MongoClient
import os  # Import the os module to access environment variables

# Use an environment variable for the MongoDB URI, or default to a local MongoDB instance
# MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://127.0.0.1:27017/redc')
# MONGO_CLIENT = MongoClient(MONGO_URI)
MONGO_CLIENT = MongoClient('mongodb+srv://volkan1990:volkan1990@redc.7bbrtch.mongodb.net/?retryWrites=true&w=majority&appName=REDC')
REDDITC_DB = MONGO_CLIENT["redditc_db"]


USER_COLLECTION = REDDITC_DB.user
POST_COLLECTION = REDDITC_DB.post
COMMENT_COLLECTION = REDDITC_DB.comment
TEST_COLLECTION = REDDITC_DB.test
VOTE_COLLECTION = REDDITC_DB.vote

def stringify_ids(items: list):
    return [stringify_id(item) for item in items]

def stringify_id(item):
    return {**item, "_id": str(item["_id"])}

