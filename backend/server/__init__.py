import os

basedir = os.path.abspath(os.path.dirname(__file__))

from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'sqlite.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'some-secret-string'
app.config['DEBUG'] = True

db = SQLAlchemy(app)

@app.before_first_request
def create_tables():
    db.create_all()

app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

@jwt.user_claims_loader
def add_claims_to_access_token(user):
    return {'role': user.role}

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.username

from server.auth import resources
api.add_resource(resources.UserRegistration, '/register')
api.add_resource(resources.UserLogin, '/login')
api.add_resource(resources.AllUsers, '/users')

from server.yxro.views import yxro_blueprint
app.register_blueprint(yxro_blueprint)

import server.views
