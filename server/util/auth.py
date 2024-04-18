from functools import wraps
import logging
from flask import request, abort
import jwt

from server.service.user_service import SECRET_KEY


LOGGER = logging.getLogger(__name__)


class JWTVerifier:
    def verify_and_extract_user_id(self, auth_header):
        try:
            if str(auth_header).startswith("Bearer "):
                token = auth_header[7:]

            payload = jwt.decode(token, key=SECRET_KEY, algorithms=["HS256"])

            user_id = payload.get("user_id", "")
            return user_id
        except Exception as e:
            LOGGER.error("Failed to verify authentication token")
            raise e


jwt_verifier = JWTVerifier()


def auth_required(func):
    """
    This is a decorator that extracts user-agent from each request around a route and store it as env value
    """

    @wraps(func)
    def handle_func(**kwargs):

        try:
            auth_header = request.headers.get("Authorization", None)
            user_id = jwt_verifier.verify_and_extract_user_id(auth_header)
            request.environ["user_id"] = user_id
        except Exception as e:
            abort(401)

        return func(**kwargs)

    return handle_func
