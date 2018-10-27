from flask import Blueprint, jsonify

blueprint = Blueprint("api", __name__, url_prefix='/api')


@blueprint.route("/images")
def images():
    return jsonify([])
