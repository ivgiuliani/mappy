from flask import Blueprint, jsonify

from mappy.service import albums

blueprint = Blueprint("api", __name__, url_prefix='/api')


@blueprint.route("/albums")
def images():
    return jsonify([
        {"id": album.aid, "name": album.name}
        for album in albums.all_albums()
    ])
