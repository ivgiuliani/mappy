import os
import logging


CURR_PATH = os.path.dirname(os.path.realpath(__file__))
ROOT = os.path.join(CURR_PATH, "..")


class Images(object):
    ALBUMS_ROOT = os.getenv("ALBUMS_ROOT", os.path.join(ROOT, "..", "albums"))


class Log(object):
    _LOG_LEVELS = {
        "debug": logging.DEBUG,
        "warn": logging.WARN,
        "info": logging.INFO,
    }

    LOGGER = "MAPPY"
    LOG_LEVEL = _LOG_LEVELS.get(os.getenv("MAPPY_LOG_LEVEL", "info"))
