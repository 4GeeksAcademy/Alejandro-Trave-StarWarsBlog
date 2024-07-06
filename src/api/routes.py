"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Posts, Characters, Planets, Species, Favorites

app = Flask(__name__)
CORS(app)


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200

@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if user:
        access_token = create_access_token(identity={'user_id': user.id})
        response_body['message'] = 'User Logged in'
        response_body['access_token'] = access_token
        response_body['results'] = {
            'email': user.email  # Asegúrate de incluir el email aquí
        }
        return response_body, 200
    response_body['message'] = 'Bad username or password'
    return response_body, 401



@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    # Logica de verificación de un mail válido y password válido
    user = Users()
    user.email = email
    user.password = password
    user.is_active = True
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity={'user_id': user.id,
                                                 'user_is_admin': user.is_admin})
    response_body['message'] = 'User Registrado y logeado'
    response_body['access_token'] = access_token
    return response_body, 200


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


""" @api.route('/users/<int:user_id>/favorite-characters', methods=['GET', 'POST'])
@jwt_required()
def handle_favoriteCharacter():
    response_body = {}
    current_user = get_jwt_identity()
    
    if request.method == 'GET':
        rows = db.session.execute(db.select(Favorites).where(Favorites.user_id == current_user['user_id'])).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Personajes Favoritos'
        return response_body, 200

    if request.method == 'POST':
        data = request.json
        character_id = data.get('character_id')
        
        favorite = Favorites(
            user_id=current_user['user_id'],
            character_id=character_id,
        )
        db.session.add(favorite)
        db.session.commit()
        response_body['message'] = 'Favorito añadido'
        return response_body, 200


@api.route('/users/<int:user_id>/favorite-planets', methods=['GET', 'POST'])
@jwt_required()
def handle_favoritePlanet():
    response_body = {}
    current_user = get_jwt_identity()
    
    if request.method == 'GET':
        rows = db.session.execute(db.select(Favorites).where(Favorites.user_ == current_user['user_id'])).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Favoritos'
        return response_body, 200

    if request.method == 'POST':
        data = request.json
        # Validar que los datos recibidos son correctos
        planet_id = data.get('planet_id')
        
        favorite = Favorites(
            user_id=current_user['user_id'],
            planet_id=planet_id,
        )
        db.session.add(favorite)
        db.session.commit()
        response_body['message'] = 'Favorito añadido'
        return response_body, 200 """


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


@api.route('/planets', methods=['GET', 'POST'])
def handle_planet():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Planets)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Planetas'
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = 'Haga login para añadir un planeta'
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
        character = db.session.execute(db.select(Characters).where(Characters.id == character_id)).scalar()
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
            character.name = data['name']
            character.last_name = data['last_name']
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
            db.session.delete(character)
            db.session.commit()
            response_body['message'] = 'Personaje eliminado'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'Personaje inexistente'
        response_body['results'] = {}
        return response_body, 404


@api.route('/planets/<int:planet_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_planets(planet_id):
    response_body = {}
    if request.method == 'GET':
        planet = db.session.execute(db.select(Planets).where(Planets.id == planet_id)).scalar()
        if planet:
            response_body['results'] = planet.serialize()
            response_body['message'] = 'Planeta encontrado'
            return response_body, 200
        response_body['message'] = 'Planeta inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        # TODO: Validación de datos recibidos 
        print(data)
        planet = db.session.execute(db.select(Planets).where(Planets.id == planet_id)).scalar()
        if planet:
            planet.name = data['name']
            planet.climate = data['climate']
            db.session.commit()
            response_body['message'] = 'Planeta editado'
            response_body['results'] = planet.serialize()
            return response_body, 200
        response_body['message'] = 'Planeta inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        planet = db.session.execute(db.select(Planets).where(Planets.id == planet_id)).scalar()
        if planet:
            db.session.delete(planet)
            db.session.commit()
            response_body['message'] = 'Planeta eliminado'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'Planeta inexistente'
        response_body['results'] = {}
        return response_body, 404
