from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User: {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'first_name': self.first_name,
                'last_name': self.last_name}

class Follower(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    follower = db.relationship('Users', foreign_keys=[follower_id], backref='following')
    followed = db.relationship('Users', foreign_keys=[followed_id], backref='followers')

    def __repr__(self):
        return f'<Follower: {self.follower_id} follows {self.followed_id}>'

    

class Posts(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.String())
    body = db.Column(db.String(), nullable=False)
    date_publication = db.Column(db.Date(), nullable=False)
    image_url = db.Column(db.String())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])

    def __repr__(self):
        return f'<Post: {self.title}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'body': self.body,
                'date_publication': self.date_publication,
                'image_url': self.image_url,
                'user_id': self.user_id}


class Comments(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    body = db.Column(db.String(), nullable=False)
    date_publication = db.Column(db.Date(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    user_to = db.relationship('Posts', foreign_keys=[post_id])

    def __repr__(self):
        return f'<Post: {self.title}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'title': self.title,
                'body': self.body,
                'date_publication': self.date_publication,
                'image_url': self.image_url,
                'user_id': self.user_id,
                'post_id': self.post_id}


class Characters(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    height = db.Column(db.Float(), nullable=True)
    mass = db.Column(db.Float(), nullable=True)
    hair_color = db.Column(db.String(), nullable=True)
    skin_color = db.Column(db.String(), nullable=True)
    eye_color = db.Column(db.String(), nullable=True)
    birth_year = db.Column(db.Integer(), nullable=True)
    gender = db.Column(db.String(), nullable=True)
    home_world = db.Column(db.String(), nullable=True)
    planet_id = db.Column(db.Integer(), db.ForeignKey('planets.id'))
    planet_to = db.relationship('Planets', foreign_keys=[planet_id])
    def __repr__(self):
        return f'<Post: {self.name} {self.last_name}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'name': self.name,
                'last_name': self.last_name,
                'height' : self.height,
                'mass' : self.mass,
                'hair_color' : self.hair_color,
                'skin_color' : self.skin_color,
                'eye_color' : self.eye_color,
                'birth_year' : self.birth_year,
                'gender' : self.gender,
                'home_world' : self.home_world,
                'planet_id' : self.planet_id}


class Planets(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    diameter = db.Column(db.Float(), nullable=True)
    rotation_period = db.Column(db.Float(), nullable=True)
    orbital_period = db.Column(db.Float(), nullable=True)
    gravity = db.Column(db.String(), nullable=True)
    population = db.Column(db.String(), nullable=True)
    climate = db.Column(db.String(), nullable=True)
    terrain = db.Column(db.String(), nullable=True)
    surface_water = db.Column(db.Integer(), nullable=True)

    def __repr__(self):
        return f'<Post: {self.name}'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'name': self.name,
                diameter : self.diameter,
                rotation_period : self.rotation_period,
                orbital_period : self.orbital_period,
                gravity : self.gravity,
                population : self.population,
                climate : self.climate,
                terrain : self.terrain,
                surface_water : self.surface_water}

class Species(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    classification = db.Column(db.Float(), nullable=True)
    designation = db.Column(db.Float(), nullable=True)
    language = db.Column(db.Float(), nullable=True)
    avg_lifespan = db.Column(db.String(), nullable=True)
    avg_height = db.Column(db.String(), nullable=True)
    hair_colors = db.Column(db.String(), nullable=True)
    skin_colors = db.Column(db.String(), nullable=True)
    eye_colors = db.Column(db.Integer(), nullable=True)

    def __repr__(self):
        return f'<Post: {self.name}'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'name': self.name,
                classification : self.classification,
                designation : self.designation,
                language : self.language,
                avg_lifespan : self.avg_lifespan,
                avg_height : self.avg_height,
                hair_colors : self.hair_colors,
                skin_colors : self.skin_colors,
                eye_colors : self.eye_colors}