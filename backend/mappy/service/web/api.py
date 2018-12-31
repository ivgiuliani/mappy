from mappy.service import albums
from mappy.service import auth

from flask import Blueprint, abort, jsonify

from functools import wraps

blueprint = Blueprint("api", __name__, url_prefix='/api')


def requires_auth(view_fnc):
    @wraps(view_fnc)
    def wrapper(*args, **kwargs):
        from flask import request
        if auth.tokens.is_valid_auth(request.headers.get("Authorization")):
            return view_fnc(*args, **kwargs)
        else:
            abort(401)
    return wrapper


@blueprint.route("/albums")
@requires_auth
def images():
    return jsonify([
        {"id": album.aid, "name": album.name}
        for album in albums.all_albums()
    ])


@blueprint.route("/album/<aid>")
@requires_auth
def get_album(aid):
    if not albums.Album.exists(aid):
        abort(404)

    album = albums.Album.load(aid)
    return jsonify({
        "aid": album.aid,
        "name": album.name,
        "images": album.index(),
    })


@blueprint.route("/album/<aid>/image/<iid>")
@requires_auth
def get_image(aid, iid):
    if not albums.Album.exists(aid):
        abort(404)

    album = albums.Album.load(aid)
    image = album.image(iid)
    if not image:
        abort(404)
    return jsonify(image)


@blueprint.route("/album/<aid>/index")
@requires_auth
def album_index(aid):
    if not albums.Album.exists(aid):
        abort(404)

    album = albums.Album.load(aid)
    album.index(reindex=True)

    return "", 200
