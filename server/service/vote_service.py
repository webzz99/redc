import datetime
from server.util.mongo import VOTE_COLLECTION

from server.util.custom_logging import get_logger

LOGGER = get_logger(__name__)

vote_db = VOTE_COLLECTION


class VoteService(object):

    def is_post_voted(self, user_id, post_id, type: str):

        existing = vote_db.find_one(
            {"createdBy": user_id, "postId": post_id, "type": str(type).lower()}
        )

        if existing:
            return True
        return False

    def delete_vote(self, user_id, post_id, type: str):
        vote_db.delete_one(
            {"createdBy": user_id, "postId": post_id, "type": str(type).lower()}
        )
        LOGGER.info(
            f"Delete the vote of userId {user_id} and postId: {post_id} of type: {type}"
        )

    def insert_vote(self, user_id, post_id, type: str):
        vote_to_insert = {
            "createdBy": user_id,
            "postId": post_id,
            "createdAt": datetime.datetime.utcnow().isoformat(),
            "type": type,
        }

        vote_db.insert_one(vote_to_insert)

        LOGGER.info(f"Record the vote for {vote_to_insert}")

        return vote_to_insert

    def get_all_votes(self):
        cursor = vote_db.find({})
        votes = [self.convert_to_json(vote) for vote in cursor]
        return votes

    def convert_to_json(self, document):
        # Convert ObjectId to string if necessary
        if "_id" in document:
            document["_id"] = str(document["_id"])
        return document
