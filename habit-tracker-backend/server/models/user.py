from database import db
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # One-to-Many Relationship: A user can have many habits
    habits = db.relationship('Habit', backref='user', lazy=True, cascade="all, delete-orphan")

    # Many-to-Many Relationship: Friendships (sent and received requests)
    sent_requests = db.relationship(
        'Relationship',
        foreign_keys='Relationship.user1_id',
        backref='sender',
        lazy=True,
        cascade="all, delete-orphan"
    )

    received_requests = db.relationship(
        'Relationship',
        foreign_keys='Relationship.user2_id',
        backref='receiver',
        lazy=True,
        cascade="all, delete-orphan"
    )

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def save(self):
        """Save user to the database."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Delete user from the database."""
        db.session.delete(self)
        db.session.commit()
