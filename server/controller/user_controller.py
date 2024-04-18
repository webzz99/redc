from flask import Blueprint, request

from server.util.auth import auth_required
from ..util.response_builder import ResponseBuilder, response_exception_handler

from ..service.user_service import UserService

user_v1 = Blueprint("api/v1/users", __name__, url_prefix="/api/v1")

user_service = UserService()


@user_v1.route("/users", methods=["GET"])
@response_exception_handler
# @auth_required
def get_all_users_route():
    # Call the get_all_users() method of user_service without passing any arguments
    return ResponseBuilder.ok(user_service.get_all_users())


@user_v1.route("/users/<user_id>/profile", methods=["GET"])
@response_exception_handler
@auth_required
def get_user_profile(user_id):
    return ResponseBuilder.ok(user_service.get_user_profile(user_id))


@user_v1.route("/users", methods=["POST"])
@response_exception_handler
def register_user():
    body = request.get_json()
    return ResponseBuilder.ok_already_serialized(user_service.register_user(body))


@user_v1.route("/users/login", methods=["POST"])
@response_exception_handler
def login_user():
    body = request.get_json()
    return ResponseBuilder.ok_already_serialized(user_service.login_user(body))
