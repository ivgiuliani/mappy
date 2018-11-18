import os

from mappy import config

from . import process
from .album import Album


def all_albums():
    return [
        Album(aid) for aid in os.listdir(config.Images.ALBUMS_ROOT)
        if os.path.isdir(os.path.join(config.Images.ALBUMS_ROOT, aid))
    ]
