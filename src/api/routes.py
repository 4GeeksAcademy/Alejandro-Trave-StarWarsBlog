"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Posts, Characters, Planets, Species


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200

@api.route("/login", methods=["POST"])
def login():
    response_body={}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email==email, Users.password == password, Users.is_active == True)).scalar()
    if user:
        access_token = create_access_token(identity={'user_id': user.id})
        response_body['message'] = 'User Logeado'
        response_body['access_token'] = access_token
        return response_body, 200
    response_body['message'] = 'Bad username or password'
    return response_body, 401



# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    response_body['message'] = f'User logueado: {current_user}'
    return response_body, 200


@api.route('/users', methods=['GET', 'POST'])
def handle_user():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Usuarios'
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = 'Haga login para modificar usuarios'
        return response_body, 200

@api.route('/posts', methods=['GET', 'POST'])
@jwt_required()
def handle_post():
    response_body = {}
    current_user = get_jwt_identity()
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Posts'
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = 'Haga login para añadir un post'
        return response_body, 200

@api.route('/characters', methods=['GET', 'POST'])
def handle_character():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Characters)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Personajes'
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = 'Haga login para añadir un personaje'
        return response_body, 200


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_users(user_id):
    response_body = {}
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            response_body['results'] = user.serialize()
            response_body['message'] = 'Usuario encontrado'
            return response_body, 200
        response_body['message'] = 'Usario inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        # TODO: Validación de datos recibidos 
        print(data)
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            user.email = data['email']
            user.is_active = data['is_active']
            user.last_name = data['last_name']
            user.first_name = data['first_name']
            db.session.commit()
            response_body['message'] = 'Datos del usuario actualizados'
            response_body['results'] = user.serialize()
            return response_body, 200
        response_body['message'] = 'Usario inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            # db.session.delete(user)
            user.is_active = False
            db.session.commit()
            response_body['message'] = 'Usuario eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Usuario inexistente'
        response_body['results'] = {}
        return response_body, 200

@api.route('/posts/<int:post_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_posts(posts_id):
    response_body = {}
    if request.method == 'GET':
        post = db.session.execute(db.select(Posts).where(Posts.id == post_id)).scalar()
        if post:
            response_body['results'] = post.serialize()
            response_body['message'] = 'Post encontrado'
            return response_body, 200
        response_body['message'] = 'Post inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        # TODO: Validación de datos recibidos 
        print(data)
        post = db.session.execute(db.select(Posts).where(Posts.id == post_id)).scalar()
        if post:
            post.description = data['description']
            post.body = data['body']
            post.image_url = data['image_url']
            db.session.commit()
            response_body['message'] = 'Post editado'
            response_body['results'] = post.serialize()
            return response_body, 200
        response_body['message'] = 'Post inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        post = db.session.execute(db.select(Posts).where(Posts.id == posts_id)).scalar()
        if post:
            # db.session.delete(post)
            post.is_active = False
            db.session.commit()
            response_body['message'] = 'Post eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Post inexistente'
        response_body['results'] = {}
        return response_body, 200

@api.route('/characters/<int:character_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_characters(character_id):
    response_body = {}
    if request.method == 'GET':
        character = db.session.execute(db.select(Characters).where(Character.id == character_id)).scalar()
        if character:
            response_body['results'] = character.serialize()
            response_body['message'] = 'Personaje encontrado'
            return response_body, 200
        response_body['message'] = 'Personaje inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        # TODO: Validación de datos recibidos 
        print(data)
        character = db.session.execute(db.select(Characters).where(Characters.id == character_id)).scalar()
        if character:
            character.description = data['description']
            character.body = data['body']
            character.image_url = data['image_url']
            db.session.commit()
            response_body['message'] = 'Personaje editado'
            response_body['results'] = character.serialize()
            return response_body, 200
        response_body['message'] = 'Personaje inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        character = db.session.execute(db.select(Characters).where(Characters.id == character_id)).scalar()
        if character:
            # db.session.delete(character)
            character.is_active = False
            db.session.commit()
            response_body['message'] = 'Personaje eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Personaje inexistente'
        response_body['results'] = {}
        return response_body, 200