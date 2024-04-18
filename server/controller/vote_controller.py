from flask import Blueprint, request
from server.service.vote_service import VoteService

from server.util.auth import auth_required
from ..util.response_builder import ResponseBuilder, response_exception_handler

vote_v1 = Blueprint("api/v1/votes", __name__, url_prefix="/api/v1")

vote_service = VoteService()


@vote_v1.route("/votes", methods=["GET"])
@response_exception_handler
@auth_required
def is_person_already_voted():
    params = request.args

    if not "userId" in params or not "postId" in params or not "type" in params:
        return ResponseBuilder.failure("Insufficient data to check the vote.")

    return ResponseBuilder.ok(
        vote_service.is_post_voted(
            params.get("userId"), params.get("postId"), params.get("type")
        )
    )


@vote_v1.route("/getallvotes", methods=["GET"])
@response_exception_handler
def get_all_votes():
    all_votes = vote_service.get_all_votes()
    return ResponseBuilder.ok(all_votes)
