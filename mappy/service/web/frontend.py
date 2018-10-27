from flask import Blueprint, render_template

blueprint = Blueprint("frontend", __name__, url_prefix="/")


@blueprint.route("/")
def root():
    return render_template("index.html")
