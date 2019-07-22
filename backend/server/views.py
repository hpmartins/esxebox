from flask import jsonify, make_response
from flask_jwt_extended import (
    jwt_required, get_jwt_identity, get_jwt_claims
)

from server import app

@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    ret = {
        'current_identity': get_jwt_identity(),  # test
        'current_roles': get_jwt_claims()['role']  # ['foo', 'bar']
    }
    return make_response(jsonify(ret), 200)

@app.route('/')
def index():
    return make_response(jsonify({'message': 'Hello, World!'}), 200)
