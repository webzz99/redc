import datetime
from bson import ObjectId
from flask import request
from server.service.post_service import PostService
from server.util.custom_logging import get_logger
from server.util.mongo import COMMENT_COLLECTION, stringify_id, stringify_ids

LOGGER = get_logger(__name__)

comment_db = COMMENT_COLLECTION
post_service = PostService()


class CommentService(object):

    def create_comment(self, post_id: str, body: dict):

        if "content" not in body:
            raise Exception("Content cannot be null or empty")

        if "userId" not in body:
            raise Exception("UserId cannot be null or empty")

        post_service.get_post(post_id)
        created_comment = {
            "createdAt": datetime.datetime.utcnow().isoformat(),
            "createdBy": body.get("userId"),
            "content": body.get("content"),
            "postId": post_id,
        }

        inserted_id = comment_db.insert_one(created_comment).inserted_id

        if inserted_id:
            return stringify_id(created_comment)
        raise Exception("Error creating a comment")

    def get_post_comments(self, post_id: str):
        return stringify_ids(
            list(comment_db.find({"postId": post_id}).sort("createdAt", -1))
        )

    def get_user_comments(self, user_id):
        return stringify_ids(list(comment_db.find({"createdBy": user_id})))

    def edit_comment(self, comment_id: str, body: dict):
        if "content" not in body:
            raise Exception("content cannot be null or empty to update.")

        updated = comment_db.update_one(
            {"_id": ObjectId(comment_id)}, {"$set": {"content": body.get("content")}}
        )
        if updated.acknowledged:
            return stringify_id(self.get_comment(comment_id))
        raise Exception("Error updating the post")

    def delete_comment(self, comment_id: str):
        comment_db.delete_one({"_id": ObjectId(comment_id)})
        return f"Delete the comment with this id: {comment_id}"

    def get_comment(self, comment_id):
        existing = comment_db.find_one(ObjectId(comment_id))

        if not existing:
            raise Exception(f"Cannot find the comment with this id: {post_id}")

        return stringify_id(existing)

    def get_all_comments(self):
        comments = list(comment_db.find({}))

        return stringify_ids(comments)
