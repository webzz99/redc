from flask import Blueprint, request
from server.service.post_service import PostService
from ..util.auth import auth_required
from ..util.response_builder import ResponseBuilder, response_exception_handler

from ..service.user_service import UserService

post_v1 = Blueprint("api/v1/posts", __name__, url_prefix="/api/v1")

post_service = PostService()


@post_v1.route("/posts", methods=["POST"])
@response_exception_handler
@auth_required
def create_post():
    body = request.get_json()
    return ResponseBuilder.ok(post_service.create_post(body))


@post_v1.route("/posts", methods=["GET"])
@response_exception_handler
# i just disable to see all the post
# @auth_required
def get_post():
    params = request.args

    if "userId" in params:
        return ResponseBuilder.ok(post_service.get_user_posts(params.get("userId")))
    elif "postId" in params:
        return ResponseBuilder.ok(post_service.get_post(params.get("postId")))

    return ResponseBuilder.ok(post_service.get_all_post(params))


# @post_v1.route("/posts/<post_id>", methods=["GET"])
# @response_exception_handler
# # get another get request with post
# # @auth_required
# def get_post_by_id(post_id):
#     return ResponseBuilder.ok(post_service.get_post(post_id))


@post_v1.route("/posts/<post_id>", methods=["PATCH"])
@response_exception_handler
# @auth_required
def edit_post(post_id):
    body = request.get_json()
    return ResponseBuilder.ok(post_service.edit_post(post_id, body))


@post_v1.route("/posts/<post_id>", methods=["DELETE"])
@response_exception_handler
@auth_required
def delete_post(post_id):
    return ResponseBuilder.ok(post_service.delete_post(post_id))


@post_v1.route("/posts/<post_id>/upvote", methods=["POST"])
@response_exception_handler
@auth_required
def upvote_post(post_id):
    return ResponseBuilder.ok(post_service.upvote_post(post_id))


@post_v1.route("/posts/<post_id>/downvote", methods=["POST"])
@response_exception_handler
@auth_required
def downvote_post(post_id):
    return ResponseBuilder.ok(post_service.downvote_post(post_id))


@post_v1.route("/posts/<post_id>/remove-upvote", methods=["DELETE"])
@response_exception_handler
@auth_required
def remove_upvote_post(post_id):
    return ResponseBuilder.ok(post_service.remove_upvote_post(post_id))


@post_v1.route("/posts/<post_id>/remove-downvote", methods=["DELETE"])
@response_exception_handler
@auth_required
def remove_downvote_post(post_id):
    return ResponseBuilder.ok(post_service.remove_downvote_post(post_id))
