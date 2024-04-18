

import logging
import os
import sys

sh = logging.StreamHandler(sys.stdout)
logging.basicConfig(handlers=[sh], level=os.environ.get("LOG_LEVEL", "INFO"))

def get_logger(name:str):
    return logging.getLogger(name)