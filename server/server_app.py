
import logging
from flask import Flask
from .controller.user_controller import user_v1 
from .controller.post_controller import post_v1
from .controller.comment_controller import comment_v1
from .controller.vote_controller import vote_v1

LOGGER = logging.getLogger(__name__)
def create_app():
    
    app = Flask(__name__)

    app.register_blueprint(user_v1)
    app.register_blueprint(post_v1)
    app.register_blueprint(comment_v1)
    app.register_blueprint(vote_v1)
    
    LOGGER.info("Creating a flask server.")
    return app
    