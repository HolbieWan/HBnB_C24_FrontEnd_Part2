from flask import current_app, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import create_access_token, jwt_required # type: ignore



api = Namespace('auth', description='Authentication operations')

login_model = api.model('Login', {
    'email': fields.String(required=True, description='User email'),
    'password': fields.String(required=True, description='User password')
})

@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        """Authenticate user and return a JWT token"""
        facade = current_app.extensions['FACADE']

        credentials = api.payload

        if 'email' not in credentials:
            return {'error': 'Missing email'}, 400
        if 'password' not in credentials:
            return {'error': 'Missing password'}, 400
        
        email = credentials['email']
       
        user = facade.get_user_by_email(email)
        
        if not user or not user.verify_password(credentials['password']):
            return {'error': 'Invalid credentials'}, 401

        access_token = create_access_token(identity={'id': str(user.id), 'is_admin': user.is_admin})
        
        return {
            'access_token': access_token,
            'user_id': str(user.id)
        }, 200
    
@api.route('/logout')
class Logout(Resource):
    @jwt_required()
    def post(self):
        response = jsonify({"msg": "Logout successful"})
        response.set_cookie('jwt_token', '', expires=0)
        response.set_cookie('user_id', '', expires=0)
        return response
