import os

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

from .config import config_by_name

app = Flask(__name__)
CORS(app)

config_name = 'dev'

app.config.from_object(config_by_name[config_name])

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

from backend.server.auth.views import auth_blueprint
app.register_blueprint(auth_blueprint)

from backend.server.yxro.views import yxro_blueprint
app.register_blueprint(yxro_blueprint)
