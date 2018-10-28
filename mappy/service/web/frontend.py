import os

from flask import Blueprint, abort, send_from_directory

from mappy.service import albums

blueprint = Blueprint("frontend", __name__, url_prefix="/")


@blueprint.route("/serve/thumb/album/<aid>/image/<iid>")
def serve_thumb(aid, iid):
    if not albums.Album.exists(aid):
        abort(404)

    album = albums.Album.load(aid)
    # TODO: actually send a thumbnail
    return send_from_directory(album.path, iid)


@blueprint.route("/serve/full/album/<aid>/image/<iid>")
def serve(aid, iid):
    if not albums.Album.exists(aid):
        abort(404)

    album = albums.Album.load(aid)
    return send_from_directory(album.path, iid)
