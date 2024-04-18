from flask import Blueprint, request

from server.service.comment_service import CommentService
from server.util.auth import auth_required
from ..util.response_builder import ResponseBuilder, response_exception_handler

comment_v1 = Blueprint("api/v1/comments", __name__, url_prefix="/api/v1")

comment_service = CommentService()


@comment_v1.route("/comments", methods=["GET"])
@response_exception_handler
# @auth_required
def get_comments():
    params = request.args

    if "userId" in params:
        return ResponseBuilder.ok(
            comment_service.get_user_comments(params.get("userId"))
        )
    elif "postId" in params:
        return ResponseBuilder.ok(
            comment_service.get_post_comments(params.get("postId"))
        )

    return ResponseBuilder.failure("Cannot find the user id or post id params")


@comment_v1.route("/getallcomments", methods=["GET"])
@response_exception_handler
def get_all_comments():
    comment_service = CommentService()  # Create an instance of CommentService
    all_comments = comment_service.get_all_comments()  # Call get_all_comments method
    return ResponseBuilder.ok(all_comments)


@comment_v1.route("/comments/<post_id>", methods=["POST"])
@response_exception_handler
@auth_required
def add_comment(post_id):
    body = request.get_json()
    return ResponseBuilder.ok(comment_service.create_comment(post_id, body))


@comment_v1.route("/comments/<comment_id>", methods=["PATCH"])
@response_exception_handler
@auth_required
def edit_comment(comment_id):
    body = request.get_json()
    return ResponseBuilder.ok(comment_service.edit_comment(comment_id, body))


@comment_v1.route("/comments/<comment_id>", methods=["DELETE"])
@response_exception_handler
@auth_required
def delete_comment(comment_id):
    return ResponseBuilder.ok(comment_service.delete_comment(comment_id))
