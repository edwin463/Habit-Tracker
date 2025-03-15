from database import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

class Goal(db.Model, SerializerMixin):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    habit_id = db.Column(db.Integer, db.ForeignKey('habits.id'), nullable=False)
    target_date = db.Column(db.Date, nullable=False)  # Deadline to achieve goal
    description = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean, default=False)  # True = Goal Achieved

    # Relationship with Habit (One-to-One)
    habit = db.relationship('Habit', back_populates='goal')

    def __init__(self, habit_id, target_date, description,target_days, completed=False):
        self.habit_id = habit_id
        self.target_date = target_date
        self.description = description
        self.target_days = target_days
        self.completed = completed

    def save(self):
        """Save goal to the database."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Delete goal from the database."""
        db.session.delete(self)
        db.session.commit()
