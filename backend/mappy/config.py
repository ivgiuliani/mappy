import os
import logging


CURR_PATH = os.path.dirname(os.path.realpath(__file__))
ROOT = os.path.join(CURR_PATH, "..")


class Images(object):
    ALBUMS_ROOT = os.getenv("ALBUMS_ROOT", os.path.join(ROOT, "..", "albums"))


class Log(object):
    LOGGER = "MAPPY"
    LOG_LEVEL = logging.INFO
