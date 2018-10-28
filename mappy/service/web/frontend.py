from flask import Blueprint, abort, send_from_directory, make_response

from mappy.service import albums

blueprint = Blueprint("frontend", __name__, url_prefix="/")


@blueprint.route("/serve/thumb/album/<aid>/image/<iid>")
def serve_thumb(aid, iid):
    if not albums.Album.exists(aid):
        abort(404)

    album = albums.Album.load(aid)

    thumbnail = album.image_preview(iid)
    if not thumbnail:
        abort(404)

    response = make_response(thumbnail)
    response.headers.set("Content-Type", "image/jpeg")

    return response


@blueprint.route("/serve/full/album/<aid>/image/<iid>")
def serve(aid, iid):
    if not albums.Album.exists(aid):
        abort(404)

    album = albums.Album.load(aid)
    return send_from_directory(album.path, iid)
