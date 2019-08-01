from flask import jsonify, make_response
from flask_restful import Resource, reqparse
from .models import UserModel
from flask_jwt_extended import (
    jwt_required, get_jwt_identity, create_access_token,
)

parser = reqparse.RequestParser()
parser.add_argument('username', help = 'This field cannot be blank', required = True)
parser.add_argument('password', help = 'This field cannot be blank', required = True)

class UserRegistration(Resource):
    def get(self):
        data = parser.parse_args()

        if UserModel.find_by_username(data['username']):
            resp = jsonify({'register': False, 'message': 'AUTH_USER_EXISTS'})
            return make_response(resp, 200)

        new_user = UserModel(
            username = data['username'],
            password = UserModel.generate_hash(data['password']),
            role     = 'admin'
        )

        try:
            new_user.save_to_db()
            access_token = create_access_token(identity = new_user)
            resp = jsonify({'register': True, 'message': 'AUTH_REGISTER_OK', 'token': access_token})
            return make_response(resp, 201)
        except:
            resp = jsonify({'register': False, 'message': 'AUTH_ERROR'})
            return make_response(resp, 200)


class UserLogin(Resource):
    def post(self):
        data = parser.parse_args()
        current_user = UserModel.find_by_username(data['username'])

        if not current_user:
            resp = jsonify({'login': False, 'message': 'AUTH_UNKNOWN_USER'})
            return make_response(resp, 200)

        if UserModel.verify_hash(data['password'], current_user.password):
            access_token = create_access_token(identity = current_user)
            resp = jsonify({'login': True, 'message': 'AUTH_LOGIN_OK', 'token': access_token})
            return make_response(resp, 200)
        else:
            resp = jsonify({'login': False, 'message': 'AUTH_WRONG_CREDENTIALS'})
            return make_response(resp, 200)

class AllUsers(Resource):
    @jwt_required
    def get(self):
        return UserModel.return_all()

    @jwt_required
    def delete(self):
        return UserModel.delete_all()
