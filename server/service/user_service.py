import datetime
from bson import ObjectId
from flask import request
import jwt
from server.util.custom_logging import get_logger
import bcrypt

from server.util.mongo import USER_COLLECTION, stringify_id

LOGGER = get_logger(__name__)

user_db = USER_COLLECTION
SECRET_KEY = "MOVE_IT_TO_ENV_VARIABLE"
SALT = b"$2b$12$1oFnc5wwy2.xftLHphRveO"


class UserService(object):

    def register_user(self, body: dict):

        if "username" not in body:
            raise Exception("Username cannot be null or empty")

        if "password" not in body:
            raise Exception("Username cannot be null or empty")

        if self.get_user(body.get("username")):
            username = body.get("username")
            raise Exception(f"User already exists with this username {username}")

        created_user = {
            "createdAt": datetime.datetime.utcnow().isoformat(),
            "name": body.get("name", ""),
            "username": body.get("username"),
            "password": self.hash_password(body.get("password")),
        }

        user = user_db.insert_one(created_user)
        if user:
            return str(user.inserted_id)
        raise Exception("Error registering an user")

    def get_user(self, username: str):
        return (
            stringify_id(user)
            if (user := user_db.find_one({"username": username}))
            else None
        )

    def login_user(self, body: dict):
        if "username" not in body:
            raise Exception("Username cannot be null or empty")

        if "password" not in body:
            raise Exception("Username cannot be null or empty")

        existing_user = self.get_user(body.get("username"))

        if not existing_user:
            raise Exception(
                f"Cannot find the user with this username: " + body.get("username")
            )

        login_password = self.hash_password(body.get("password"))

        if existing_user["password"] == login_password:
            payload = {
                "user_id": existing_user["_id"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=100),
            }
            return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    def get_user_profile(self, user_id: str):
        return stringify_id(
            user_db.find_one({"_id": ObjectId(user_id)}, {"password": 0})
        )

    def hash_password(self, password: str):
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), SALT)
        return hashed_password.decode("utf-8")

    def get_all_users(self):
        # Implementation to fetch all users from the database
        # Example implementation assuming user_db is a MongoDB collection
        users = user_db.find({}, {"_id": 1, "username": 1})
        # Convert ObjectId to string for JSON serialization
        return [
            {"_id": str(user["_id"]), "username": user["username"]} for user in users
        ]
