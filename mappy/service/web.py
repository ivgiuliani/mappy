from flask import Flask

from .. import config


def create_app(app_name=__name__):
    app = Flask(app_name,
                template_folder=config.Web.TEMPLATE_ROOT,
                static_folder=config.Web.STATIC_FILES_PATH)

    return app
