from flask import Flask

from mappy import config
from . import api, frontend


def blueprints():
    return [
        frontend.blueprint,
        api.blueprint,
    ]


def create_app(app_name=__name__):
    app = Flask(app_name,
                template_folder=config.Web.TEMPLATE_ROOT,
                static_folder=config.Web.STATIC_FILES_PATH)

    for blueprint in blueprints():
        app.register_blueprint(blueprint)

    return app
