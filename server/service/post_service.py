import datetime
import time

from bson import ObjectId
from flask import request
from server.service.vote_service import VoteService
from server.util.custom_logging import get_logger
from server.util.mongo import (
    POST_COLLECTION,
    VOTE_COLLECTION,
    stringify_id,
    stringify_ids,
)

LOGGER = get_logger(__name__)

post_db = POST_COLLECTION
vote_service = VoteService()


class PostService(object):

    def create_post(self, body: dict):

        if "userId" not in body:
            raise Exception("User id cannot be null or empty.")

        if "content" not in body:
            raise Exception("Content cannot be null or empty")

        created_post = {
            "createdAt": datetime.datetime.utcnow().isoformat(),
            "createdBy": body.get("userId"),
            "content": body.get("content"),
        }

        inserted_id = post_db.insert_one(created_post).inserted_id

        if inserted_id:
            return stringify_id(created_post)
        raise Exception("Error creating a post")

    def get_post(self, post_id):
        existing = post_db.find_one(ObjectId(post_id))

        if not existing:
            raise Exception(f"Cannot find the post with this id: {post_id}")

        return stringify_id(existing)

    def get_user_posts(self, user_id):
        return stringify_ids(list(post_db.find({"createdBy": user_id})))

    def get_all_post(self, pager):
        return stringify_ids(list(post_db.find({}).sort({"createdAt": -1})))

    def edit_post(self, post_id, body):
        if "content" not in body:
            raise Exception("content cannot be null or empty to update.")
        updated = post_db.update_one(
            {"_id": ObjectId(post_id)}, {"$set": {"content": body.get("content")}}
        )
        if updated.acknowledged:
            return stringify_id(self.get_post(post_id))
        raise Exception("Error updating the post")

    def delete_post(self, post_id):
        post_db.delete_one({"_id": ObjectId(post_id)})
        return f"Delete the post with this id: {post_id}"

    def upvote_post(self, post_id):
        existing_post = self.get_post(post_id)

        user_id = request.environ["user_id"]

        downvote_existed = vote_service.is_post_voted(user_id, post_id, "down")
        if downvote_existed:
            raise Exception("Down vote already existed. Cannot do upvote.")

        number_of_up_vote = existing_post.get("numberOfUpVote", 0)
        updated = post_db.update_one(
            {"_id": ObjectId(post_id)},
            {"$set": {"numberOfUpVote": number_of_up_vote + 1}},
        )
        if updated.acknowledged:
            vote_service.insert_vote(user_id, post_id, "up")
            return stringify_id(self.get_post(post_id))
        raise Exception("Error updating the post")

    def downvote_post(self, post_id):
        existing_post = self.get_post(post_id)
        user_id = request.environ["user_id"]

        upvote_existed = vote_service.is_post_voted(user_id, post_id, "up")

        if upvote_existed:
            raise Exception("Up vote already existed. Cannot do downvote.")

        number_of_down_vote = existing_post.get("numberOfDownVote", 0)
        updated = post_db.update_one(
            {"_id": ObjectId(post_id)},
            {"$set": {"numberOfDownVote": number_of_down_vote + 1}},
        )
        if updated.acknowledged:
            vote_service.insert_vote(user_id, post_id, "down")
            return stringify_id(self.get_post(post_id))
        raise Exception("Error updating the post")

    def remove_upvote_post(self, post_id):
        existing_post = self.get_post(post_id)
        user_id = request.environ["user_id"]

        number_of_up_vote = existing_post.get("numberOfUpVote", 0)
        if number_of_up_vote != 0:
            updated = post_db.update_one(
                {"_id": ObjectId(post_id)},
                {"$set": {"numberOfUpVote": number_of_up_vote - 1}},
            )
            if updated.acknowledged:
                vote_service.delete_vote(user_id, post_id, "up")
                return stringify_id(self.get_post(post_id))
            raise Exception("Error updating the post")

        return stringify_id(self.get_post(post_id))

    def remove_downvote_post(self, post_id):
        user_id = request.environ["user_id"]
        existing_post = self.get_post(post_id)
        number_of_down_vote = existing_post.get("numberOfDownVote", 0)

        if number_of_down_vote != 0:
            updated = post_db.update_one(
                {"_id": ObjectId(post_id)},
                {"$set": {"numberOfDownVote": number_of_down_vote - 1}},
            )
            if updated.acknowledged:
                vote_service.delete_vote(user_id, post_id, "down")
                return stringify_id(self.get_post(post_id))
            raise Exception("Error updating the post")

        return stringify_id(self.get_post(post_id))
