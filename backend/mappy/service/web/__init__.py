from flask import Flask
from flask_cors import CORS

from . import api, frontend


def blueprints():
    return [
        frontend.blueprint,
        api.blueprint,
    ]


def create_app(app_name=__name__):
    app = Flask(app_name)
    CORS(app)

    for blueprint in blueprints():
        app.register_blueprint(blueprint)

    return app
