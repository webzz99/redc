from functools import wraps
from http.client import HTTPException
import json


class ResponseFailureException(Exception):
    pass


class ResponseBuilder(object):

    # I use @classmethod to be able use those methods without instantiating the response builder class.
    @classmethod
    def build(cls, status_code: str, message: str, resp: object):
        if resp is not None:
            resp = json.dumps(resp, cls=json.JSONEncoder)
        return {"code": status_code, "message": message, "payload": resp}

    @classmethod
    def ok(cls, resp: object):
        return cls.build("OK", "OK", resp)
    
    @classmethod
    def ok_already_serialized(cls, resp: object):
        return {"code": "OK", "message": "OK", "payload": resp}

    @classmethod
    def failure(cls, message):
        return cls.build("FAILED", message, None)


def response_exception_handler(func):
    """
    a decorator which provides standard error handling around the route/controller
    """

    @wraps(func)
    def handle_func(**kwargs):
        try:
            return func(**kwargs)
        except (HTTPException, ResponseFailureException) as e:
            raise e
        except Exception as e:
            return ResponseBuilder.failure(str(e))

    return handle_func
