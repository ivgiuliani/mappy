import os
import logging


CURR_PATH = os.path.dirname(os.path.realpath(__file__))
ROOT = os.path.join(CURR_PATH, "..")


class Images(object):
    ALBUMS_ROOT = os.getenv("ALBUMS_ROOT", os.path.join(ROOT, "albums"))


class Web(object):
    TEMPLATE_ROOT = os.getenv("TEMPLATE_ROOT", os.path.join(ROOT, "templates/"))
    STATIC_FILES_PATH = os.path.join(ROOT, "static")


class Log(object):
    LOGGER = "MAPPY"
    LOG_LEVEL = logging.INFO
