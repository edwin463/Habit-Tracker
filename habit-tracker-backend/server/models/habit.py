from database import db
from sqlalchemy_serializer import SerializerMixin

class Habit(db.Model, SerializerMixin):
    __tablename__ = 'habits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    frequency = db.Column(db.String(50), nullable=False)  # Daily, Weekly, etc.
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # One-to-Many: A Habit can have many HabitLogs
    logs = db.relationship('HabitLog', back_populates='habit', cascade="all, delete-orphan")

    # One-to-One: A Habit can have one Goal
    goal = db.relationship('Goal', back_populates='habit', uselist=False, cascade="all, delete-orphan")

    def __init__(self, name, frequency, user_id):
        self.name = name
        self.frequency = frequency
        self.user_id = user_id

    def save(self):
        """Save habit to the database."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Delete habit from the database."""
        db.session.delete(self)
        db.session.commit()
