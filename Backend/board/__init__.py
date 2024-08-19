from flask import Blueprint

bp = Blueprint('board', __name__)

from board import routes
