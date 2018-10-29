from flask import Blueprint, abort, jsonify

from mappy.service import albums

blueprint = Blueprint("api", __name__, url_prefix='/api')


@blueprint.route("/albums")
def images():
    return jsonify([
        {"id": album.aid, "name": album.name}
        for album in albums.all_albums()
    ])


@blueprint.route("/album/<aid>")
def get_album(aid):
    if not albums.Album.exists(aid):
        abort(404)

    album = albums.Album.load(aid)
    return jsonify({
        "aid": album.aid,
        "name": album.name,
        "images": album.images()[:5],
        "videos": album.videos(),
    })


@blueprint.route("/album/<aid>/image/<iid>")
def get_image(aid, iid):
    if not albums.Album.exists(aid):
        abort(404)

    album = albums.Album.load(aid)
    image = album.image(iid)
    if not image:
        abort(404)
    return jsonify(image)
